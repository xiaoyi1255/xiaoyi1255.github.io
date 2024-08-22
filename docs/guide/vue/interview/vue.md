---
theme: channing-cyan
---

# Vue高频面试汇总（基础篇）

前端面试系列：

> [0.如何判断两个数组的内容是否相等](https://juejin.cn/post/7290786959441117243)
>
> [1.地址栏输入url到页面呈现发生了什么](https://juejin.cn/post/7404777076089208842)
>
> [2.前端模块化: CommonJS和ES Module](https://juejin.cn/post/7404005062178291749)
>
> [3.前端性能优化之 web worker](https://juejin.cn/post/7403658547719241747)
>
> [4.前端项目优化之 取消重复请求](https://juejin.cn/post/7403606630695714855)
>
> [5.ES6\~ES14新特性](https://juejin.cn/post/7399862413234782242)
>
> [6.手写promise](https://juejin.cn/post/7399827379052347444)
>
> [7.前端面试系列--高频JS手写篇](https://juejin.cn/post/7398444207235629056)
>
> [8.如何计算两个超大数相加、相减、相乘](https://juejin.cn/post/7294525616447045644)

## 1. 说一下Vue的生命周期

vue2: 主要八大生命周期

```js
beforeCreate: 实例创建之前，还不能访问data的属性
created：实例创建完成，可以访问data的属性、一般在这个生命周期做数据请求
beforeMount：模板编译之前，还没有挂载到页面上
mounted：模板编译完成，挂载到页面上
// 首次访问页面会执行上面四个生命周期
beforeUpdate ：数据更新之前
updated：数据更新之后
beforeDestroy：实例销毁之前，移除监听事件、定时器等
destroyed：实例销毁之后

deactivated：组件被缓存时调用
activated：组件被激活时调用
```

vue3

```js
setup()：组件创建之前
onBeforeMount：模板编译之前，还没有挂载到页面上
onMounted：模板编译完成，挂载到页面上
// 首次访问页面会执行上面三个生命周期
onBeforeUpdate ：数据更新之前
onUpdated：数据更新之后
onBeforeUnmount：实例销毁之前，移除监听事件、定时器等
onUnmounted：实例销毁之后

onDeactivated：组件被缓存时调用
onActivated：组件被激活时调用
```

**问题补充**：父子组件的生命周期执行顺序？

1.  父：beforeCreate=>created=>beforeMount
2.  子：beforeCreate=>created=>beforeMount=>mounted
3.  父：mounted

## 2. 说一下Vue的响应式原理

`vue2`的响应式主要是**数据劫持**，结合**发布-订阅者模式**的方式

通过Object.defineProperty()的方式劫持各个属性的getter,setter,在数据变化时，通知订阅者，触发响应的回调来实现的。

`Vue3`的响应式原理

Vue3的响应式数据常用两个方法：`ref`、`reactive`

*   ref：
    *   基础数据类型：利用`RefImpl`类，监听 get value() 和 set value()，实现响应式
    *   引用数据类型：利用`reactive`方法，将引用数据类型转换成响应式数据

*   reactive：

Vue3的响应式原理通过**Proxy**数据代理来实现的，Proxy可以监听对象和数组的变化，包括新增属性、删除属性、数组下标的变化等

**问题补充**：vue2针对对象和数组怎么处理的

*   遍历对象所有可枚举属性，进行getter和setter的劫持
*   重写数组方法：push、pop、shift、unshift、splice、sort、reverse

**问题补充**：vue2有哪些不足：

*   对象新增属性、删除属性，需要使用Vue.set、Vue.delete
*   不能监听数组下标的变化，需要使用Vue.set
*   不能监听对象属性的删除，需要使用Vue.delete

## 3. 说一下Vue2和Vue3的区别

1.  `源码`的变化：vue2是用js,vue3用ts, 所有Vue3更好的支持TS
2.  `写法`上变化：Vue2: 选项式API; Vue3: 组合式API
3.  `响应式`实现：Vue2是definePropety, Vue3是proxy
4.  `生命周期`：
    *   Vue2: beforeCreate、created、beforMount、munted、beforeUpdate、updated、beforeDestroy、destroyed;
    *   Vue3: setup、onBeforeMount、onMounted、onBeforeUpdate、onUpdated、onBeforeUnmount、onUnmounted
5.  `实例化`：
    *   Vue2: new Vue
    *   Vue3: createApp
6.  `组件层面`
    *   Vue3 templete支持多个根标签 `Fragments`
    *   Vue3 新增Teleport组件，将组件内部模板挂载到想挂的DOM上
    *   Vue3 css支持v-bind 绑定变量
    *   Vue3 新增异步组件 defineAsyncComponent 声明
    *   Vue3 新增宏：defineEmits、defineModel、defineProps
7.  `公共逻辑抽离`
    *   Vue2: mixin
    *   Vue3: hooks
8.  v-if 和 v-for 优先级的不同
    *   vue2: v-for比v-if优先
    *   Vue3: v-if比v-for优先
    *   一般不建议v-if和v-for一起使用
9.  `diff` 算法优化: vue3 有静态标记
10. `打包体积`优化，Vue更好支持Tree shaking

## 4. 为什么Vue2组件中的data是一个函数？

因为对象是`引用类型`，当组件被复用时，对象就会被共享，会造成`数据混乱`。

## 5. 介绍一下nextTick

1.  为什么需要nextTick?

答：vue中数据是同步更新的，视图是异步更新。所有在我们同步代码中修改了数据，是无法访问更新后的DOM。所以官方就提供了nextTick。

2.  vue中响应式数据改变，不会立即更新DOM，而是更新了vnode,等下一次事件循环才一次性去更新DOM

3.  nextTick实现原理
    *   [vue2实现](https://github1s.com/vuejs/vue/blob/2.6/dist/vue.js#L1993)：判断Promise、MutationObserver、setImmediate、setTimeout兜底
    *   [vue3实现](https://github1s.com/vuejs/core/blob/v3.5.0-alpha.4/packages/runtime-core/src/scheduler.ts#L59)：Promise.then

## 6. v-if 和 v-show 的区别

相同点：值：true || false;都是用来控制元素的显示和隐藏

不同点：

*   v-if: 可以和v-else、v-else-if配合使用
*   v-if为true: dom树上不会有该元素，不会渲染
*   v-show为true: dom树上还存在元素，只是其display: none

## 7. 怎么理解Vue的单向数据流？

单向数据流是指：数据在组件树中的流动方向，是从父组件流向子组件的。这个设计使得数据流更加可预测和易于调试，确保应用状态的一致性。

简单理解：父组件的状态对于子组件是只读的，子组件想改，只能通过事件的方式，通知父组件自己改。

## 8. 组件通信有哪些？

*   父子通信：props\自定义事件
*   祖孙组件：inject、provide
*   所有组件：vuex
*   兄弟：Vue2: EventBus($emit,$on), Vue3: 引入发布-订阅
*   \$refs
*   $children、$parent

## 9. Vue中怎么异步加载组件

```vue
<template> 
    <MyComponent /> 
</template>
<script setup>
import { defineAsyncComponent } from 'vue'

const MyComponent = defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
)
</script>
```

## 10. vue-router用过哪些路由模式？

hash模式和history模式

*   hash模式
    *   url会带有 /#/pageName
    *   hash改变不会发起请求
    *   通过监听hashchange事件，动态渲染页面
    *   兼容性更好

hash路由简单实现

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>hash</title>
</head>
<body>
    <a href="#/home">Home</a>
    <br>
    <a href="#/about">About</a>
    <br>
  <div id="app">Home Page</div>
  <script>
    const app = document.getElementById('app')

    const router = {
      mode: 'hsash',
      routes: [
        { path: '/home', component: 'Home Page' },
        { path: '/about', component: 'About Page' },
      ]
    }

    window.addEventListener('hashchange', (event) => {
      const path = location.hash.slice(1)
      const route = router.routes.find(r => r.path === path)
      if (route) {
        app.innerHTML = route.component
      }
    })
  </script>
</body>
</html>


```

*   history模式
    *   url更美观
    *   更利于SEO
    *   通过pushState、popstate事件进行跳转，动态渲染页面
    *   部署刷新404问题 需要解决 ng 配置、或者后端处理

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>History</title>
</head>
<body>
    <button  onclick="goPage('home')">Home</button>
    <br>
    <button onclick="goPage('about')">About</button>
    <br>
  <div id="app">Home Page</div>
  <script>
    const app = document.getElementById('app')

    const router = {
      mode: 'hsash',
      routes: [
        { path: '/home', name: 'home', component: 'Home Page' },
        { path: '/about', name: 'about', component: 'About Page' },
      ]
    }

    function goPage(path) {
      history.pushState(null, '', path)
      const route = router.routes.find(r => r.path === path)
      if (route) {
        app.innerHTML = route.component
      }
      // 阻止浏览器默认行为
      event.preventDefault()
    }

    // window.addEventListener('popstate', (event) => {
    //   // 阻止浏览器默认行为
    //   event.preventDefault()
    // })
  </script>
</body>
</html>
```

## 11. 为什么this.xx可以访问data中的数据?

```vue
export defalut {
    data(){
        return {
            count: 5
        }
    }
}
console.log(this.count) // 5
```

答：Vue在initData时，做了**数据代理**

1.  判断传入的data，函数就执行，对象不做处理
2.  data 赋值给 vm.\_data
3.  然后变量 vm.\_data对象，把可枚举属性的get代理到 vm上
4.  访问vm.xxx 就相当于 vm.\_data.xx === vm.data.xx

```js
let Vue = {
  data: {
    name: '小易',
    age: 18
  }
}

function proxy(target, sourceKey) {
  let keys = Object.keys(target.data)
  for (let key of keys) {
    Object.defineProperty(target, key, {
      enumerable: true,
      configurable: true,
      get(){
        return this[sourceKey][key]
      },
      set(val){
        this[sourceKey][key] = val
      }
    })
  }
}
proxy(Vue, 'data', 'name')
console.log(Vue.data.name) // 小易
console.log(Vue.name) // 小易
```

Vue中data、method、computed等属性都做了数据代理
[源码详见](https://github1s.com/vuejs/vue/blob/2.6/src/core/instance/state.js#L113)

## 12. 父组件如何监听子组件生命周期？

*   vue2 使用 @hook:mounted
*   vue3 使用 @vue:mounted
*   自定义事件，在子组件生命周期中去执行
    下面是vue3的写法

```vue
<template>
  <h1 @click="send">Home 页面</h1>
  <Text @vue:mounted="fn" />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Text from '../components/Text.vue'
const fn = () => {
  console.log('Text mounted')
}
</script>

```

## 13. 说一下watch和computed的区别

*   watch: 用于声明在数据更改时调用的侦听回调
    *   在某个值发生改变时触发某些操作 如异步请求
    *   不会缓存结果，数据变化就执行回调
*   computed: 用于声明要在组件实例上暴露的计算属性。
    *   复杂的计算，依赖某个、多个数据，计算出新数据
    *   计算结果会有缓存，但是依赖数据一改变就会重写计算
    *   必须有返回值
    *   可以写set 和set
    *   不能有异步操作，有异步操作是无意义的

## 14. watch怎么停止监听？

```js
import { ref, watch } from 'vue'
const count = ref(0)
const soptWatch = watch(() => count.value, (newVal, oldVal) => {
  console.log(newVal, oldVal)
})
soptWatch()
```

## 15. v-for中 key的作用？

用来标识列表中每个元素的唯一标识符。`key` 的存在可以帮助Vue更高效地更新和渲染DOM。

## 16. Vue3中ref和reactive的区别？

*   `ref` 和 `reactive` 都是响应式数据的创建
*   参数不同
    *   `ref` 可以传引用数据和基础数据（number、string、Symbol、undefined、null、bigInt、boolean）
    *   `reactive`只能传入引用数据(object、arrary、map...)
*   使用不同，
    *   `ref`在js中需要`.value`,
    *   `reactive`可以直接访问
    *   `templete`中用法一样
*   实现上不同
    *   `ref`如果传入基础数据类型是[RefImpl](https://github1s.com/vuejs/core/blob/v3.5.0-alpha.4/packages/reactivity/src/ref.ts#L56)类的get set, 引用数据类型借助reactive,
    *   [`reactive`](https://github1s.com/vuejs/core/blob/v3.5.0-alpha.4/packages/reactivity/src/reactive.ts#L86)是同Proxy代理对象实现的响应式

## 17. Vue3中怎么访问实例？

```js
import { getCurrentInstance } from 'vue'
const instance = getCurrentInstance()
const appContext = instance.appContext
```

## 18. Vue中怎么做全局错误监听？

```js
// main.js
const app = createApp(App)
app.config.errorHandler = (err, vm, info) => {
  console.log(err, vm, info)
  // 错误日志上报
}
window.onerror = function (event) {};
// 未处理的promise错误
window.onunhandledrejection = function (event) {}
```

## 19. 怎么监听子组件内的错误？

```js
// 子组件
throw new Error("Error");

//父组件
import { onErrorCaptured } from 'vue'

// 监听到子组件错误，执行回调
onErrorCaptured((err) => {
  console.log('error', err)
})
```

## 20. 说一下keep-alive

keep-alive是vue的内置组件，用来缓存组件，配合vue-router可以实现缓存页面。
项目中，我们一般会在声明路由时，增加一个meta属性，用来控制页面是否需要缓存。

## 21. 页面跳转时，滚动到指定模块？

*   在具体页面，mounted构子中滚动到某个模块（可以通过参数判断啥的）
*   `scrollBehavior`声明路由时，配置dom、top等属性，页面存在指定元素
*

```js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home',
      keepAlive: true,
      scrollTo: {
        el: '#about-img',
        top: 0
      }
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.meta.scrollTo) {
      return {
        el: to.meta.scrollTo.el,
        top: to.meta.scrollTo.top,
        behavior: 'smooth'
      };
    }
  }
});

export default router;

```

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/117825540ebe4166b27531dd4adec8e8~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg56iL5bqP5ZGY5bCP5piT:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjAzMjM0NDc0NDg1NzEyNyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1724901598&x-orig-sign=K%2BqXvU%2B2enUUqgjFFNPix6kkSic%3D)

![跳转指定位置1.gif](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/2a1844a486a749cea729fbbcac2b1255~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg56iL5bqP5ZGY5bCP5piT:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjAzMjM0NDc0NDg1NzEyNyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1724901598&x-orig-sign=yofj3Pat5iOsBbY81iMnMDld0RM%3D)

## 22. vue-router怎么动态添加、删除路由？

```js
import { useRouter } from 'vue-router';

const router = useRouter();
const addRoute = () => {
  const newRoute = {
    path: '/hello', name: 'hello', component: () => import('../components/HelloWorld.vue'), // 动态加载组件
  };
  router.addRoute(newRoute);
};
```

删除路由:

```js
router.removeRoute('xxx');
```

## 23. 介绍一下vuex?

`vuex`是官方提供全局状态管理工具（vue2）,但是在vue3中更推荐使用`Pinia`。
`vuex`主要有五大特性：

*   `state`: 存储应用的全局状态，所有组件都可以访问
*   `getters`: 类似computed,用于派生属性
*   `mutations`: 唯一合理修改state数据的方法（同步）
*   `actions`: 异步异步操作，然后通过提交 commit 来修改state
*   `modules`: 将状态和相关的 mutations、getters、actions 进行模块化管理，一般是页面级

## 24. 页面刷新vuex数据丢失怎么处理？

*   使用第三方插件 进行 持久化数据 如 [vuex-persistedstate](https://www.npmjs.com/package/vuex-persistedstate)
*   写插件 注册时取、离开时存
    *   vuex 注册时，从缓存取数据 进行merge
    *   监听页面刷新状态 页面离开之前 存数据
    *   使用localstorage、sessionstorage进行存储
    *

```ts
// persistPlugin.ts
import { Store } from 'vuex';

interface PersistOptions {
  key?: string; // 存储的 key 名称
  storage?: Storage; // 存储方式
  paths?: string[]; // 需要持久化的 state 路径
}

export function createPersistedStatePlugin(options: PersistOptions) {
  const key = options.key || 'vuex-persisted-state'; // 存储的 key 名称
  const storage = options.storage || window.localStorage; // 存储方式，默认为 localStorage
  const paths = options.paths || []; // 需要持久化的 state 路径

  return (store: Store<any>) => {
    // 1. 初始化时从 storage 恢复数据
    const storedState = storage.getItem(key);
    if (storedState) {
      try {
        const parsedState = JSON.parse(storedState);
        store.replaceState({
          ...store.state,
          ...parsedState,
        });
      } catch {
        console.log('Error parsing stored state');
      }
    }
    //  // 2. 监听 页面卸载，将变化的数据存储到 storage
    window.addEventListener('beforeunload', () => {
      let stateToPersist = store.state;
      if (paths.length) {
        stateToPersist = paths.reduce((subState, path) => {
          const segments = path.split('.');
          const value = segments.reduce((acc, key) => acc[key], stateToPersist);
          return {
            ...subState,
            [path]: value,
          };
        }, {});
      }
      storage.setItem(key, JSON.stringify(stateToPersist));
    })
  };
}

```

使用

```ts
import { createStore, Store } from 'vuex'
import { createPersistedStatePlugin  } from './persistPlugin'
// 创建一个新的 store 实例
const store = createStore({
  state () {
    return {
      count: 0
    }
  },
  mutations: {
    increment (state:Store) {
      state.count++
    }
  },
  plugins: [createPersistedStatePlugin({
    key: 'vux-store',
    storage: window.localStorage,
    paths: []
  })]
})
export default store

```

## 25. SPA怎么优化首页白屏时间？

最终解决方案：`SSR` 服务端渲染

SPA: Single Page Application（单页应用），Vue 和 React都是。

Vue项目中，我们打完包生成`dist`时，如果没有指定`多入口`，就只会生成一个html文件，和一些js、css、图片等资源文件。html中并没有渲染元素，就一个id为app的div。页面上的元素都是通过请求js动态渲染上去。所有本身就挺慢的。

*   路由懒加载，首屏只请求首页相关js和css
*   组件异步加载，首页先渲染首屏的资源，首屏下面的组件异步加载
*   尽量减少http请求，因为浏览器有最大并发数限制，可以利用http2多路复用
*   利用打包工具做代码拆分，`splitChunks`
*   代码体积压缩gzip,打印日志去除
*   图片压缩、图片存入CDN

## 26. Vue线上Bug怎么在本地定位？

线上Bug一般是通过`监控日志`、`用户反馈`；

线上环境代码，我们一般经过了压缩、混淆、降级，所以和原代码差异会很大。

*   首先判断版本号，确定版本就是最新。再进行下列操作
*   通过报错信息，找到对应的.map文件
*   通过.map文件定位到原代码位置

## 27. Vue3中toRef和toRefs的区别

`toRef`: 基于响应式对象上的一个属性，创建一个对应的 ref。

`toRefs`: 将一个响应式对象转换为一个普通对象，这个普通对象的每个属性都是指向源对象相应属性的 ref。每个ref都是toRef创建的

```js
const data = reactive({
    count: 3,
    age: 18
})
const count = toRef(data, 'count') // data.count === count.value
console.log(count.value === data.count) // true

const name = toRef('小易') // 等价于 ref('小易')

const { count: count2, age } = toRefs(data)
console.log(count2.value === data.count) // true
console.log(age.value === data.age) // true

```

*   当我们使用reactive声明了一个对象，在模板中想直接访问属性时，toRefs是个很好的选择

```js

<script>
export default {
  setup() {
    const data = reactive({
      count: 3,
      age: 18
    })
    return {
      ...toRefs(data)
    }
  }
    
}
</script>

```

## 28.有使用过v-memo么？

`缓存一个模板的子树`。在元素和组件上都可以使用。为了实现缓存，该指令需要传入一个固定长度的依赖值数组进行比较。如果数组里的每个值都与最后一次的渲染相同，那么整个子树的更新将被跳过。

一般与v-for配合使用，`v-memo`的值是一个数组。数组的值不改变的情况，该组件及子组件就会跳过更新

*   v-memo 绑定的值没改变，子组件引用的响应数据变了，也不会更新

![v-memo.gif](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/58f2868c0d844352956175c092c51dba~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg56iL5bqP5ZGY5bCP5piT:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjAzMjM0NDc0NDg1NzEyNyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1724901598&x-orig-sign=5AFHnUwJadyaO%2Fsy0S7IOiMvc%2F4%3D)

## 29. 说一下Vue3声明一个响应式数据的方式？

*   `ref`:  通过.value访问及修改
*   `reactive`: 直接访问、只能声明引用数据类型
*   `computed`: 也是通过.value，声明需要 传 get、set
*   `toRef`: 类似ref的用法，可以把响应式数据的属性变成ref
*   `toRefs`: 可以把响应式数据所有属性 转成一个个ref
*   `shallRef`: 浅层的ref,第二层就不会触发响应式
*   `shallReactive`: 浅层的reactive,第二层就不会触发响应式
*   `customRef`: 自定义ref

## 30.说一下watch和watchEffect?

两者都是用来`监听数据变化，执行回调的`。

*   `watch`
    *   默认不立即执行，可以配置 immediate
    *   默认不深度监听， 可以配置deep
    *   必须指定监听数据
    *   可以终止监听
    *   可以拿到旧值
*   `watchEffect`
    *   默认立即执行
    *   默认深度监听
    *   不需要指定监听数据，用到的数据只要更新就执行回调
    *   拿不到旧值

## 31. 说一下Vue3中的宏有哪些？

*   `defineProps`: 声明props
*   `defineEmits`: 声明emit
*   `defineModel`: 用来声明一个双向绑定 prop
*   `defineExpose`: 指定对外暴露组件的属性
*   `defineOptions`：在script setup中提供组组件属性
*   `defineSlots`： 声明slots

## 结语：

如果本文对你有收获，麻烦动动发财的小手，点点关注、点点赞！！！👻👻👻

因为收藏===会了

如果有不对、更好的方式实现、可以优化的地方欢迎在评论区指出，谢谢👾👾👾
