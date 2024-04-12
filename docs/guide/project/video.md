---
title: 仿抖音的视频流页面
titleTemplate: nestjs-vue3-ssr-video
---

本文主要介绍了基于Vue3构建一个仿抖音的视频流页面。

环境：node版本 v16.14.1

## 初始化项目
基于srr脚手架快速搭建项目
[SSR](http://doc.ssr-fc.com/docs/features$started)
```bash
npm init ssr-app xxx-project
cd ssr-app xxx-project
yarn
yarn start
```
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d32e9fb83a194f76ace6bf381b3e969b~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=968&h=372&s=433264&e=png&b=272c34)

## 使用swiper实现上下切换
1. 监听滚动事件，来切换（不好）
2. css 的吸附属性 (需要配合IntersectionObserver使用，才能自动播放下一个视频)
```css
.videos {
  font-size: 0.14rem;
  height: 100%;
  overflow-y: auto;
  scroll-snap-type: y mandatory;

  &-item {
    scroll-snap-align: start;
    scroll-snap-stop: always;
  }
}
```
3. 轮播图（有change时间，通过change事件来控制播放，好实现）
```vue
<template>
  <van-swipe ref="swiperRef" style="width: 100%;height: 100%; background-color: black;" :initial-swipe="0"
    @change="changeVideo" :loop="false" vertical :show-indicators="false" :lazy-render="false">
    <van-swipe-item v-for="(item, index) in videoList" :key="index">
      <img :src="item.cover" >
    </van-swipe-item>
  </van-swipe>
</template>
```
看下效果=> 这样就实现了一个竖向的轮播图
![swiper.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f6838b484bd248eab1c88cf0d831a981~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=429&h=826&s=2873736&e=gif&f=50&b=dae7e6)


## 使用videojs解析m3u8视频播放
### 安装npm包
videojs 
```bash
yarn add videojs@8.11.0
```
### vue中具体使用
```vue
<template>
  <div style="width: 100vw;height: 100vh;">
    <video :class="`video-item video-js vjs-big-play-centered vjs-fluid`" style="width: 100%;height: 100vh;" ref="videRef" :poster="item.videoBaseInfo.cover">
      <p>Your browser does not support the video tag.</p>
    </video>
  </div>
</template>
<script setup lang="ts">
import { ref,  reactive, defineProps } from "vue";
import 'video.js/dist/video-js.css'
import videojs from 'video.js'

const props = defineProps<{
  index: number,
  cureentIndex: number,
  item: {
    "videoAuthorInfo": {
      "authorUid": 0,
      "avatar": "",
      followFlag: false
    },
    "videoBaseInfo": {
      "contentId": 0,
      "cover": "",
      "description": "",
      "title": "",
      "videoUrl": ""
    },
    "videoStatisticsInfo": {
      "comments": 0,
      "likes": 0
    }
  },
  isMuted: Boolean
}>()

const player: any = reactive({
  instance: null,
  status: 'pause',
  totalTime: 0,
  cureentTime: 0,
})
const videRef = ref(null)

const videoOptions = {
    controls: false, // 是否显示控制条
    autoplay: false,
    // preload: 'auto',
    // muted: props.isMuted,
    muted: false,
    loop: true,
    fluid: true,
    controlBar: { 
      children: [
      ],
    },
    sources: [{
      // src: 'http://recordcdn.quklive.com/upload/vod/user1462960877450854/1550739580345725/1/video.m3u8',
      src: props.item.videoBaseInfo.videoUrl,
      // type: 'application/x-mpegURL'
    }],
    bigPlayButton: false, // 播放按钮
    userActions: {
      click: false, // 禁止点击
      // download: false, // 禁止下载
      // hotkeys: false, // 禁止热键
      doubleClick: true // 禁止双击
    }
}

// videojs创建播放器会返回实例，用变量保存起来，然后在需要的地方调用。
player.instance = videojs(videRef.value, videoOptions,function(){
  // 对视频播放、暂停、异常等事件进行监听 处理
})
</script>
```
### 播放事件、双击点赞
因为后期会用到一个双击点赞的功能，所以这里使用一个空盒子来进行事件绑定
```vue
<template>
  <div class="video-box" @click="changePlay" @dblclick="changeCollect"></div>
  <video ref="videRef" ></video>
</template>

<script setup lang="ts">
let timer: number = 0;
const changePlay = (type: number) => {
  clearTimeout(timer)
  timer = setTimeout(() => {
    if (player?.instance?.paused()) {
      player.instance?.play()
    } else {
      player.instance?.pause()
    }
  }, 100)
}
</script>
<style>
  .video-box {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 3;
  }
</style>
```
我们看下播放的效果
![playvideo.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1b1bdda22c134dcba44be28fc29b1e9f~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=359&h=802&s=1006374&e=gif&f=31&b=d9e5e1)
从上图中看，实现了上下滑动，点击播放。
细心的小伙伴就会发现---我开始播放这个了，上一个还在播放...
是的，没错---这就是接下来要解决的问题
### 多视频播放问题
问题描述：
 - 上下滑动时，上一个播放中的视频没有暂停，开始播放当前视频。出现多视频播放
 - 希望滑到当前视频可以自动进行播放
