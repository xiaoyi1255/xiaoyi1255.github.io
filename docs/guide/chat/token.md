---
theme: channing-cyan
highlight: a11y-light
---
## 引言
> 我们知道，http是无状态协议，这也就意味着，我们在登录页面完成了登录，转身调其它接口，服务器是不知道用户是否完成登录的。
> 当然你要说调其它接口的时候，把账号密码也带上！！也不是不行，就是容易泄漏密码，加重服务器压力，其次是容易挨揍。😂😂

## 效果展示
[😍体验地址~😍](http://118.89.125.27/createroom)
![无感刷新token1.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2bfb6d541d2b4eb39b70dcd12ee216f4~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1880&h=886&s=3935418&e=gif&f=274&b=fefefe)

## Session-Cookie机制和Token机制?
百度百科: 
- Token在计算机身份认证中是令牌（临时）的意思.
- Cookie类型为“小型文本文件”，是某些网站为了辨别用户身份，进行Session跟踪而储存在用户本地终端上的数据（通常经过加密），由用户客户端计算机暂时或永久保存的信息。

### Session-Cookie认证流程：
1. 客户端账号密码进行登录
2. 服务器验证通过后，创建Session对象，并存入该用户相关信息
3. 服务器返回Session对象的唯一标识sessionid, 并写入Cookie
4. 客户端同源下的其它请求主动携带Cookie
5. 服务器收到请求携带的Cookie, 再去验证

**弊端：**
- 受同源策略约束。无法直接在子应用中共享
- 分布式集群情况下无法保证用户的会话数据是一致的

显然：Session-Cookie不是最优解。所以就引入了👻👻**Token**👻👻

### Token 认证流程
1. 客户端账号密码登录
2. 服务器验证通过后，通过jwt鉴权生成Token
3. 客户端进行Token存储，之后每次请求都携带（一般放请求头上）
4. 服务端校验是否过期、有效

**优势：**
- 它只是客户端与服务端的一种自定义约定，和同源策略没有关系
- 不受分布式集群影响
- 不需要服务器维护会话状态
- 可以在不同系统中共享

**弊端：**

Token一旦生成，没有过期之前服务器都是认的，即使生成新的token。旧的依然能用。

Token如果设置有效期很长不安全，很短会存在用户刷着刷着，告诉用户Token过期需要重新登录。当然这种情况我们是不允许出现的。所以就有了**无感刷新Token**

## 无感刷新Token的实现
在Token认证的基础上，用户完成登录返回两个token，一个短期的access_token，一个长期的refresh_token。短期access_token**过期**，使用长期refresh_token换取**新token**，也就是会**发三次请求**，第一次401，第二次换token，第三次重新请求。如果网速正常、接口正常基本就能无感知实现刷新token了。效果如下图

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f24c6db43e7a48168c1e3f1abd242b6d~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1180&h=575&s=58007&e=png&b=ffffff)
**access_token**：用作接口请求令牌,一般有效期十几分钟、几小时（具体看公司需求）
**refresh_token**：在短期token过期后，换取新Token，一般是几天、一周

本文将从前端到后端手把手实现无感刷新的整个流程包括**踩坑实录**😂😂😂，全文有点长，请耐心看完，预计需要5-10分钟。源码放在末尾了，自己测试通过，有需要的自行食用👻👻👻！


## 前端部分

**项目**：Nuxt3 + antdv + Vue3 + pinia
1. 客户端输入账号密码进行登录
3. 登录成功进行两个Token的存储
4. 客户端做请求拦截，在请求头统一带上Token
5. 客户端做响应拦截，服务端返回401，token过期
6. 客户端尝试使用refreshToken调刷新token接口
7. 刷新成功：重新调原来失败的401的接口
8. 刷新失败：重定向到登录页进行登录

