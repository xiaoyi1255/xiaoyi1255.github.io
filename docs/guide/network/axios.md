---
title: 网络
titleTemplate: Axios
theme: channing-cyan
---

## 前言

**取消请求**：在发出一个网络请求后，在请求完成之前主动终止该请求的过程

本文介绍：**XMLHttpRequest**、**fetch**、**axios**三种请求方式的取消请求，最后是Vue项目中的实战：切换页面取消请求

## 为什么需要终止请求？👀

*   提高页面性能
*   提供用户体验
*   防止竞态问题、保持数据一致性

上代码上代码👻👻👻

### XMLHttpRequest取消请求

```typescript
const xhr = new XMLHttpRequest();
xhr.open("GET","https://www.baidu.com", true); // false表示同步， true表示异步
xhr.send();
xhr.onreadystatechange = function(){
	if(xhr.readyState == 4 && xhr.status == 200){
		console.log(xhr.response);	 	   	
	}
}
xhr.abort(); // 终止请求
```

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/3a76122be854402d8452996ef6191fe5~tplv-73owjymdk6-jj-mark:0:0:0:0:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjAzMjM0NDc0NDg1NzEyNyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1724468891&x-orig-sign=Mjxv6Cn4M5LoW0Tvg%2BCoSYB2DY0%3D)

### fetch 取消请求

```typescript
let controller = new AbortController();
let signal = controller.signal;
fetch('https://juejin.cn/', { signal}).then(function(response) {
  console.log(response);
})
// Abort the fetch request
controller.abort();
```

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/ef8783f3e3f84427868ca58043afdd63~tplv-73owjymdk6-jj-mark:0:0:0:0:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjAzMjM0NDc0NDg1NzEyNyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1724468891&x-orig-sign=pYXzxMz0ZuBn4M6HVr9BR4Y3bUg%3D)

### axios 取消请求

```typescript
// 方案一：AbortController和fetch一样
const controller = new AbortController();

axios.get('https://juejin.cn/', {
   signal: controller.signal
}).then(function(response) {
   //...
});
// 取消请求
controller.abort()

// 方案二： axios.CancelToken.source.cancel
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
axios.get('/user/12345', {
  cancelToken: source.token
}).catch(function(thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  } else {
     // 处理错误
  }
});

// 取消请求（message 参数是可选的）
source.cancel('Operation canceled by the user.');

———————————————————————————————————————————————————————————————————————————
// 方案二：构造函数写法 new axios.CancelToken(c)

const CancelToken = axios.CancelToken;
let cancel;
axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    // executor 函数接收一个 cancel 函数作为参数
    cancel = c;
  })
});
// cancel the request
cancel('参数可选');
```

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/6953c120f514488eb53c7ba66a8486ac~tplv-73owjymdk6-jj-mark:0:0:0:0:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjAzMjM0NDc0NDg1NzEyNyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1724468891&x-orig-sign=lcO8z%2F3bDKRat635LKpJq1%2FQmUY%3D)
本文使用的是第二种：new CancelToken(cb)

### axios官方建议使用第一种

