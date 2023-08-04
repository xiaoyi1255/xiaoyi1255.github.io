---
title: bug
titleTemplate: 又来啦
---
# 同学醒醒！还有个Bug没有改呢

## open被拦截-已修复 {#open被拦截-已修复}

故事背景

2022-06-27：wan支付业务的一个api授权。点击授权按钮，先通过ajax获取授权链接，再打开新窗口。chorme是正常的，但是Firefox就没有打开，需要用户手动授权，允许。这里不得不 **夸** 它一句，安全机制够好呀！测试了在ajax之前是可以正常打开的，await 后面 或者.then里面都是跳不过去的。

```typescript
let res = await axios.get('xxxx')
// 正常浏览器下是能打开的如chorme
// 但是 火狐浏览器就被拦截了
window.open('https://www.baidu.com', '_blank')
```

火狐浏览器拦截

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e4e9bffd3c964534a922d5f1efa35bdb~tplv-k3u1fbpfcp-zoom-1.image)

```typescript
// 先获取url
let url = await axios.get('xxxx')

// 方案1 动态生成 a标签，通过a标签进行跳转
 const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('style', 'display:none');
  a.setAttribute('target', '_blank');
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
// 方案2 动态创建 form 通过表单提交的方式
 const form = document.createElement('form')
  form.setAttribute('action', url);
  form.setAttribute('style', 'display:none');
  form.setAttribute('target', '_blank');
  form.method = 'POST'
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
// 方案3 直接调window.open
window.open(url, '_blank')
```

```typescript
let res = await axios.get('xxxx')
// 放在setTimeout 里面就能正常打开了
setTimeout(function() {
  window.open('https://www.baidu.com', '_blank')
},0)
```

## 全局样式、样式穿透=》已修复 {#全局样式、样式穿透=》已修复}

故事背景

2022-07-06：开发模块的时候，用到element ui 的组件；需要对滚动组件进行样式穿透，写在了 style中:导致。下拉框用到了这个类型造成，下拉框没有正常展示

```typescript
// 错误写法
<style>
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
// </style>

//改造
<style scoped>
  ::v-deep .el-scrollbar__wrap {
    overflow-x: hidden;
  }
</style>
```

## vue3使用eventBus=》未修复 {#vue3中使用了eventBus=》未修复}

故事背景

2022-07-06： 需求场景，点击 tab 标签页的时候，重新做数据请求，el-tabs;

开始：通过发布订阅 eventBus 来实现，点击切换的时候进行 emit 触发，各个子组件之间的刷新、重新请求。使用方式，在main.js 通过 provide 注入，在子组件 直接 inject 引入 使用。结果导致页面一直在加载，具体原因未知。所以改变了其它实现方式。**v-if 通过变量去控制（真香）**

```typescript
class EventBus {
  constructor () {
    this.events = Object.create(null)
  }
  
  $emit (eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(function (fn) {
        fn(data)
      })
    }
  }
  
  $on (eventName, fn) {
    this.events[eventName] = this.events[eventName] || []
    this.events[eventName].push(fn)
  }
  
  $off (eventName, fn) {
    if (this.events[eventName]) {
      for (var i = 0; i < this.events[eventName].length; i++) {
        if (this.events[eventName][i] === fn) {
          this.events[eventName].splice(i, 1)
          break
        }
      };
    }
  }
}
const eventBus = new EventBus()
export default eventBus
```

```typescript
<el-tabs v-model="activeName" @tab-click="handleClick">
  <el-tab-pane label="店铺" name="first">
    <ShopList v-if="activeName === 'first'" />
  </el-tab-pane>
  <el-tab-pane label="订单" name="second">
    <OrderList v-if="activeName === 'second'" />
  </el-tab-pane>
</el-tabs>
```

## vue3 provide 和 inject {#vue3 provide 和 inject}

故事背景

2022-08-08：需求场景：游戏站里面使用了自己封装的倒计时组件，2个页面、四个地方。

方案1：vuex 来进行data 共享

方案2：provide 和 inject (这里采用的是2)

在首页通过ajax请求拿到 时间，然后注入；问题是：孙子组件中拿不到 时间。

可能因素：异步、生命构子，嵌套的组件生命周期先后执行顺序

**解决：把注入的数据设置成响应式，ajax拿到数据 之后，改响应式数据，即可**

