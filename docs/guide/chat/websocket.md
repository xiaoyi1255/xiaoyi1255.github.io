---
theme: channing-cyan
highlight: a11y-dark
---
## 前言 {#前言}

**主题**： 本文基于Vue3、Websocket、Nodejs实现多人即时通讯

**内容**：本文分为三个部分：首先是介绍及使用，然后是代码实现，最后总结及注意事项

**目的**：对websocket的实践

周五下班时，突发奇想，想试试自己实现。毕竟周末去四姑娘山的两日游梦想破面了（天气+旅游社团行程安排满了），没办法只能含泪狂省几百大洋。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/db8f1467fb6344079014831ecc78a00b~tplv-k3u1fbpfcp-zoom-1.image)

## WebSocket介绍 {#WebSocket介绍}

-   WebSocket 是一种在单个 TCP 连接上提供全双工通信的网络协议，它允许客户端和服务器之间进行实时的双向通信。相比于传统的 HTTP 请求-响应模式，WebSocket 在实时性和效率方面提供了更好的性能

**特点和优势**

-   **全双工：** WebSocket 允许客户端和服务器在同一个连接上同时发送和接收数据，实现实时的双向通信。这与传统的 HTTP 请求-响应模式不同，HTTP 请求通常需要等待服务器的响应。
-   **低延迟：** 由于 WebSocket 建立了一次连接后可以持续保持，不需要频繁地进行连接和关闭，因此具有较低的延迟，适用于实时性要求较高的应用场景。
-   **节省资源：** 与轮询或长轮询相比，WebSocket 通过在单个连接上实现多次请求和响应，节省了网络带宽和服务器资源。
-   **跨域支持：** WebSocket 具备跨域通信的能力，允许从不同域名下的客户端与服务器进行通信。

## 项目架构 {#项目架构}

1.  后端部分主要用到了 ws express http
1.  前端部分 使用了vue3+antdv 来搭建

## 整体实现思路 {#整体实现思路}

1.  前端部分：

-   -   UI： 弹窗、按钮、房间页面
    -   消息模块： 连接、监听、接收、发送、展示
    -   房间：创建、加入、离开

2.  后端部分：

-   -   创建服务器
    -   监听连接、断开、创建房间
    -   建立房间与成员的映射关系
    -   数据（这里没有使用数据库进行存储）

## 一、页面搭建 {#一、页面搭建}

### 1.先安装一下 antdv

```bash
yarn add ant-design-vue
```

### 2.创建、加入房间按钮、及弹窗

两个按钮，一个创建房间、一个加入房间；然后提交时校验+接口校验

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1474510c3ac14e4fb0730b67b04a0fc6~tplv-k3u1fbpfcp-zoom-1.image)

### 3.房间页面、离开房间、消息发送接收及展示

**进行websocket连接**

```javascript
const connectWebSocket = () => {
  const socketUrl = 'ws://localhost:3000';
  socket = new WebSocket(socketUrl);
  socket.onopen = () => {
    connected.value = true;
    sendMessage(true)
  };
};
```

**退出房间**

```javascript
const exit = (state = {} ) => {
  if (socket) {
    socket.close();
    const type = 'leave'
  }
}
```

**发送消息**

```javascript
const sendMessage = (type = '') => {
  if (!socket) return;
  const state = {...props.state}
  const messageObj = {
    ...state,
    text: message.value,
    id: Date.now(),

  };
  socket.send(JSON.stringify(messageObj));
};
```

**接收消息**

```javascript
socket.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  const { name, roomId } = props.state
  users.value = msg.users || 0
  if (msg?.code == 200 && msg.roomId == roomId) {
    receivedMessages.value.push(msg);
  } else {
    if (msg.name == name && roomId == msg.roomId ) {
      Message.error(msg.text)
      exit()
    }
  }
};
```

对消息进行渲染

```javascript
<template>
  <div class="chat-container">
    <Button @click="exit(state)">退出房间</Button>
    <p class="tc title">{{connected ? `房间号：${state.roomId}`: '加入房间失败'}}</p>
    <p>当前房间人数：{{ users }}</p>
    <div class="message">
      <div class="item" :class="item.name==state.name? '':'item1'" v-for="item in receivedMessages" :key="item.id">
        <p class="msg">
          {{ item.text }}
        </p>
        <div class="user">
          <div class="time">{{ new Date(item.id).toLocaleTimeString() }}</div>
          <div class="user">{{ item.name }}</div>
        </div>
      </div>
    </div>
    <div v-if="connected">
      <textarea maxlength="100"  class="message-input" v-model="message" placeholder="输入消息..." />
      <div class="submit" @click="sendMessage">发送</div>
    </div>
  </div>
</template>
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ea1d9017a61f4b048157f2dfc287ccfb~tplv-k3u1fbpfcp-zoom-1.image)

完整的前端代码

#### 组件入口

```javascript
// Chat.vue 整组件
<template>
    <CreateChat v-if="!state.roomId" @changeRoom="changeRoom"></CreateChat>
    <ChatRoom v-else :state="state" @changeRoom="changeRoom"></ChatRoom>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue'
