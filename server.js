const WebSocket = require("ws");
const http = require("http");
const express = require("express");
const app = express();

// 创建 HTTP 服务器
const server = http.createServer(app);

// 创建 WebSocket 服务器
const wss = new WebSocket.Server({ server });

// 监听 WebSocket 连接
wss.on("connection", (socket) => {
  console.log("WebSocket 连接已建立");

  // 监听客户端发送的消息
  socket.on("message", (message) => {
    console.log("收到消息：", message.toString());
    // 广播消息给所有连接的客户端
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });
});

// 启动服务器
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`服务器正在运行，端口：${PORT}`);
});