```typescript
// index.vue 注入依赖的地方
getCuntDownTime({}).then(res => {
	let endTime = +new Date(res)
	console.log(endTime)
	provide("cuntDownTime", endTime)
}).catch(err => {
	provide("cuntDownTime", 0)
})

// /pc/index.vue mobile/index.vue 孙子组件
import { ref, inject } from "vue";

const cuntDownTime = inject('cuntDownTime') || 0

const endTime = ref(cuntDownTime); // 1658923195025
const isShow = ref(cuntDownTime - +new Date() > 0)
```

```typescript
// index.vue 注入依赖的地方
// 使用的地方不需要改变
import { provide, ref } from 'vue'

const endTime = ref(0)
provide("cuntDownTime", endTime)
getCuntDownTime({}).then(res => {
	endTime.value = +new Date(res) || 0
}).catch(err => {
	provide("cuntDownTime", 0)
	console.log(err)
})
```

## element-plus按需打包，弹出框报错 {#element-plus按需打包，弹出框报错}

故事背景

2022-09-07： 手上的开发的游戏站即将上线【vite3 +vue3】,产品突然说，网站首页加载太慢,确实挺慢的，挂了梯子13s ^_^,无奈的前端开发[wo]只能硬着头皮去优化

优化点：

1.图片懒加载，使用自定义指令的形式

2.路由懒加载(先前就做了的

3.代码gzip压缩vite-plugin-compression

4.图片压缩 vite-plugin-imagemin

5.**element-plus 按需打包 （然后弹出框就开始报错了）**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3f8b9a4a2a0c44aa97842af449636164~tplv-k3u1fbpfcp-zoom-1.image)

解决方案： 网上查，官方暂未给出解决方案，，所以就放弃了

```typescript
export default (app) => {
    // 图片懒加载指令
    app.directive('lazyload', {
        mounted(el, binding) { // vue2.0 inserted vue3.0 mounted
            const observer = new IntersectionObserver(([{ isIntersecting }]) => {
                if (isIntersecting) { // isIntersecting判断是否进入视图
                    observer.unobserve(el) // 进入视图后，停止监听
                    el.onerror = () => { // 加载失败显示默认图片
                        // el.src = '/img/a.jpg'
                    }
                    el.src = binding.value // 进入视图后，把指令绑定的值赋值给src属性，显示图片
                }
            }, {
                rootMargin: '0px 0px 100px 0px',
                // threshold: 0.01 // 当图片img元素占比视图0.01时 el.src = binding.value
            })
            observer.observe(el) //观察指令绑定的dom
        }
    })
}
//注册 main.js
lozyLoad(app)

// 使用 index.vue
// v-lazyload 替换原来的src 属性
<img v-lazyload='src' />
```

```typescript
// vite.config.js
import viteImagemin from "vite-plugin-imagemin";
import viteCompression from "vite-plugin-compression";

 plugins: [
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 20,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: "removeViewBox",
          },
          {
            name: "removeEmptyAttrs",
            active: false,
          },
        ],
      },
    }),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: "gzip",
      ext: "gz",
    }),
 ]
```

## vue项目中class不生效 {#vue项目中class不生效}

故事背景

2022-10-12：孝鑫同学在开发弹幕组件，弹幕是动态删除和创建的

问题描述：弹幕动态生成，在添加上类名，页面上dom有class但是没有生效

根本原因：style 标签上有scoped，原先class带有前缀隔离。动态生成的class匹配不到style中的类名

## vue key慎用 随机数 {#vue key慎用 随机数}

背景

2022-12-27：静明同学在开发记忆卡牌游戏，历尽千辛万苦，终于把游戏逻辑开发完成：点击一张卡片，卡片翻过来，过1s翻回去，连续点击两种花色一样的卡牌，则两张一起翻过来，并且不能再点击...

问题描述： 翻卡牌的动画是css写的3d翻转，transition却怎么也不生效

根本原因：v-for 出来的卡牌 key=“index + Math.random()”每次点击，整个v-for 的dom都重新渲染了，导致不生效；

解决办法：key 正常写就好了

## 获取当日零点时间戳 {#获取当日零点时间戳}

```typescript
const timeStamp = +new Date(new Date(new Date()、getTime()).setHours(0, 0, 0, 0)) // 当天0点时间戳
```

## 数组打乱顺序 {#数组打乱顺序}

背景

2022-12-27：静明同学，有个打乱数组顺序的需求

问题描述：打乱顺序后的数据 和 通过v-for渲染的数组数据不一致；是在setup 构子中构建的数组数据，数组是同一个，并且是在打乱顺序后才给赋值的。。。

根本问题：未解之谜

解决办法：我把打乱顺序的方法放到 onMounted 构子中执行就好了

