---
title: 网络
titleTemplate: Axios
---

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4919a5e7d6cc43e0864df01972368011~tplv-k3u1fbpfcp-zoom-1.image)

## 前言 {#前言}

个人理解：终止请求：对于已发送出去的请求，后端当然还是一如既往处理，只是前端不做操作罢了

本文介绍：axios 怎么阻止请求、或者说中断已发出的请求

## 为什么需要终止请求？ {#为什么需要终止请求？}

1、提高页面性能

2、避免页面切换之后、响应数据，节约不必要的操作（对于请求做全局出来的如弹窗，出现混乱）

## 需求场景 {#需求场景}

## 触发异步按钮的多次点击 {#触发异步按钮的多次点击}

这里也许觉得给按钮的事件增加：防抖、节流操作也可以实现，还更简单。防抖、节流操作固然重要，但是如果是两个按钮分包代表不同状态，就提现出来取消请求的重要性了。

#### 解决方案：取消上一次的重复请求

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

```typescript
// 方案一： axios.CancelToken.source.cancel
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
axios.post('/user/12345', {
  name: 'new name'
}, {
  cancelToken: source.token
})
// 取消请求（message 参数是可选的）
source.cancel('Operation canceled by the user.');

// ———————————————————————————————————————————————————————————————————————————
// 方案二：new axios.CancelToken(c)

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

这里我使用的是第二种：new CancelToken（cb）

#### 实现思路

1.  取消请求统一配置，选择在请求、响应拦截器中实现
1.  需要辅助函数：判断请求是重复的、无效请求、删除、生成key
1.  需要包括请求的key和取消函数；所以选择Map对象进行存储

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

## 页面切换：终止请求 {#页面切换：终止请求}

在进行页面频繁切换的时候，我们可以终止掉销毁的页面中未完成的请求。也有人会说，页面都切换了，就是数据响应回来了也没有关系，不会做什么操作了。实际开发中，一般会对请求进行封装、请求拦截、响应拦截啥的，会根据响应状态码统一做处理。这时就出问题了：页面a请求中，切换到页面b,页面a的请求响应了，响应错误的，在页面b就会展示本该在页面a中弹出的弹框。

#### 解决方案：全局路由守卫，终止掉请求

#### 实现思路

页面切换时需要终止，上面的就不能满足了，首先我们需要在页面销毁前去获取到存在Map中存在的有哪些请求。拿到这些请求，一一终止。原生的话可以进行事件的监听beforeunload，vue中我们可以在全局的前置守卫进行处理。这里以vue项目中举例。

这里的实现和上面的不同之处就是，需要把存储的Map对象变成响应式的。毫无疑问vuex是最佳选择

1、Map对象存到vuex中

2、辅助函数 基本没有变，存、取、删需要提交commit 来修改

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

## 效果图 {#效果图}

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3925f717e5e341aa9f4e609baeaf7e78~tplv-k3u1fbpfcp-zoom-1.image)

## 注意事项： {#注意事项：}

看到这里前端取消请求，就实现了；细心的小伙伴会发现：控制台输出了一堆：错误信息Uncaught (in promise)...这是因为 reject了错误，没有被处理，所以就抛到控制台了。这时候我们可以吧它给，屏蔽调。

```typescript
window.onunhandledrejection = function(e) {
  // 找到 取消请求的那个错误 ，阻止掉就行了
  if (e?.reason?.message?.includes('取消请求')) e.preventDefault()
}
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7b27eee3a9bd42d9977c189c88806003~tplv-k3u1fbpfcp-zoom-1.image)