### 请求拦截
* axios请求拦截器：在发起请求之前做一次拦截。判断是否存在token，存在就是写入header头
```typescript
import { tokenService } from '@/utils/auth'
import { config } from '@/baseConfig'
const service = axios.create({
  baseURL: config.baseUrl,
  withCredentials: false,
})

// 请求拦截
service.interceptors.request.use(
  (config) => {
    const token = tokenService.token
    if (token) config.headers.token = token
    return config
  },
  (error) => {
    return Promise.reject(error.response)
  },
)

```
### 响应拦截（重点）
- 响应头中存在**token** 、**refresh-token** 就把它存起来 （这里会有小坑，后面会讲到：在浏览器的控制台可以看到服务器返回的自定义header：token但是拦截器里拿不到的解决）
- 判断http status=401 (这里可以选择ststus=200然后自定义返回code：401什么的，和后端约好就行)
- 如果判断为401 => 取一下refreshtoken, 如果没有直接跳转登录
- 有refreshToken 调换取token接口刷新token
- 刷新成功： 重新调一下原失败接口
- 刷新失败再跳登录就好了
```typescript
// 响应拦截
service.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    if (response.headers['token']) {
      tokenService.setToken(response.headers['token'])
    }
    if (response.headers['refresh-token']) {
      tokenService.setRefreshToken(response.headers['refresh-token'])
    }
    if (response.status === 200) {
      return response
    } else {

      throw new Error(response.status.toString())
    }
  },
  async (responseErr: AxiosError) => {
    const status = responseErr.response?.status
    const msg = responseErr.response?.data?.msg || ''
    switch (status) {
      case 401: // "Unauthorized"
        // 做换取token操作
        const originRequestConf = responseErr.config
        if (tokenService.refreshToken) { // 存在refreshToken 
          const isSuceess = await refreshToken()
          console.log(isSuceess, '刷新Token')
          if (isSuceess && originRequestConf) {
            originRequestConf.headers['refreshtoken'] = tokenService.refreshToken
            // 重新发一次原来的请求
            return service(originRequestConf)
          }
        }
        message.error(msg)
        location.href = location.origin + '/login'
        return Promise.reject(responseErr)
    
      default:
        return Promise.reject(responseErr)
    }
  },
)


```

### 登录和刷新token
登录成功跳转createroom页面
```javascript
// 登录逻辑
const onFinish = debounce(async (values: any) => {
  try {
    const {
      code = -1,
      msg = "",
      userInfo = "",
    } = await onLogin(values);
    if (code !== 0) {
      msg && message.error(msg || '连接报错，请刷新页面！');
      return;
    } else {
      if (checkType.value === 'login') {
        router.push({
          path: '/createroom',
        })
      } else {
        emit('changeActiveKay', {})
      }
    }
    message.success(msg);
  } catch (error) {
    console.log(error)
  }
}, 500);
```
**refreshToken**函数token 过期调刷新token接口   
**tokenService**是封装的一个类，专门设置存储token和移除的。
```typescript
// 刷新token
import http from '@/utils/request/index'
import { tokenService } from '@/utils/auth'
const refreshToken = async(): Promise<boolean> => {
  const token = tokenService.refreshToken
  const { code } = await http.post({url: urls.refreshToken, headers: {'refresh-token': token}})
  return code === 0
}

```
## 后端部分
**项目** express + jsonwebtoken + middleware
1. 接口的实现：登录、刷新token、获取列表数据
2. 鉴权的实现：jwt生成token + middleware 中间件

### jsonwebtoken的基本使用
```javascript
const jwt = require('jsonwebtoken');
// key
const secretKey = 'your-secret-key';
// 数据
const payload = { userId: 12345 };
// 生成token expiresIn：可以直接
const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
// 校验是否有效
const decoded = jwt.verify(token, secretKey);

```
### 中间件鉴权
```javascript
// middleware/auth.js
const jwt = require('jsonwebtoken');
const { SERET_KEY } = require('./../config');

/**
 * 校验token 是否有效
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const auth = async (req, res, next) => {
	try {
		const token = req.headers?.token;
		if (!token) {
			sendErr();
			return;
		}
		jwt.verify(token, SERET_KEY, (err, data) => {
			console.log(data);
			if (err) {
				console.log('。过期');
				sendErr();
				return;
			}
			next();
			return;
		});
		!token && sendErr();
	} catch (error) {
		sendErr();
	}
	function sendErr() {
		res.status(401).send({
			code: 401,
			msg: 'token 过期，或失效'
		});
	}
};
```