```typescript
const shuffle = (array: CardItem[]) => {
  const arr = []
  const nums = array.slice(0)
  const len = nums.length
  for (let i = 0; i < len; i++) {
    const index = Math.floor(Math.random() * nums.length)
    arr[i] = nums[index]
    nums.splice(index, 1)
  }
  return arr
}
```

## vuerouter 懒加载 {#vuerouter 懒加载}

背景

2023-02-16：静明同学，优化项目

问题描述：该项目原本是没有vue的路由懒加载的，因为最近在处理项目的优化工作，一看就发现可以把懒加载加上，才引发了**多页面跳回vue页面** 报错的问题。

```typescript
TypeError: Cannot read properties of undefined (reading '__asyncLoader')
```

在一顿操作下，终于找到了解决方法：**defineAsyncComponent**

**解决办法如下：**

```typescript
import { createApp, defineAsyncComponent } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';

const payAccount = defineAsyncComponent(() => import('../pages/index.vue'));

// 报错的写法如下 注：也只有在多页跳回单元遇到了这种情况
// const payAccount = () => import('../pages/index.vue')
```

## user-agent {#user-agent}

背景

20223/02/27: 静明同学 进行 super....官网的开发

项目： Nuxt3 + vite 搭建的，PC 和移动端 使用的postcss pxToRem 实现的适配

引了一个 '@nuxt/device' 的库用来区分是PC 还是移动端

运维同学在部署服务器的时候，ng 代理的请求 user-agent 给我整丢了，，结果一直判断不正确

各种排查，，甚至怀疑了库的源码

## 获取url参数 {#获取url参数}

背景

2023/03/14：静明同学 publis...后台项目

项目：ant design Pro 搭建的后台

单点登录功能：token的读取 （从主admin 通过token 进行伪登录）

问题： 读取url 参数 token的值 由多个 “=” 组成，，解析后给后端传过去的token ，

后端: 我给你的token不是你传给我的这个，第一反应是从 admin 跳过来的时候带的token不对，然后经过 几分钟排查：跳转携带的参数没有问题!!!

结论： 我自己解析url的时候 搞丢了

心里：copy 的那个吊毛的代码，获取url都能搞错【诶，问问G老师去gpt】

一顿操作下来终于找到了个能用的欣慰。。。

```typescript
export function getParamsKey(href: string) {
    let encodeStr = href.split('?')[1];
    let decodeStr = decodeURIComponent(encodeStr);
    if (decodeStr.includes('&')) {
        let paramsArr = decodeStr.split('&');
        let obj = {};
        paramsArr.forEach((el) => {
            let [key, value] = el.split('=');
            obj[key] = value;
        });
        return obj;
    } else {
        let [key, value] = decodeStr.split('=');

        return {
            [key]: value,
        };
    }
}
```

```typescript
export function getParamByKey(name: string, url: string) {
    let start = url.indexOf('?');
    if (start === -1) {
        return null;
    }
    let params = url.substring(start + 1).split('&');
    for (let i = 0; i < params.length; i++) {
        let param = params[i].split('=');
        if (param[0] === name) {
            let value = '';
            for (let j = 1; j < param.length; j++) {
                if (j > 1) {
                    value += '=';
                }
                value += param[j];
            }
            return decodeURIComponent(value);
        }
    }
    return null;
}
```

## jquery dataTables {#jquery dataTables}

背景

2023/03/30: 静明同学突然发现 自己维护的adin 有bug

项目： jq + Vue + vben + ant-design-vue 搭建的后台

问题：分页器展示了两个![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5b7e272681a844d5a6fa27528a2199d2~tplv-k3u1fbpfcp-zoom-1.image)

心里暗示：你已经是一个成熟的程序员

对于这个问题：debugger log 看家本领都拿出来了

1.  $('#dataTable').DataTable会不会实例了两次
1.  js 文件是否重复加载
1.  分页器是否写了两个

一顿操作下来：已上猜想都不是《》《》《》

看来是想逼我出绝招：删代码

还别说，，真管用 这不就找到了

```typescript
const table = $('#dataTable').DataTable({
        dom: 'Bprtip',
        ...
    })
```

在心中暗自 问候了几句之后就改好了，，

我真机智

## 新旧版本之间 缓存逻辑复用问题 {#新旧版本之间 缓存逻辑复用问题}

localStorage

背景：2023.05.29 小明同学接到个 推荐弹窗 在原生弹起的需求

项目：yowin-cp vue3+vant3

