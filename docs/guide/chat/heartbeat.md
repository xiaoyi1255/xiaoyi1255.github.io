---
title: heartbeat
titleTemplate: chat
---

## 前言
**我们先来看一下心跳检测机制？**

心跳检测机制是一种用于检测系统、应用程序或网络连接状态的技术。它的基本原理是定期发送小型数据包（称为心跳包或心跳消息）以确认远程设备或连接仍然处于活动状态。如果一段时间内没有收到心跳响应，系统就会认为连接已断开或设备不再可用。本文将用来实现多人聊天室在线人数的统计。

**心跳机制几个关键概念**
1. 心跳包：数据包 => 通常是一个标识或消息
2. 心跳间隔：心跳包发送的时间间隔
3. 心跳响应：客户端或者服务器接收心跳包时，做出的响应
4. 维护状态：心跳检测机制通常在服务器端维护状态
5. 超时处理：心跳检测机制认定为不活跃、超时并做处理(自动重连机制)

**为什么需要心跳机制？**
- 检测连接状态
- 维护连接性
- 管理在线状态
- 检测系统、设备健康状况
- 减少资源浪费

## 体验地址
传送门在---->这里！[http://118.89.125.27/chat](http://118.89.125.27/chat)

**效果展示**
![心跳检测机制1.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/08c566a1db2a4461b82bb8ed536aaf7f~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1898&h=1007&s=10809302&e=gif&f=527&b=fdfdfd)

## 整体实现思路
这里以多人聊天室的中心跳检测机制为例。
1. 客户端和服务器端建立连接(websocket)
2. 在客户端定期轮询向服务器端发送心跳包 **ping**
3. 服务器端接收心跳包并做出响应 **pong**
4. 服务器端维护 **ping** 的客户端列表，返回活跃的客户端数
5. 客户端接收到心跳响应，更新自己状态，如心跳包异常，则做异常处理

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d1fca2da686541a8ae4d52a29379e452~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=798&h=568&s=28695&e=png&b=282c34)