解决：在swiper的change事件中进行控制，代码如下
1. 在swiper的change事件中进行控制 => 播放当前视频 + 暂停上一个视频（可能是上滑、下滑==> 所以直接暂停上一个和下一个）
2. 使用ref获取实例进行控制，在VideoItem组件中向外暴露控制视实例instance
```vue
<!-- 子组件 -->
<script setup lang="ts">
import videojs from 'video.js'

const player = reactive({
  status: 'pause',
})

player.instance = videojs(document.getElementById(id), {})
defineExpose({
  player, // 播放器实例
})
</script>

<!-- 父组件 -->
<template>
  <div class="videos">
    <van-swipe ref="swiperRef" @change="changeVideo" >
      <van-swipe-item v-for="(item, index) in videoList" :key="index">
        <VideoItem ref="videoItemRef" :index="index + 1" :item="list[index]" :isMuted="isMuted" :cureentIndex="cureentIndex" @handleNext="handleNext" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script setup lang="ts">
import VideoItem from './components/videoItem.vue';
import { ref，getCurrentInstance } from 'vue';
const { proxy } = getCurrentInstance()

let cureentIndex = ref(0)

const changeVideo = (index: number) => {
  cureentIndex.value = index;
  const player = proxy.$refs.videoItemRef[cureentIndex.value]?.player?.instance
  const player1 = proxy.$refs.videoItemRef[cureentIndex.value - 1]?.player?.instance
  const player2 = proxy.$refs.videoItemRef[cureentIndex.value + 1]?.player?.instance
  player1?.pause() // 暂停上一个
  player2?.pause() // 暂停下一个
  player?.play() // 播放当前
}
</script>
```
看下最终效果---美滋滋
![playvideo2.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aa17dbc998fb4ef483bf8a5ed911be6a~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=359&h=802&s=3508628&e=gif&f=91&b=c8bdc9)

#### 构建报错
原因：开发过程中切换过node版本
解决：后面是切换了node版本：16.14.1 就好了
```js
Uncaught ReferenceError: _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_10___default is not defined
```
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/395028c9a9f34818b4f5bcdeecc05930~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1857&h=615&s=705410&e=png&b=fdf6f6)

## 优化方向
- 视频尺寸问题（产品说就要撑满屏幕播放）
- 视频播放卡顿问题（产品说要快一点）
- 视频播放进度条问题

## 1.视频尺寸问题
我们经常刷的抖音很多视频就是撑满屏幕的。

产品：人家怎么做到的呢？像抖音、像油管
卑微前端：根据视频原尺寸动态计算
服务端： 我能给你返回视频原尺寸
卑微前端：唯唯诺诺，，那那那行吧！！！

