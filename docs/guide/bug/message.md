---
title: bug
titleTemplate: message
---

# ant-design-vue的Message直接不展示了？

[官方有issuses:](https://github.com/vueComponent/ant-design-vue/issues/6877)

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8c1edad9b4a34da0a5d2b8fa996241aa~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=555&h=339&e=png&b=282c34)

## 环境:
```sh
node: 16.14.1
vue: 3.2.47
nuxt: 3.2.2
ant-design-vue: 4.0.0
pm2: 5.3.0
```

## 本地复现

### message正常使用

```javascript
<template>
<Button @click="openMessage">打开全局提示</Button>

</template>

<script setup lang="ts">
import { message, Button } from "ant-design-vue";

const openMessage = () => {
    message.success('什么？老板说杀个程序员去祭天？')
}

</script>
```
### 本地 npm run dev => 页面展示：正常
![dev.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c7b69fb09b614f21952c06a58b46b41e~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1602&h=538&e=gif&f=30&b=fdfcfc)

### 使用pm2跑 => 页面展示不正常
* pm2模拟线上环境：出问题了 => 一看 DOM 生成了**样式错乱**
* 但是线上是直接不展示
![build.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3be6dcf0c04b4b54b4eb5bb1e493aa72~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1901&h=690&e=gif&f=79&b=fefefe)


## 解决方案1：样式穿透(不靠谱)
* 这种方式不太靠谱 （因为昨天线上，直接不展示了，而不是漏半个头）
```vue
<style>
:where(.css-eq3tly).ant-message{
    left: 0;
}
</style>
```
## 终极解决方案
可以在app.vue 加上前置class

```vue
<script setup>
import { message } from 'ant-design-vue'
message.config({
	duration: 2,
	maxCount: 2,
	rtl: true,
	prefixCls: '_message_'

})
</script>

<style>
._message_{
	left: 0;
}

</style>

```
![build2.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9ae3dff8424b47fc87ba84bb97982387~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1497&h=690&e=gif&f=81&b=fdfdfd)


## 结语
像这类似问题可以网上查：
* 自己先本地尝试复现、解决；解决不了再百度
* 我这里其实踩了两次坑：
    - 第一次就是现在复现的（一半展示在屏幕外）
    - 第二次线上直接不展示了
* git 翻issues(也许其他人也遇到了，，如果没有人提，也可以自己提)
* chatgpt (很多时候不靠谱)
* 百度、csdn、stackoverflow



什么？线上的ant-design-vue的Message坏了？有的只展示了一半，还有完全不展示的！！