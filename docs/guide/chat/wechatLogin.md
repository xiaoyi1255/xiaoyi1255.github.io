---
title: wechat
titleTemplate: login
theme: channing-cyan
---

## 前言
最近发现别人的网站可以通过订阅号的发送验证码方式进行登录。感觉很不错，于是有了这篇文章。本文主要介绍了如何利用微信订阅号发送验证码的方式实现：**登录**、**集成到已有登录系统**。

## 👻效果展示👻
😍线上体验😍：[http://www.xiaoyi.pub/login](http://www.xiaoyi.pub/login)
![订阅号登录3.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d5408b41085146ca8d329fe95ca98801~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1890&h=968&s=2764110&e=gif&f=142&b=f5f5f5)

## 整体实现思路
1. 拥有自己的**订阅号**（个人、企业）[免费申请](https://mp.weixin.qq.com/)
2. 订阅号配置自己的服务器，用户生成验证
3. 挂上订阅号二维码，让用户获取验证码
4. 校验验证码是否正确、有效
5. 通过验证码、did判断用户是否已经注册
    - 已注册就直接生成token，进而登录
    - 未注册，先默认注册，再进行登录
    - 弹弹窗告诉验证默认注册的账号密码
> **订阅号服务器处理消息流程图如下：**

![订阅号消息回复流程图 (1).jpg](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0c44d574af1c40468d3e32ec713199eb~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1073&h=804&s=82876&e=jpg&b=fffcfc)
<!-- ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e86899deb27a48d2a0e868b664c9396d~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=756&h=758&s=173822&e=png&b=f8fafc) -->


## 一、订阅号申请及配置
* 微信订阅号申请：[https://mp.weixin.qq.com/](https://mp.weixin.qq.com/),没有的可以先注册，选**订阅号**
* 白名单配置：设置与开发 => 基本配置 => ip白名单 
* 服务器配置：设置与开发 => 基本配置 => 服务器配置（用于用户关注订阅号之后，发送消息进行处理回复的）还没有服务器，这里后面再配
```javascript
url: 自己的服务器域名
Token： 自己随便填写 需要和代码里的保持一致
秘钥：随机生成
加密方式： 明文
```
* 接下来需开发一个服务器，本文使用的express进行开发

## 二、前端部分
* 订阅号的二维码
* 表单校验、提交、做防抖
* 登录成功展示 信息弹窗，页面跳转
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2d96ee9df7c84b6dbc36f5d54136f0fc~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1915&h=918&s=3067499&e=png&b=74a1dc)
* 二维码组件代码如下
```vue
<template>
  <div>
    <div style="display: flex; align-items: center; flex-direction: column">
      <div class="title">关注微信公众号：发送 <span>登录</span> 获取验证码</div>
      <img width="300" src="../../assets/imgs/qrcode.jpg" preview-disabled />
      <div style="display: flex; align-items: center">
        <Input
          autofocus
          clearable
          show-count
          v-model:value="codeValue"
          style="width: 70%"
          placeholder="请输入验证码"
          :maxlength="6"
        />
        <Button type="primary" @click="handleSendCode">
          <template #icon>
            <span class="dark:text-black">
              <SvgIcon icon="ri:send-plane-fill" />
            </span>
          </template>
          提交
        </Button>
      </div>
    </div>
  </div>
  <Modal v-model:open="showModal" title="登录成功，请牢记你账号密码" @cancel="onClose" footer="" :mask-closable="false">
    <Descriptions title="*密码只在注册时展示" layout="vertical" bordered>
      <DescriptionsItem label="账号">{{ state.username }}</DescriptionsItem>
      <DescriptionsItem label="密码">{{ state.password }}</DescriptionsItem>
      <DescriptionsItem label="uid">{{ state.uid }}</DescriptionsItem>
    </Descriptions>
  </Modal>
</template>

<script setup lang="ts">
import { Button, Input, message as ms, Modal, Descriptions, DescriptionsItem } from "ant-design-vue";
import { debounce } from "@/utils/function";
import { verifyCode } from '@/apis/index'
import { userInfoService } from '@/utils/auth'
import { useUserStore } from '@/store/userStore'

const router = useRouter()

const codeValue = ref();
const showModal = ref(false)
const state = ref({
  username: '',
  password: '',
  uid: '',
})
const handleSendCode = debounce(async function () {
  const reg = /^[0-9]{6}$/;
  if (!reg.test(codeValue.value)) {
    ms.error("请输入6位纯数字验证码");
    return;
  }
  try {
    const { userInfo = {}, msg } = await verifyCode({code: codeValue.value}) as any;
    if (userInfo?.uid) {
      state.value = userInfo
      const userStore = useUserStore()
      userStore.setUserInfo(userInfo)
      userInfoService.setUserInfo(userInfo)
      ms.success(msg);
      showModal.value = true
  }
  } catch (error: any) {
    // ms.error(error?.msg);
  }
}, 600);

const onClose = () => {
  ms.loading('即将跳转到首页...')
  showModal.value = false
  setTimeout(() => {
    router.push({
      path: '/createroom',
    })
  }, 2000)
}
</script>

<style lang='less' scoped>
.title {
  font-size: 14px;
  span {
    color: blue;
    font-weight: 700;
  }
}
</style>
```

## 二、后端部分
我们需要三个接口：**微信认证**、**处理订阅号消息**、**校验验证码**
### 1. 微信认证
* 完整步骤：[参考微信官方文档](https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Access_Overview.html)
* token需要与微信服务器配置的token保持一致
* 加密规则校验 signature, timestamp, nonce, echostr是认证接口携带的
* 校验通过 返回 echostr
```js
// router/wechat.js
const express = require('express');
const jsSHA = require('jssha');
const router = express.Router();

router.get('/wechat', (req, res, next) => {
	const token = 'xiaoyi1255'; // 这里的token需要和微信开发平台配置的token一致
	//1.获取微信服务器Get请求的参数 signature、timestamp、nonce、echostr
	const { signature, timestamp, nonce, echostr } = req.query;
	//2.将token、timestamp、nonce三个参数进行字典序排序
	const array = [token, timestamp, nonce].sort();

	//3.将三个参数字符串拼接成一个字符串进行sha1加密
	const tempStr = array.join('');
	const shaObj = new jsSHA('SHA-1', 'TEXT');
	shaObj.update(tempStr);
	const scyptoString = shaObj.getHash('HEX');

	//4.开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
	if (signature === scyptoString) {
    // 验证成功
		res.send(echostr);
	} else {
		res.send('验证失败');
	}
});
```
### 2. 处理 登录 消息
* 处理用户发送 **登录** 文案
* 随机生成6位数字验证码
* 存储验证码:redis => code: did（也可以使用其它方式）
* 返回验证码
```js
// router/wechat.js
const { parseString } = require('xml2js');

router.post('/wechat', function (req, res) {
	var buffer = [];
	req.on('data', function (data) {
		buffer.push(data);
	});
	// 内容接收完毕
	req.on('end', function () {
		var msgXml = Buffer.concat(buffer).toString('utf-8');
		parseString(msgXml, { explicitArray: false }, async function (err, result) {
			if (err) throw err;
			result = result.xml;
			const { ToUserName, FromUserName, MsgType, Content } = result;
			if (MsgType === 'text' && Content === '登录') {
				const code = randomCode();
				// 5分钟有效期
				// 这里的FromUserName就是用户的OpenID
				await redisCkient.setEX(code, FromUserName, 60 * 5);
				const sendXml = sendTextMsg(
					ToUserName,
					FromUserName,
					`您的登录验证码是：${code}  ,  有效期为5分钟`
				);
				res.send(sendXml);
			}
		});
	});
});

/**
 * 随机6位验证码
 */
function randomCode() {
	return Math.random().toString().slice(-6);
}

/**
 * 回复文字消息封装成xml
 */
function sendTextMsg(toUser, fromUser, content) {
	let resultXml =
		'<xml><ToUserName><![CDATA[' + fromUser + ']]></ToUserName>';
	resultXml += '<FromUserName><![CDATA[' + toUser + ']]></FromUserName>';
	resultXml += '<CreateTime>' + new Date().getTime() + '</CreateTime>';
	resultXml += '<MsgType><![CDATA[text]]></MsgType>';
	resultXml += '<Content><![CDATA[' + content + ']]></Content></xml>';
	return resultXml;
}
```
### 3. 校验验证码
```js
// 验证成功就去注册+登录
router.get('/verifyCode', async function (req, res) {
	const { code } = req.query;
  // redis 中取出 验证码及did  => code: did
	const OpenID = await redisCkient.get(code);
	if (OpenID) {
    /**
     * 1. 验证码有效 => 进一步判断用户是已注册
     * 2. 已注册 => 直接生成 token => 返回登录成功
     * 3. 未注册 => 使用did进行注册
     *  注册成功 直接生成 token => 返回登录成功
     */

	} else {
		res.json({
			code: 400,
			msg: '您输入的验证码有误或已过期，请重新输入！-_-'
		});
	}
});

```
### 验证码校验登录完整代码
1. 先校验验证码是否正确、有效
2. 验证码正确 => 查看用户是否存在 => 存在直接登录 (不存在=> 进行注册及登录)
3. jwt生成token、返回登录结果 生成jwt可以参考：[无感刷新token](https://juejin.cn/post/7277799192961712180)
```js
// router/wechat.js
// 验证成功就去注册+登录
router.get('/verifyCode', async function (req, res) {
	const { code } = req.query;
	const OpenID = await redisCkient.get(code);
	if (OpenID) {
		const sql = `SELECT username,uid,gender,did FROM user_table WHERE did = ? `
		const queryhasUser = await db.query(sql, [OpenID])
		if (!queryhasUser.length) {
			const password =  randomCode()
			// 注册并登录
			const user = {
				username: `user${code}`,
				did: OpenID,
				uid: code,
				gender: '',
				password
			}
			const inset_sql = `INSERT INTO chat.user_table (did, username, password) VALUES (?, ?,?)`
        console.log(inset_sql)
        const results = await db.query(inset_sql, [user.did, user.username, password])
				if (results.affectedRows === 1) {
          console.log('Insertion successful.');
					createJwt(user, res)
					res.json({
						code: 0,
						data: { 
							userInfo: user,
							msg: "注册并登录成功！！！"
						}
					})
        }
		} else {
			// const token = '使用OpenID进行jwt鉴权颁发Token';
			const user = {
				username: queryhasUser[0]?.username,
				did: queryhasUser[0]?.did,
				uid: queryhasUser[0]?.uid,
				gender: queryhasUser[0]?.gender,
			}
			createJwt(user, res)
			res.json({
				code: 0,
				data: { 
					userInfo: queryhasUser[0],
					msg: '登录成功！'
				 }
			});
		}
	} else {
		res.json({
			code: 400,
			msg: '您输入的验证码有误或已过期，请重新输入！-_-'
		});
	}
});

```
恭喜你！👻👻看到这里，订阅号实现验证码登录的整个流程就结束了！是不是挺简单的？下面是我的**踩坑实录**~~
## 踩坑实录
### 1. 获取域名 借助内网穿透
#### ngrok.com (不行)
[ngrok](https://ngrok.com/) 内网穿透弄了一个https的，没有证书，报安全隐患，并且请求一直没有到达我的服务器。速度好像比下面那个快一点。
#### ngrok.cc (2元 可以) 最近好像满了一直掉线
[ngrok.cc](https://ngrok.cc/) 这个弄了一个免费的，还可以,需要实名认证费2元
* 注册 => 登录 => 隧道管理 => 开通隧道 => 滑到最下面 => 填写信息 => 提交
[使用教程](https://www.ngrok.cc/_book/start/ngrok_windows.html)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e845c07f8e45448da34478dd45f866ff~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1485&h=942&s=144739&e=png&b=ffffff)

### 2. 微信公众服务器配置 => token验证不通过
登录了微信公众平台：https://mp.weixin.qq.com/
设置与开发 => 基本设置 => 服务器配置
* 在这里配置服务器url，然后提交，一直报 **token 验证不通过**
* url是 https 需要能正常访问(在浏览器访问不报 安全隐患)
* 在腾讯云买的大陆服务器，域名：需要进行备案，，奈何备案提交了两次被工信部**驳回**。(注：内陆的都需要备案)
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5f224573efdb4f3083c5cdd30fc0377c~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1754&h=477&s=73137&e=png&b=ffffff)
[然后就是漫长的痛苦之路---微信开发社区求助](https://developers.weixin.qq.com/community/search?query=%25E5%2585%25AC%25E4%25BC%2597%25E5%258F%25B7%25E6%258E%25A5%25E5%2585%25A5-%25E5%25A1%25AB%25E5%2586%2599%25E6%259C%258D%25E5%258A%25A1%25E5%2599%25A8%25E9%2585%258D%25E7%25BD%25AE-token%25E9%25AA%258C%25E8%25AF%2581%25E5%25A4%25B1%25E8%25B4%25A5&page=1&block=1&random=1693900223289&type=1) 
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aaaf2bbc8e83492388ec3e348b43096f~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1287&h=885&s=125963&e=png&b=fdfdfd)  
主要失败原因：
1. htts需要有证书(浏览器访问不能有安全警告那个拦截) 
2. http不需要证书，正常访问就行 
3. 需要是域名（ip）不行
4. 加密、校验规则

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cff22aeed8cc4605b4fd4e801186602e~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1823&h=487&s=49645&e=png&b=ffffff)

* 绑定成功图如下：
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f2fbf49207574c7181d400bde283f34e~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1732&h=821&s=115724&e=png&b=ffffff)

## 源码
[xiaoyi1255](https://gitee.com/jingmingt/chat)

## 结语：
如果本文对你有收获，麻烦动动发财的小手，点点关注、点点赞！！！👻👻👻

因为收藏===会了

如果有不对、可以优化的地方欢迎在评论区指出，谢谢👾👾👾