### 解决思路：
1. 获取视频原尺寸 （接口返回）
2. 计算视频尺寸
    - 需要判断是否为竖屏视频 （宽高比 => 具体可以自己定）
    - 根据宽高比去通过屏幕高 => 动态计算视频宽度
    - 因为原先视频高度就不够，宽度刚好撑满，所以让视频撑满必然需要拉高，拉高好不能影响原视频比例
    - 视频标签需要一个父盒子来进行定位居中
```js
let videoWidth = item.videoBaseInfo.width; // 原视频宽
let videoHeight = item.videoBaseInfo.height; // 原视频高
let videoRate = videoWidth/videoHeight; // 原视频宽高比

let screenHeight = window.innerHeight; // 设备高
let screenWidth = window.innerWidth; // 设备宽

if (videoRate < 1) { // 竖屏视频
  videoWidth = screenHeight * videoRate; // 屏幕高 * 视频宽高比 = 视频宽度（视频高度刚好撑满）
}
// 视频宽度 > 屏幕宽度，需要进行居中
let left = 0
if (videoWidth > screenWidth) {
  left = (videoWidth - screenWidth) / 2;
}
```
3. 动态设置video标签的宽高及居中
我们先记住这个黑边
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7246eab0e60a4d4ab07f089186123f73~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=372&h=807&s=691961&e=png&b=010101)
下面是关键代码
```vue
<template>
<div :style="videoStyle[1]">
  <video :style="videoStyle[0]":poster="item.videoBaseInfo.cover">
    <p>Your browser does not support the video tag.</p>
  </video>
</div>
</template>
<script setup lang="ts">
import { ref,  reactive, computed } from "vue";

const videoStyle = computed(() => {
  const { videoWidth, videoHeight } = props.item.videoBaseInfo;
  const deviceHeight = window.innerHeight;

  const videoAspectRatio = videoWidth / videoHeight;
  // 获取设备屏幕高度，用于计算视频的最终宽度
  
  // 宽视频不处理
  if(videoAspectRatio > 1){
    return [{},{height: '100vh', width: '100vw'}];
  }

  const finalWidth = deviceHeight * videoAspectRatio;
  // 获取设备屏幕宽度，用于后续判断是否需要进行水平平移
  const deviceWidth = window.innerWidth;
  // 计算视频元素的左边距，以实现居中
  const left = finalWidth > deviceWidth ? -(finalWidth - deviceWidth) / 2 : 0;

  // 返回应用于视频的样式对象
  return [
    {
      // 
      width: `${finalWidth}px`,
      height: '100vh',
    },
    {
      position: 'absolute',
      width: `${finalWidth}px`,
      height: '100vh',
      left: `${left}px`,
    }
  ];
});
</script>
```
下面是效果图
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6cdc7af1425244acacd1b3ad284ce1dd~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=797&h=832&s=1479874&e=png&b=834765)

## 2.卡顿问题
背景：因为这个视频流的需求，最终是嵌套在webview中使用。然后app分给webview的内存是有限的，所以video标签过多就会出现卡顿。
现象：测试那边刷到50多个视频的时候，就会变得很卡顿。60多甚至会卡死app

当然，直接在chrome上，测试是100来个才会卡死。

### 解决思路
1. 通过控制renderVideoList 来分批次渲染， allVideoList（接口拉取的所有视频）
    - 视频的拉取分页，一次12个；然后前端再维护一个渲染列表
    - 当用户滑到倒数第几个的时候，再往渲染列表里添加视频
    - renderVideoList 没有渲染完从allVideoList拿，拿完再请求接口
    - 这里一次往渲染列表+5个（可以酌情增加、减少）
2. 通过动态增加和减少video标签的个数来解决
    - 通过控制video标签的个数，来控制渲染视频的个数
    - video超过n+1个时，删除第1个、以此类推
    - 回到第n-1个时,动态添加第1个、以此类推