### 使用express快速搭建node服务
```javascript
// server.js
const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const userRouters = require('./routes/user.js');

app.use(cors()); // 跨域
app.use((req, res, next) => {
  // 配置了：axios 响应拦截器才能拿到
  res.setHeader('Access-Control-Expose-Headers', "token, refresh-token");
  next(); // 让请求继续到下一个中间件或路由处理程序
});
app.use('/user', userRouters);
const server = http.createServer(app);
// 启动服务器
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
	console.log(`服务器正在运行，端口：${PORT}`);
});

```
### 接口实现
#### 登录接口
1. 拿到前端传入的账户和密码，去查数据库
2. 校验通过 => 使用jwt 生成token => 写入响应头 => 返回给前端
```javascript
// routes/user.js
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const jwt = require('jsonwebtoken');
const MySQL = require('../utils/mysql'); // 导入MySQL类
const { SERET_KEY, REFRESH_KEY } = require('./../config')

const config = {
  host: 'xx.xx.xx.xx',
  user: 'xxx',
  password: 'xxx',
  database: 'chat',
}
const db = new MySQL(config)

router.post('/login', async (req, res) => {
  console.log(req.path)
  const { username, password } = req.body
  try {
    if (username && password) {
      db.connect()
      const sql = `SELECT * FROM user_table WHERE username = ? AND password =?;`
      const sql2 = `SELECT * FROM user_table WHERE username = ? `
      const queryhasUser = await db.query(sql, [username, password])
      const queryUser = await db.query(sql2, [username])
      console.log(queryhasUser, queryUser)
      const resObj = {
        code: -1,
        userInfo: null,
        msg: '用户不存在'
      }
      if (queryhasUser?.length && queryUser?.length) { // 账号、密码匹配上了
        const user = {
          username: username,
          id: queryhasUser[0]?.did
        }
        const token = jwt.sign(user, SERET_KEY, { expiresIn: '1h' });
        const refreshToken = jwt.sign(user, REFRESH_KEY, { expiresIn: '7d' });
        res.setHeader('token', token)
        res.setHeader('refresh-token', refreshToken)
        resObj.userInfo = queryhasUser[0]
        resObj.msg = '登录成功'
        resObj.code=0
        resObj.refreshToken=refreshToken
        resObj.token = token
      } else if (queryUser?.length) { // 密码不正确
        resObj.msg = '密码不正确'
      }
      res.send(resObj)
    } else {
      res.send({
        code: -1,
        msg: '请输入用户名、密码'
      })
    }
  } catch (error) {
    console.log(JSON.stringify(error))
    res.send({
      code: -1,
      msg: '报错了' + JSON.stringify(error)
    })
  } finally {
    db.disconnect()
  }
})
```
#### 刷新token接口
1. 拿到refreshtoken => 校验是否有效 
2. 有效=>重新生成新token, 无效=> 直接返回
```javascript
router.post('/refreshToken', async(req, res) => {
  console.log(req.path)
  const refreshToken = req.headers['refresh-token']
  console.log(req.headers)
  try {
    const decoded = jwt.verify(refreshToken, REFRESH_KEY);
    const user = {
      id: decoded?.id,
      username: decoded?.username
    }
    // 签发新token
    const token = jwt.sign(user, SERET_KEY, { expiresIn: 10 });
    res.setHeader('token', token)
    res.send({
      code: 0,
      token: token
    })
    
  } catch (error) {
    res.send({
      code: 1,
      error: error,
      msg: 'token 过期或无效'
    })
  }
})
```
#### 获取列表数据接口
1. 引进中间键auth做鉴权，只在需要认证的接口使用
2. 校验通过 => 放行； 不通过 返回401
3. app.get('/getAllRoomInfo', [auth], async (req, res) => {})
```javascript
const {auth} = require('./middleware/auth.js')

let roomMap = new Map();
app.get('/getAllRoomInfo', auth, async (req, res) => {
	if (!redisCkient.size) {
		return res.send(JSON.stringify([]));
	}
	const roomInfo = [];
	roomMap.forEach((value, key) => {
		value && roomInfo.push(value);
	});
	res.send({
		code: 0,
		data: roomInfo
	});
});
```