**注意**：[axios取消请求，v0.22.0以后官方建议使用第一种](https://axios-http.com/zh/docs/cancellation)

### 实战

1.  取消请求统一配置，选择在请求、响应拦截器中实现
2.  需要辅助函数：判断请求是重复的、无效请求、删除、生成key
3.  需要包括请求的key和取消函数；所以选择Map对象进行存储

**根据请求生成请求的标识key**

```typescript
const getReqKey = (config = {}) => {
    let { method, url, params, data } = config
    return [method, url, params, data].join('&')
}
```

**将key和cancel函数存储到Map对象中**

```typescript
const addReqKe = (config={}) => {
    // 生成key
    const key = getReqKey(config)
    // 放在config上，请求拦截和响应拦截中需要判断
    config.cancelToken = config.cancelToken || new CancelToken(c => {
        // 没有重复请求才进行存储
        if (!pendReqMap.has(key)) {
            pendReqMap.set(key, c)
        }
    })
}
```

**检查是否存在重复请求，若存在则取消已发的请求**

```typescript
const removePendReq = (config = {}) => {
    // 生成key
    const key = getReqKey(config)
    if (pendRepMap.has(key)) {
        const cancelToken = pendReqMap.get(key)
        cancelToken('取消重复请求')
        pendReqMap.delete(key)
    }
}
```

设置请求拦截

```typescript
const serve = axios.creat({
  baseUrl: '',
  timeout: 10000,
  ...axiosConfig
})
serve.interceptors.request.use(
  config => {
    removePendReq(config)
    addReqKe(config)
    return sonfig
  },
  err => {
    // 错误处理
  }
)
```

设置响应拦截

```typescript
const serve = axios.creat({
  baseUrl: '',
  timeout: 10000,
  ...axiosConfig
})
serve.interceptors.response.use(
  response => {
    removePendReq(response.config)
    return response
  },
  err => {

  }
)
```

```typescript
import axios from 'axios'
const domain = ''
const pendReqMap = new Map()

const getReqKey = (config = {}) => {
    let { method, url, params, data } = config
    return [method, url, params, data].join('&')
}
const addReqKe = (config={}) => {
    const key = getReqKey(config)
    config.cancelToken = config.cancelToken || new CancelToken(c => {
        if (!pendReqMap.has(key)) {
            pendReqMap.set(key, c)
        }
    })
}
const removePendReq = (config = {}) => {
    const key = getReqKey(config)
    if (pendRepMap.has(key)) {
        const cancelToken = pendReqMap.get(key)
        cancelToken('取消重复请求')
        pendReqMap.delete(key)
    }
}
const requst = (axiosConfig) => {
    const serve = axios.creat({
        baseUrl: '',
        timeout: 10000,
        ...axiosConfig
    })
    serve.interceptors.request.use(
        config => {
            removePendReq(config)
            addReqKe(config)
            return sonfig
        },
        err => {

        }
    )
    serve.interceptors.response.use(
        response => {
            removePendReq(response.config)
            return response
        },
        err => {

        }
    )
}
```

在进行页面频繁切换的时候，我们可以终止掉销毁的页面中未完成的请求。

页面切换时需要终止，上面的就不能满足了，首先我们需要在页面销毁前去获取到存在Map中存在的有哪些请求。拿到这些请求，一一终止。原生的话可以进行事件的监听beforeunload，vue中我们可以在全局的前置守卫进行处理。这里以vue项目中举例。

## 切换页面取消请求

**解决方案**：全局路由守卫，终止掉请求

这里的实现和上面的不同之处就是，把存储的Map对象变成响应式的。

*   Map对象存到vuex中，在页面切换时，进行取消

*   辅助函数 基本没有变，存、取、删需要提交commit 来修改

**vuex中用Map进行存储，commit进行修改，getters进行获取**

```typescript
// src/store/modules/request.js
const state = {
    pendReqMap: new Map()
}
const mutations = {
    SET_PENDREQMAP(state, obj={}){
        state.pendReqMap.set(obj.key, obj.value)
    },
    DEL_PENDREQMAP(state, key){
        state.pendReqMap.delete(key)
    },
    CLEAR_PENDREQMAP(state){
        state.pendReqMap.clear()
    }
}
export default {
    namespaced: true,
    state,
    mutations,
}

// src/store/index.js
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import request from './modules/request'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    request,
  },
  getters
})
export default store

// src/store/getters.js
const getters = {
  pendReqMap: state => state.request.pendReqMap, //因为使用getters 取值比较方便
}
export default getters
```

**辅助函数**

```typescript
import store from '@/store' // 引入store
const getReqKey = (config = {}) => {
  let { method, url, params='', data={} } = config
  if(typeof data === 'object') data = JSON.stringify(data)
  if(typeof params === 'object') params = JSON.stringify(params)
  return [method, url, params, data].join('&')
}
const addReqPending = (config={}) => {
  const pendReqMap = store?.getters?.pendReqMap || new Map()
  const key = getReqKey(config)
  config.cancelToken = config.cancelToken || new axios.CancelToken(c => {
    if (!pendReqMap.has(key)) {
      store.commit('request/SET_PENDREQMAP', {key, value: c})
    }
  })
}
const removeReqPending = (config = {}) => {
  const pendReqMap = store?.getters?.pendReqMap || new Map()
  const key = getReqKey(config)
  if (pendReqMap.has(key)) {
    const cancelToken = pendReqMap.get(key)
    cancelToken('请求重复 取消请求: ')
    store.commit('request/DEL_PENDREQMAP', key)
  }
}
```

**请求、响应拦截**

```typescript
import axios form 'axios'
const serve = axios.creat({
   baseUrl: '',
   timeout: 10000,
   req_cancel: true, // 默认取消重复请求

 })
// request拦截器
service.interceptors.request.use(config => {
  // 是否需要设置 token
  const isToken = (config.headers || {}).isToken === false
  if (getToken() && !isToken) {
    //设置请求头 等东西
  }
  // 是否是需要取消的请求
  if (config.req_cancel) {
    removeReqPending(config)
    addReqPending(config)
  }
  return config
}, error => {
    console.log(error)
    Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200;
    // 获取错误信息
    const msg = errorCode[code] || res.data.message || errorCode['default']
    // 判断该条请求是否是需要取消请求的，是则请求完成 删除
    if (res?.config?.req_cancel) {
      removeReqPending(res.config)
    }
    // 根据状态码 进行业务逻辑处理
    if (code === 401) {
    } else if (code === 500) {
    } else if (code !== 200) {
    } else {
    }
  },
  error => {
    console.log('err' + error)
  }
)
```

**页面切换：取消请求**

```typescript
// 需要在main.js中引入
// router.js
import router from './router'
import store from './store'
router.beforeEach((to, from, next) => {
  const pendReqMap = store?.getters?.pendReqMap || new Map()
  if (pendReqMap.size) {
    pendReqMap.forEach(item => {
      item('切换页面 取消请求') // 先把存储的所有pending的请求终止
    })
     // 再清除存储的Map
    store.commit('request/CLEAR_PENDREQMAP')
  }
  // ...其它操作
})
```

### 效果图

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3925f717e5e341aa9f4e609baeaf7e78~tplv-k3u1fbpfcp-zoom-1.image#?w=1733\&h=108\&s=13368\&e=png\&b=fbfafa)

### 注意事项

看到这里前端取消请求，就实现了；细心的小伙伴会发现：控制台输出了一堆：错误信息Uncaught (in promise)...这是因为 reject了错误，没有被处理，所以就抛到控制台了。这时候我们可以吧它给，屏蔽调。

```typescript
window.onunhandledrejection = function(e) {
  // 找到 取消请求的那个错误 ，阻止掉就行了
  if (e?.reason?.message?.includes('取消请求')) e.preventDefault()
}
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7b27eee3a9bd42d9977c189c88806003~tplv-k3u1fbpfcp-zoom-1.image#?w=439\&h=240\&s=27437\&e=png\&b=fff0f0)

## 结语：

如果本文对你有收获，麻烦动动发财的小手，点点关注、点点赞！！！👻👻👻

因为收藏===会了

如果有不对、更好的方式实现、可以优化的地方欢迎在评论区指出，谢谢👾👾👾
