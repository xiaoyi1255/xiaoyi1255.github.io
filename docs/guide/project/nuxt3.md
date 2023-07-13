---
title: 项目
titleTemplate: Nuxt3
---
本文主要介绍了从零搭建一个nuxt3 的**SSR**项目：页面配置、CSS处理、路由使用、组件定义、自定义hooks、server、**middleware**

中文官网： [https://www.nuxtjs.org.cn](https://www.nuxtjs.org.cn/getting-started/installation.html#%E5%88%9B%E5%BB%BA%E9%A1%B9%E7%9B%AE)

环境搭建：node 版本 > 14 我是 14.18.1

## 初始化项目 {#初始化项目}

```typescript
// 初始化
npx nuxi init appName
// 进入项目 & 安装依赖 可以使用 yarn npm 或者其它
cd appName && yarn 
```

#### 注意：初始化失败处理

如果没有以下报错则忽略继续往下

```typescript
ERROR  Failed to download template from registry: request to https://raw.githubusercontent.com/nuxt/starter/templates/templates/v3.json failed,reason: getaddrinfo ENOENT raw.githubusercontent.com
```

开始是觉得 没有翻墙的问题，还没搭了梯子还是不行，只能去[git](https://github.com/search?q=nuxt3)拉模板了

## 启动项目 {#启动项目}

```typescript
yarn dev -o 
```

看到下面的初始化页面，说明成功启动了项目

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e7cea17a52af4e86966dda0b98ac5e87~tplv-k3u1fbpfcp-zoom-1.image)

## 项目目录 {#项目目录}

细心的小伙伴就会发现，我们的目录很简洁

```typescript
- .nuxt
- node_modules
- .gitignore 
- app.vue 
- nuxt.config.ts
- package-lock.jso
- package.json
- README.md
- tsconfig.json  
```

这里我们可以配置成平常的开发目录

#### 新增src 目录

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2e5e904a10334534ac9e11fc8edf7dd4~tplv-k3u1fbpfcp-zoom-1.image)

#### 注意：nuxt是约定式的目录结构

我们新增了src框架本身并不能识别，所以需要配置在 nuxt.sonfig.ts文件中进行配置

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e18e6912d5fb465e87ef0edc5fa82247~tplv-k3u1fbpfcp-zoom-1.image)

## 项目开发注意点 {#项目开发注意点}

#### 1.配置 title 、meta 、及外链的引入 【全局和具体页面】

```typescript
// 这里配置的是全局的
// nuxt.config.ts 
app: {
    head: {
      title: '项目名称',
      meta: [],
      script: [],
      link: [],
      style: []
    }
  },

// 具体页面
<script lang="ts" setup>
useHead({
  titleTemplate: '项目名称', // 可以写模板
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  charset: 'utf-8',
  meta: [
    { name: 'description', content: 'My amazing site.' }
  ],
  // body添加类名
  bodyAttrs: {
    class: 'test'
  }
})
</script>
```

#### 2. css 预处理

##### 安装less

如果我们vue 文件中使用了 less、scss 或者其它css预处理语言，会报错，因为nuxt3 没有内置

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/519a1046173b425891b1e7efea2cc1ad~tplv-k3u1fbpfcp-zoom-1.image)

```typescript
yarn add less -D 
// 或
npm i less -D
```

安装less 之后就可以正常使用less 语法了

##### 全局css 样式、var

```typescript
// nuxt.config.ts 
// 这里和vite 中配置的意义
vite: {
        css: {
            preprocessorOptions: {
              less: {
                modifyVars: {
                  '@theme-colors': '#333333',
                  '@assist-colors': '#EE1B24',
                  '@white': '#FFFFFF'
                },
                javascriptEnabled: true,
                additionalData: `@import "${resolve(__dirname, 'src/assets/style/mixin.less')}";`
              },
            },
          },
    },
```

##### postcss 配置

```typescript
postcss: {
        plugins: {
            // 这个工具可以实现自动添加CSS3前缀
            "autoprefixer": {
                overrideBrowserslist: ["last 5 version", ">1%", "ie >=8"]
            },
            'postcss-pxtorem': {
                rootValue: 192, // 指定转换倍率，我现在设置这个表示1rem=192px;
                propList: ['*'], // 属性列表，表示你要把哪些css属性的px转换成rem，这个*表示所有
                mediaQuery: false, // 是否允许使用媒体查询，false媒体查询的代码可用，true不可用
                exclude: 'ignore',
                replace: true, // 替换包含rem的规则，而不是添加回退
                minPixelValue: 1, // 需要转换的最小值，一般1px像素不转换，以上才转换
                unitPrecision: 6, // 转换成rem单位的小数点后的保留位数
                selectorBalckList: ["/.van-/"], // 匹配不被转换为rem的选择器
            },
        },
    },
```

#### 3. 路由定义

不需声明路由文件及配置，需在**pages**下写对应的页面，嵌套路由配置成文件夹

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c0aef229f82e4ca5bfed91877002b6cb~tplv-k3u1fbpfcp-zoom-1.image)

#### 4.组件定义

和路由一样，不需要额外申明，需在**components**下定义

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/186c4018b3b446e3840f2840b14eedb9~tplv-k3u1fbpfcp-zoom-1.image)

组件的使用： 在任意vue 文件中使用 正常使用组件懒加载

```typescript
// 正常使用
<template>
  <ListButton />
</template>

// 组价**懒加载** 前面 + Lazy
<template>
  <LazyListButton />
</template>
```

**组件懒加载**

#### 5.自定义hooks
在 **composables** 下声明文件

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1fddd704477a4918bf5cf0eef266fc31~tplv-k3u1fbpfcp-zoom-1.image)

使用

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/738f9f0b05f3494cba11c213f348a447~tplv-k3u1fbpfcp-zoom-1.image)

#### 6.server 的使用
在 **server** 下声明并使用

```typescript
// src/server/api/user.ts
export default () => {
    return Promise.resolve({
        code: 200,
        data: {
            name: 'xiaoyi'
        }
    })
}

// pages/index.vue
<script lang="ts" setup>
const res = await $fetch("/api/user");
console.log(res) // {"code": 200, "data": { "name": "xiaoyi"} }
</script>
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8b60ba78927b4068a0ef5289173faee0~tplv-k3u1fbpfcp-zoom-1.image)

除了已上的使用，我们还可以使用中间件，针对业务打一些**日志**呀什么的，需要注意的是 它是所有请求都会经过这个**中间件**

```typescript
// 这里需要先安装一下 h3
yarn add h3
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/24e63a7f18194299be6702c4c14e19f2~tplv-k3u1fbpfcp-zoom-1.image)

**在服务端获取数据的使用**

-   useAsyncData
-   useFetch
-   useLazyAsyncData
-   useLazyFetch

## 源码 {#源码}

[nuxt3-temple](https://github.com/xiaoyi1255/nuxt3-temple.git)