import ChatRoom from './ChatRoom.vue'
import CreateChat  from './CreateChat.vue'

const state = reactive({
    name: '',
    roomId: 0,
    type: ''
})
const changeRoom = (newInfo = {}) => {
    // roomId.value =  num
    console.log(newInfo, 'asdsadsadasd')
    state.name = newInfo.name
    state.roomId = newInfo.roomId
    state.type = newInfo.type
}
</script>
```

#### 房间组件

```javascript
// ChatRoom.vue 房间组件
<template>
  <div class="chat-container">
    <Button @click="exit(state)">退出房间</Button>
    <p class="tc title">{{connected ? `房间号：${state.roomId}`: '加入房间失败'}}</p>
    <p>当前房间人数：{{ users }}</p>
    <div class="message">
      <div class="item" :class="item.name==state.name? '':'item1'" v-for="item in receivedMessages" :key="item.id">
        <p class="msg">
          {{ item.text }}
        </p>
        <div class="user">
          <div class="time">{{ new Date(item.id).toLocaleTimeString() }}</div>
          <div class="user">{{ item.name }}</div>
        </div>
      </div>
    </div>
    <div v-if="connected">
      <textarea maxlength="100"  class="message-input" v-model="message" placeholder="输入消息..." />
      <div class="submit" @click="sendMessage">发送</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { message as Message, Button } from 'ant-design-vue'
const props = defineProps(['state'])
const emit = defineEmits(['changeRoom'])
const connected = ref(false);
const message = ref('');
const users = ref(0)
const receivedMessages = ref([]);
let socket = null;

const connectWebSocket = () => {
  const socketUrl = 'ws://localhost:3000'; // Replace with your WebSocket server URL
  socket = new WebSocket(socketUrl);

  socket.onopen = () => {
    connected.value = true;
    sendMessage(true)
  };

  socket.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    const { name, roomId } = props.state
    users.value = msg.users || 0
    if (msg?.code == 200 && msg.roomId == roomId) {
      receivedMessages.value.push(msg);
    } else {
      if (msg.name == name && roomId == msg.roomId ) {
        Message.error(msg.text)
        exit()
      }
    }
  };

  socket.onclose = () => {
    connected.value = false;
    socket = null;
  };
};
let flag = false
const sendMessage = (type = '') => {
  if (!socket) return;
  const state = {...props.state}
  const messageObj = {
    ...state,
    text: message.value,
    id: Date.now(),
    
  };
  if (!flag) {
    // 首次进入
    flag =true
  } else {
    messageObj.type = ''
    type && (messageObj.type = type)
    
  }

  socket.send(JSON.stringify(messageObj));
  message.value = '';
};

const exit = (state = {} ) => {
  if (socket) {
    const type = 'leave'
    state.name && sendMessage(type)
    socket.close();
    emit('changeRoom', {})
  }
}

onMounted(() => {
  connectWebSocket();

});

onBeforeUnmount(() => {
  exit()
});
</script>


<style scoped lang="less">
/* 样式可以根据您的需要进行自定义 */
.chat-container {
  max-width: 45vw;
  margin: 0 auto;
  padding: 1vw;
  height: 100%;
  .title {
    font-size: 20px;
    font-weight: 900;
  }
}

.message-input {
  width: 100%;
  display: block;
  min-height: 15vh;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 1vw;
}

.message {
  overflow-y: auto;
  margin-top: 2vh;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 1vh;
}

.item {
  margin-bottom: 10px;
  padding: 5px 10px;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  .msg {
    color: #fff;
    padding: 1vw;
    margin-right: 1vh;
    max-width: 60vw;
    height: 100%;
    overflow: hidden;
    background-color: #5d46da;
    border: 1px solid #eee;
    border-radius: 2vh;
    order: 1;
  }
  .user {
    display: flex;
    justify-content: flex-end;
    align-items: end;
    flex-direction: column;
    order: 2;
    
  }
}
.item1 {
  justify-content: flex-start;
  .user {
    order: 2;
    align-items: flex-start;
  }
  .msg {
    order: 3;
    margin-left: 1vh;
    margin-right: 0;
    background-color: #7dad6a;

  }
}