常言道：前辈们已经铺好了路，咱就照着走
3. 参考下抖音和油管
    - 油管：只留了1个video
    - 抖音：只留了3个video
4. 实践之后发现刷得快，3个有点不够，出现loading较多--还是保留四个吧 
    - 维护renderVideoList和allVideoList
    - video只存在4个（当前、上一个、下一个、下下个）
    - 第一次只初始化2个video
    - 滑到第2个 => 加载第3个、第4个
    - 滑到第3个 => 加载第5个 + 销毁第1个 => 存在2,3,4,5
    - 滑到第4个 => 加载第6个 + 销毁第2个 => 存在3,4,5,6
#### 关键代码

```js
const list:any = computed(()=> VIDEO_LIST || []) // 接口拉的所有视频列表
let cureentIndex = ref(0) // 当前播放视频索引

let maxIdx = 0 // 播放到的最大索引
// 切换上、下视频， 播放当前，暂停 上、下
const changeVideo = (index: number) => {
  cureentIndex.value = index;
  maxIdx = Math.max(maxIdx, index)
  if (videoList.value.length - 3 === index) {
    onLoad()
  }
  loadNextVideo(maxIdx===index)
  const player = proxy.$refs.videoItemRef[cureentIndex.value]?.player?.instance
  const player1 = proxy.$refs.videoItemRef[cureentIndex.value - 1]?.player?.instance
  const player2 = proxy.$refs.videoItemRef[cureentIndex.value + 1]?.player?.instance
  player1?.pause()
  player2?.pause()
  player?.play()
}

/**
 * 进视频预热 + 播放器删除
 */
 const loadNextVideo = (isMax = false) => {
  let nextVideo = proxy.$refs.videoItemRef[cureentIndex.value +1]
  let preVideo = proxy.$refs.videoItemRef[cureentIndex.value -1]
  if (nextVideo && !nextVideo.player?.instance){
    console.log(nextVideo, 'init next Video')
    nextVideo?.initVideo()
  }
  if (preVideo && !preVideo.player?.instance){
    console.log(preVideo, 'init pre Video')
    preVideo?.initVideo()
  }
  if (isMax) {
    let nextVideo = proxy.$refs.videoItemRef[cureentIndex.value +2]
    if (nextVideo && !nextVideo.player?.instance){
      console.log(nextVideo, 'init next next Video')
      nextVideo?.initVideo()
    }
  }

  // 大于4个视频时删除第一个视频
  if (cureentIndex.value >= 3) {
    const player = proxy.$refs.videoItemRef[cureentIndex.value-3]?.player
    if (player?.instance) {
      console.log(player.instance, '移除播放器')
      player.instance.dispose()
      player.instance = null
    }
  }
}

let i = 0
/**
 * 维护渲染列表
 */
const onLoad = async () => { 
  try {
    const data = list.value.slice(i * 5, (i + 1) * 5)
    videoList.value = videoList.value.concat(data)
    if ((i+1) *5 > list.value.length || list.value.length <= 4) {
      emit('getVideoList', {}) // 拉取视频列表
    }
    i++
  } catch (err) {
    console.log("error")
  }
}
```
网络请求情况如下：
![playvideo4.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9c3f7847ded349a0ac1e7d7146009cb0~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1354&h=853&s=4124207&e=gif&f=68&b=eff5f7)
## 总结

1. 上下滑动 => 使用swiper
2. 滑动的播放暂停 => 使用$refs 来控制
3. m3u8格式 => 使用videojs来解析（皆可以使用西瓜播放器平替xgplay）
4. 视频尺寸问题 => 通过宽高比 计算出 宽 再进行居中处理
5. 视频卡顿问题 => 动态控制video标签个数
这里其实可以使用一个虚拟dom去动态load下面的视频，然后当播放到当前视频时会走缓存就更快一点了。