问题：app内嵌套了 h5（webview），推荐弹窗逻辑是用缓存判断的，然后一顿操作下来条件都没有问题，为什么弹窗没有弹出来呢？

app的内置h5是就版本，旧版本去跟新了缓存，新版h5判断到的是旧版h5设置的缓存 直接忌了

```typescript
const recommendPopFn = (e: { data: any  })=>{
    const { data } = e
    const now = new Date()
    const before = new Date(now.getTime() - 1000 * 60 * 60 * 24)
    const date = now.getFullYear()+"-"+now.getMonth()+"-"+now.getDate()
    const beforeDate = before.getFullYear()+"-"+before.getMonth()+"-"+before.getDate()
    const hours = now.getHours()
    const current = (hours >=0 && hours<12) ? '1' : '2'
    const heavenlyRedEnvelopeDataShow = localStorage.getItem(date+"_heavenlyRe3")
    //兼容
    const oldheavenlyRedEnvelopeDataShow = localStorage.getItem(date+"_heavenlyRed")
    if(!heavenlyRedEnvelopeDataShow){
      //把昨天的key删除
      localStorage.removeItem(beforeDate+"_heavenlyRe3")
    }
    if(store.state.task.taskList?.recommendPopTask.length
       && ( !heavenlyRedEnvelopeDataShow || heavenlyRedEnvelopeDataShow != current  )
       && store.state.riskResult == 'pass'
       && !oldheavenlyRedEnvelopeDataShow
       && (!mapPop.get(date) || new Date().getTime() - mapPop.get(date)  > 1 * 1000)
      ){
        time = setInterval(() => {
          if (remcommCanPop && hasRecommTask) { //  && hasRecommTask
            mapPop.set(date, new Date().getTime());
            localStorage.setItem(date+"_heavenlyRe3",current)
            localStorage.setItem('recommendPopData', JSON.stringify(recommendPop.value))
            // window.trackEvent({ pageTitle: "taskPage", ev: "showNewuserTaskPop"});
            window.trackEvent({ pageTitle: "taskPage", ev: "recommendPopShow",remarks:JSON.stringify(data|| {}) });
            console.log('recommonPop 11111222', store.state.task.taskList?.recommendPopTask)
            console.log('能弹了', hasRecommTask)
            window.webView.create('/recommonPop?name='+data?.name+'&isWebView=true'+'&t='+new Date().getTime(),'',getEcId(),false,"full", 0.3)
            clearInterval(time)
          }
        }, 500)
        return
    }
}
```

## 断电导致vue项目git不显示分支 {#断电导致vue项目git不显示分支}

.git

背景：2023.06.02 小明同学早上打开 cp 项目

项目：yowin-cp vue3+vants+ts

问题：项目分支没有了，提示需要初始化git

wtf? 难道是昨天断了3次电，自动重启 导致的？

解决：

1.  先是把项目跑起来，没有报错，正常，那说明只是 .git文件夹坏了
1.  重新克隆了远程的仓库 一切正常，吧新拉的.git文件替换 坏的. git 也坏了
1.  先是百度、chatgpt了一波，没有啥收获
1.  后面发现 是 HEAD 文件乱码了 下面有贴图

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aec4d891fd7042cabbee101bc79ee97c~tplv-k3u1fbpfcp-zoom-1.image)

```typescript
// HEAD：指向当前活动分支的引用，也可以是指向某个提交（commit）的引用。

// config：存储Git仓库的配置信息，包括用户信息、远程仓库设置等。

// objects：存储Git对象的目录，包括提交、树（tree）和文件（blob）等。

// refs：存储引用（references）的目录，包括分支、标签和远程跟踪分支等。

// index：暂存区（stage）的索引文件，记录了当前工作目录中已经修改的文件和将要提交的文件。

// logs：存储分支和引用的日志信息，包括提交历史、分支移动等。

// hooks：存储自定义钩子脚本的目录，可以在特定的Git操作事件触发时执行脚本。
```

## url判断是否包含某个子串
```typescript
const sceneObj = {}
if (!url || !url.includes('http')) return sceneObj
  let newUrl = url.toLowerCase()
  // 广告存在
  
  const isNeedAd = store.state.model?.mediationAdList?.some((item:any) => {
    if (newUrl.includes(item.scene)) { // 就是这里，判断子串，没有判空
      sceneObj.scene = item.scene
      return true
    }
  })
```

不要喷啦，我自己喷过几次啦！！！！
我判断了url非空，，但是没有判断item.scene 真是服了，，大聪明