---
title: emoji
titleTemplate: 表情
---


## 引言

在数字时代，聊天已经成为我们生活的一部分，而Emoji表情则是我们表达情感和情绪的重要方式之一。所以，为什么不把这些可爱的小图标融入你的聊天室呢？

## 展示
聊天室搭建参考：[即时通讯轻松实现：WebSocket、Vue 3 和 Node.js 缔造的多人实时交流平台](https://juejin.cn/post/7266037480750841896)    

**体验地址**：[xioayi](http://118.89.125.27)


## 整体实现思路
* 物料的获取(emoji)
* 封装一个emoji组件(最近使用、表情分类)
* 细节处理(如光标处插入，选择后插入等)
* 在聊天室具体使用(选择表情、插入输入框、页面展示)

## 物料获取
下面这两个网站都是可以免费获取的，copy喜欢的表情 yyds！！！
😀,😄,😁,😆,😅,🤣,😂
1. [符号大全](http://www.fhdq.net/emoji.html#emojidaquan)
2. [emojiall](https://www.emojiall.com/zh-hans/copy)
## 封装一个emoji组件
### 处理emoji表情
* 这里需要封装一个辅助函数来帮我们转成数组进行存储
```typescript
/**
 * 
 * @param inputs 参数一个或多个字符串
 * @returns 返回二维数组
 */
function splitEmoji(...inputs: string[]): string[][] {
  const emojiRegex: RegExp = /\p{Emoji}/u;
  const emojiArrays: string[][] = [];

  inputs.forEach((input) => {
    const emojiArray: string[] = [];
    for (const char of input) {
      if (emojiRegex.test(char)) {
        emojiArray.push(char);
      }
    }
    emojiArrays.push(emojiArray);
  });

  return emojiArrays;
}
```
### 封装emoji组件
1. 拿到处理好的emoji数据**{type:xxx,value:['🍉','🍊','🍋','🍌']}**
2. 根据props.all 判断要展示的类别，并进行渲染
3. 处理交互：点击某一表情，就把它传给父组件，并计入最近使用列表

```vue
<template>
  <div class="emoji">
    <div v-if="emoji.historyList?.length">
      <p>最近使用</p>
      <ul class="history" :class="emoji.historyList?.length ? 'historyShow' : ''">
        <li v-for="(item, index) in [...new Set(emoji.historyList)]" :key="index" @click.stop="chooseEmojiDefault(item)"
          v-html="item"></li>
      </ul>
    </div>
    <div v-for="items in emojiObj" :key="items.name">
      <template v-if="items.name && items.value?.length">
        <p>{{ items.name }}</p>
        <ul class="default">
          <li v-for="(item, index) in items.value" :key="index" @click.stop="chooseEmojiDefault(item)" v-html="item"></li>
        </ul>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { getAllTypeEmojis } from './utils'

const emit = defineEmits(["emojiHandle"]);
const props = defineProps({
  all: {
    type: Boolean,
    default: false
  }
})

const res = getAllTypeEmojis()
console.log(res)
const emojiObj = ref({})

if (props.all) {
  emojiObj.value = res
} else {
  emojiObj.value = {
    defEmojis: res.defEmojis
  }
}
const emoji = reactive({
  chooseItem: "",
  historyList: [],
  allEmoji: emojiObj.value,
});
const chooseEmojiDefault = (item: string) => {
  emoji.chooseItem = item;
  emoji.historyList.unshift(item);
  emit("emojiHandle", item);
  return item;
};
</script>

<style lang="less" scoped>
.history::-webkit-scrollbar,
.default::-webkit-scrollbar {
  display: none;
}

.emoji {
  text-align: left;
  width: 70vw;
  max-height: 20vh;
  background: #fff;
  overflow-y: auto;


  p {
    font-size: 14px;
    padding: 1vh;
  }

  .history,
  .default {
    width: 100%;
    height: 20vh;
    overflow-y: auto;

    li {
      display: inline-block;
      padding: 1vh;
      font-size: 26px;
      width: 32px;
      height: 32px;
      line-height: 1;
      overflow: hidden;
      cursor: pointer;
    }

    li:hover {
      background-color: #ececec;
    }
  }

  .history {
    height: 0;
    width: 100%;
    position: relative;
    transition: all 2.5s;
  }

  .historyShow {
    height: 40px;
  }
}

@media screen and (max-width: 800px) {
  .emoji {
    width: 80vw;
  }
}
</style>

```
## 聊天室中使用表情
这里有两个关键点：插入位置记录、插入字符串拼接
- 插入位置即光标所位置
- 字符串拼接：截取光标前字符+表情+光标后字符
### input中光标位置的获取
* dom有两个属性：selectionEnd和selectionStart 分别代表光标起始位置
* 记录光标结束位置，等下选择了好插入
![光标展示位置.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9f3d4511a60f4cf78e3f6b0b9b7a59f0~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1884&h=566&s=279903&e=gif&f=66&b=fafafa)
```javascript
/**
 * 获取光标的起始位置
 */
const selectEmoji = () => {
  const Textarea = document.querySelector(".message-input");
  console.log(Textarea?.selectionStart,Textarea?.selectionEnd)
};
```
### 选择表情处理
1. 拿到选择表情
2. 插入并拼接字符串： 截取光标前字符+表情+光标后字符
![表情插入.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d834c4226f2f4c0780d596ad9b65b74d~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1884&h=566&s=937649&e=gif&f=233&b=fefefe)
```javascript
/**
 * 选择表情，并把表情插入输入框
 * @param {*} item 选择的表情
 */
const emojiHandle = (item) => {
  const msg = message.value;
  if (!cursor.value) {
    message.value += item;
  } else {
    message.value = msg.slice(0, cursor.value) + item + msg.slice(cursor.value);
  }
};

```
下面是完整的test.vue
```vue
<template>
  <smile-outlined
    style="font-size: 22px; margin: 0 2vh"
    @click="selectEmoji"
  />
  <Popover v-model:open="visible" title="" placement="top">
    <template #content>
      <div>
        <Emoji @emojiHandle="emojiHandle" :all="false" />
      </div>
    </template>
  </Popover>
  <Textarea
    :maxlength="100"
    @pressEnter="sendMessage"
    class="message-input"
    v-model:value.trim="message"
    placeholder="回车发送消息..."
  />
</template>

<script setup>
import Emoji from "@/components/emoji/index.vue";
import { SmileOutlined } from "@ant-design/icons-vue";
import {  Textarea, Popover } from "ant-design-vue";

const cursor = ref(0);
const message = ref('')
const visible = ref(false)
// 发送消息
const sendMessage = () => {}

/**
 * 点击展示表情
 */
const selectEmoji = () => {
  const Textarea = document.querySelector(".message-input");
  cursor.value = Textarea?.selectionEnd;
  visible.value = !visible.value;
};
/**
 * 选择表情，并把表情插入输入框
 * @param {*} item 选择的表情
 */
const emojiHandle = (item) => {
  const msg = message.value;
  if (!cursor.value) {
    message.value += item;
  } else {
    message.value = msg.slice(0, cursor.value) + item + msg.slice(cursor.value);
  }
};
</script>

```

## 总结
- 整体实现起来挺简单的，没有才什么坑
- 最近使用目前是存在变量的，刷新就没了（后期考虑引入角色，存入数据库）
## 源码
[xiaoyi1255](https://github.com/xiaoyi1255/nuxt3-temple)