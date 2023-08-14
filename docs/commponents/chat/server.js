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
  // 设置 CORS 头
  // const allowedOrigins = ['https://xiaoyi1255.github.io/', 'http://localhost:3333']; // 允许的域名
  // const origin = req.headers.origin;
  // if (allowedOrigins.includes(origin)) {
  // }
  
  wss.on('headers', (headers) => {
    headers.push(`Access-Control-Allow-Origin: *`);
  });
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