## 踩坑实录
### 1.axios拦截器中无法直接获取，服务端写入的token
[参考的这篇文章](https://blog.csdn.net/qq_41996454/article/details/126018683)
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a080ab5d496946a6ace81606a04800ca~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1274&h=518&s=98729&e=png&b=fdfcfc)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7c27b7ff36034a4bad223e4f692d01dd~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1276&h=810&s=124595&e=png&b=fefefe)
需要在后端配置一下：Access-Control-Expose-Headers
```javascript
app.use((req, res, next) => {
  res.setHeader('Access-Control-Expose-Headers', "token, refreshToken");
  next(); // 让请求继续到下一个中间件或路由处理程序
});
```
后端配置上之后，确实有了，但是，我的小驼峰不见了，**refreshToken**   
无奈~~改成 refresh-token
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/64781c007f79411ea9795bb694d73410~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1271&h=558&s=106522&e=png&b=fdfbfb)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e91eeea9f4084f4893cd3ce9eef35f8d~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1271&h=510&s=99859&e=png&b=fdfbfb)

### 2. 响应拦截中判断问题，导致死循环
就是 列表接口和刷新接口，来回调，死循环，，，复现不出来！！尴尬，是在响应拦截中条件错误导致。

### 3. mysql使用
1. 开始使用的是mysql8因为加密方式升级，导致连不上，然后使用mysql2就解决了
 ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f5c94de7cc8f49e79439ced02341075f~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1664&h=607&s=1966075&e=png&b=633574)
 2. mysql连接一段时间后，会自己断开，重连有时候又出现问题。后面使用链接池来解决了

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a8f3675267764f729ee157812c3cd227~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1869&h=754&s=2600389&e=png&b=653676)
修正后代码如下：
```javascript
const mysql = require('mysql2/promise');
const config = {
  host: 'xxx.xx.xxx.xx',
  user: 'xxx',
  password: 'xxx',
  database: 'xxx',
  connectionLimit: 10, // 连接池最大链接数
}
// 创建数据库连接池
const pool = mysql.createPool(config);

// 查询函数
async function query(sql, values) {
  try {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.query(sql, values);
    connection.release();
    return [rows, fields];
  } catch (error) {
    throw error;
  }
}
```

## 总结
以上就是无感刷新token的实现了。实现的方式大同小异，但是核心是不变的。我们再回顾一下，整个流程：
1. 客户端发起登录请求
2. 服务端校验 => 通过：使用jwt生成token和refreshtoken并写入响应头
3. 客户端收到token和refreshtoken进行保存
3. 客户端基于axios做请求拦截、响应拦截
  - 请求拦截：判断是否存在token，存在写入请求头
  - 响应拦截：401 做换取token操作=>拿refreshtokd调刷新token接口=>校验通过生成新的token=>客户端重新发起失败的请求=>用户正常展示列表接口数据
4. 服务端校验的接口使用middleware中间件进行拦截 => 校验通过放行

## 源码
[xiaoyi1255](https://github.com/xiaoyi1255/nuxt3-temple)

## 结语：
如果本文对你有收获，麻烦动动发财的小手，点点关注、点点赞！！！👻👻👻

因为收藏===会了

如果有不对、可以优化的地方欢迎在评论区指出，谢谢👾👾👾