.submit {
  padding: 10px;
  background-color: #3e3cd4;
  width: 15vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  margin-top: 2vh;
  font-weight: 700;
  font-size: 16px;
  color: #fff;
  border-radius: 1vh;
  &:hover {
    background-color: #1410eb;
  }
}
.tc {
  text-align: center;
}
.time {
  font-size: 12px;
}
</style>
```

#### 弹窗组件

```javascript
// CreateChat.vue
<template>
  <Button type="primary" @click="newRoom('create')">{{ title.create }}</Button>
  <Button @click="newRoom('join')">{{ title.join }}</Button>

  <Modal v-model:open="state.roomShow" :title="title[state.type]" @ok="handleOk">
    <input
      type="number"
      v-model.trim="state.room"
      @keyup.enter="handleOk"
      placeholder="请输入4位数字房间号"
    />
    <input
      style="margin-top: 2vh; display: block;"
      v-model.trim="state.name"
      @keyup.enter="handleOk"
      placeholder="请输入姓名"
    />
  </Modal>
</template>
<script lang="ts" setup>
type DataType = {
  newMessage: string;
  room: number | '';
  roomShow: boolean;
  messages: {
    id: Date;
    text: string;
    name: string;
  }[];
  socket: any;
  name: string;
  type: string
};

import "ant-design-vue/dist/reset.css";
import { Button, Input, message, Modal } from "ant-design-vue";
import { reactive } from "vue";

const emit = defineEmits(['changeRoom'])
const state: DataType = reactive({
  newMessage: "",
  roomShow: false,
  room: '',
  name: '',
  messages: [],
  socket: null,
  type: ''
});
const title = {
  create: '创建房间',
  join: '加入房间'
}

const newRoom = (type) => {
  state.roomShow = true;
  state.type = type
};

const handleOk = () => {
  const reg = /^\d{4}$/
  if (!state.room || !state.name) {
    message.error('请输入正确的房间号和名字')
    return
  }
  if (!reg.test(String(state.room))) {
    message.error('请输入正确4位数字的房间号')
    return
  }
  state.roomShow = false;
  emit('changeRoom', {name: state.name, roomId: state.room, type: state.type})
}
  
</script>
  
<style scoped lang="less">
@import "ant-design-vue/dist/reset.css";
.chat-room {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
}

.message-list {
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
}

.message {
  margin-bottom: 10px;
  padding: 5px 10px;
  border: 1px solid #eee;
  border-radius: 5px;
  background-color: #f8f8f8;
}

.username {
  font-weight: bold;
  color: #007bff;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
```

## 二、Node部分的实现 {#二、Node部分的实现}

新建server.js

```javascript
const WebSocket = require("ws");
const http = require("http");
const express = require("express");
const app = express();

const roomMap = new Map()
// 创建 HTTP 服务器
const server = http.createServer(app);
// 创建 WebSocket 服务器
const wss = new WebSocket.Server({ server });
// 监听 WebSocket 连接
wss.on("connection", (socket) => {
  console.log("WebSocket 连接已建立");
  // 监听客户端发送的消息
  socket.on("message", (message) => {
    message = message.toString()
    const msg =  JSON.parse(message)
    msg.code = 200
    const { type, roomId, name, id } = msg ||{}
    const room = roomMap.get(roomId)
    if (type == 'create') {
      if (!room) {
        const roomInfo = {
          roomId, 
          createUser: name, 
          createTime: id, 
          serverTime: new Date().now,
          userList: [{name, jionTime: +new Date()}]
        }
        roomMap.set(roomId, roomInfo)
        msg.text = '您已加入房间！！！'
      } else {
        // 房间号已存在
        msg.text = '房间号已存在'
        msg.code = 5001
      }
    } else if(type == 'join') {
      // 加入房间
      if (!room) {
        msg.code = 5004
        msg.text = '房间不存在'
      } else {
        let hasUser = false
        if (Array.isArray(room.userList) && room.userList.length) {
          hasUser = room.userList.some(item =>item.name == name)
        }
        if (hasUser) {
          msg.text = '用户名已存在'
          msg.code = 5002
        } else {
          room.userList.push({name, jionTime: +new Date()})
          msg.text = name + '已进入房间'
        }
      }
    } else if (type=='leave') {
      if (Array.isArray(room.userList) && room.userList.length) {
        const index = room.userList.findIndex(item =>item.name === name)
        console.log(index)
        index !=-1 && room.userList.splice(index, 1)
        msg.text = name + '离开了房间'
        if (roomMap.get(roomId)?.userList?.length == 0) {
          roomMap.delete(roomId)
        }
      }
    }
    msg.users = roomMap.get(roomId)?.userList?.length || 0 
    // 广播消息给所有连接的客户端
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(msg));
      }
    });
  });
});
wss.on('error', socket => {
  console.log('报错了')
})
// 启动服务器
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`服务器正在运行，端口：${PORT}`);
});
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c2fe2f1204b64cf595cbdeee259e20f7~tplv-k3u1fbpfcp-watermark.image?)
## 总结及避坑：
避坑：写开发时可以多写打印，当然生产代码尽量不要有打印，开发阶段的打印有助于联调和排查问题（在写加入房间的时候就排查了好久！！！）
## 源码位置

[xiaoyi1255](https://github.com/xiaoyi1255/xiaoyi1255.github.io/tree/master/docs/commponents/chat)