## 前端部分
聊天室的搭建参考文章：[即时通讯轻松实现：WebSocket、Vue 3 和 Node.js 缔造的多人实时交流平台](https://juejin.cn/post/7266037480750841896),挺详细的嘞！
1. 客户端发出建立连接 new WebSocket(socketUrl)
2. 添加连接状态、消息接收、错误信息、关闭等事件监听
3. 在socket.onopen 建立连接之后开始定期发送心跳包**ping**
### 建立连接

```typescript
let socket = null; 
/**
 * 建立连接
 */
const connectWebSocket = () => {
  const socketUrl = config?.baseWsUrl + "/ws"; // 服务端地址
  // 创建实例
  socket = new WebSocket(socketUrl);

  // 监听WebSocket连接成功事件
  socket.onopen = () => {
  };
  // 
  socket.onmessage = async (event) => {
  };
  // 错误监听
  socket.onerror = (msg) => {
  };
  // 关闭监听
  socket.onclose = (msg) => {

  };
};

### 发送心跳包
必须在建立连接成功之后
```
定时发送心跳包
- 定时器用全局变量保存，启动前清理上一个定时器
- 页面卸载前也清理
```typescript
let timer = null
// 监听WebSocket连接成功事件
socket.onopen = () => {
  console.log('WebSocket连接成功！')
  connected.value = true;
  retry = 0
  clearInterval(timer);
  timer = setInterval(() => {
    sendMessage("ping");
  }, 1000 * 6);
  sendMessage(true);
};

/**
 * 客户端向服务器发送消息
 * type: 'ping' 就是发送的心跳包
 */
const sendMessage = (type = "") => {
  if (!socket) return;
  const state = {  }; 
  const messageObj = { // 消息对象
    ...state,
    type
  };
  socket.send(JSON.stringify(messageObj));
};
```

### 心跳检测结果处理
正常这忽略，异常触发重连机制
```typescript
// 监听WebSocket连接成功事件
socket.onmessage = () => {
  const msg = JSON.parse(event.data);
  if (msg.type === 'ping') {
      if( msg.status !== 'pong') { // 断线重连
        // Message.loading('断线重连中...')
        reConnectWebSocket()
      }
      console.log('心跳检测中状态：', msg.status)
  }
};

```

### 自动重连机制
1. 自动重连触发：webSocket closes事件、心跳机制检测不活跃
2. 次数控制：自动重连次数控制，超过了提示用户手动重连
3. 连接成功重置次数限制
4. 注意点：定时器的回收，避免造成内存泄漏
```typescript
let retry = 0
/**
 *  重连控制函数
 * @param {*} automatic 是否手动重连
 * @param {*} retryCunt 
 */
const reConnectWebSocket = (isAutomatic=false, retryCunt=10) => {
  flag = false;
  if (!automatic) {
    console.log(retry, "自动重连次数")
    retry++
    if (retry >= retryCunt) {
      clearInterval(timer);
      connected.value = false;
      socket = null;
      return
    }
  } else {
    console.log('手动重连')
  }
  connectWebSocket();
};

```

### 用户关闭页面
当用户直接关闭页面时，监听beforeunload事件 给服务器发送消息更新状态
```typescript
const onLoadHandle = async() => {
  $fetch(`${config?.baseUrl}/updateInfo`, {
    method: "POST",
    params: {
      name: props.state?.name,
      roomId: props.state?.roomId,
    },
  });
};

onMounted(() => {
  window.addEventListener("beforeunload", onLoadHandle);
});

```
## 后端部分
1. 建WebSocket服务器
2. 接收建立连接请求并进行消息接收、错误信息、关闭等事件监听
3. 判断接收到的消息类型为心跳包**ping**,则响应**pong**, 记录时间
4. 响应前再判断一下响应**pong**时间是否过期，过期则，标记不活跃（一般比客户端的轮询间隔长一点就行）
5. 用户直接退出、关闭网页=> 视为不活跃

```javascript
const WebSocket = require('ws');
const http = require('http');
const express = require('express');
const app = express();


/**
 *  Map(7) {
  '1111' => {
    roomId: '1111',
    createUser: '1',
    createTime: 1693574119564,
    password: '',
    userList: [
      [Object]
    ],
    messageList: [
      [Object]
    ]
  },
 */
let roomMap = new Map() // 房间信息存储对象
// 创建一个HTTP服务器
const server = http.createServer(app);

// 创建WebSocket服务器并将其附加到HTTP服务器
const wss = new WebSocket.Server({ noServer: true });

server.on('upgrade', (request, socket, head) => {
	switch (request.url) {
		case '/ws':
			// 只允许 这个主机下的请求访问
			if (
				// true||
				request.headers.origin.includes('localhost')
			) {
				wss.handleUpgrade(request, socket, head, (ws) => {
					Socket = socket
					wss.emit('connection', ws, request);
				});
			} else {
				console.log(
					'Unauthorized request from:',
					request.headers.origin
				);
			}
			break;
		default:
			break;
	}
});

// 监听WebSocket连接事件
wss.on('connection', (socket) => {
		console.log('WebSocket 连接已建立');
		// 监听客户端发送的消息
		socket.on('message', async(message) => {
			const msg = JSON.parse(message);
			const { type } = msg || {};
			const room = roomMap.get(roomId);
			const time = new Date().getTime()
			if (type == 'create') {
			} else if (type === 'join') { // 处理用户加入房间
			} else if (type === 'leave') {  // 处理用户离开房间
			} else if(type === 'ping'){ // 处理心跳检测机制
        /**
         * 1 判断消息类型为 心跳检测包
         * 2. 响应pong
         * 3. 标记用户信息并记录时间active：true && activeTime = time
         * 4. 返回消息时遍历房间的用户列表信息 根据活跃时间判断是否为活跃
         * 5. 返回更新后的状态
         */
				msg.status = 'pong' 
				room.userList.some(item => {
					if (item.name === name) {
						// 用户活跃
						item.active = true
						item.activeTime = time
						console.log('ping', JSON.stringify(item))
					}
				})
			} else { // 处理其它逻辑
			}
      // 用户列表
			msg.users = roomMap.get(roomId)?.userList?.length || 0;  
      // 用户数
			msg.totalUserList = roomMap.get(roomId)?.userList || [] 
      // 活跃数===>>> 遍历房间的用户列表信息 根据活跃时间判断是否为活跃
			msg.activityUsers = roomMap.get(roomId)?.userList?.filter(item => {
				if (item.active && item.activeTime && (time - item.activeTime) < 1000 * 8) {
					item.active = true
					return true
				} else {
					item.active = false
					item.activeTime = 0
				}
			})?.length
			// 广播消息给所有连接的客户端
			wss.clients.forEach((client) => {
				if (client.readyState === WebSocket.OPEN) {
					client.send(JSON.stringify(msg));
				}
			});
		});

		wss.on('error', (message) => {
			console.log('报错了');
		});
		wss.on('close', (message) => {
			console.log('连接关闭：')
		})
		wss.on('open', (message) => {
			console.log('open', message)
		})
	});

// 启动HTTP服务器
server.listen(3000, () => {
  console.log('HTTP服务器已启动，监听端口3000');
});

```

## 总结
以上就是心跳机制的核心实现，具体细节可以参考[源码](https://github.com/xiaoyi1255/nuxt3-temple)

- 心跳机制：心跳检测是用于监测连接状态，通过定期发送心跳消息来确认连接的活跃性。在聊天室中，我们可以定期发送心跳消息，以检测用户是否在线
- 自动重连：自动重连机制是用于在连接断开时自动尝试重新建立连接
- 提高体验：使用这两个机制，用户更可靠保持在线状态，无需手动重连，有效提高了用户体验

## 源码
[xiaoyi1255](https://github.com/xiaoyi1255/nuxt3-temple)

## 结语：
如果本文对你有收获，麻烦动动发财的小手，点点关注、点点赞！！！

如果有不对、可以优化的地方欢迎在评论区指出，谢谢