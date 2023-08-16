const WebSocket = require('ws');
const http = require('http');
const express = require('express');
const app = express();

const roomMap = new Map();
// 创建 HTTP 服务器
const server = http.createServer(app);
// 创建 WebSocket 服务器
const wss = new WebSocket.Server({ noServer: true });

wsHandles() // websocket 监听器


// 在 Express 中处理除了 /ws 路由以外的请求
app.get('/getAllRoomInfo', (req, res) => {
  	if(!roomMap.size) {
		return res.send(JSON.stringify([]));
	}
	const roomInfo = []
	roomMap.forEach((value,key) => {
		roomInfo.push({[key]: value})
	})
  	res.send(JSON.stringify(roomInfo));
});

app.get('/getRoomInfoByRoomId', (req, res) => {
	const { roomId }= req.query
	if(!roomMap.size || !roomMap.get(roomId || !roomId))res.send(JSON.stringify({}));
  	const roomInfo = roomMap.get(roomId)
	res.send(JSON.stringify(roomInfo));
});


server.on('upgrade', (request, socket, head) => {
	switch (request.url) {
		case '/ws':
      // 只允许 这个主机下的请求访问
      if (request.headers.origin.includes('localhost' ||'118.89.125.27')) {
        console.log('request.headers.origin111', request.headers.origin)
        wss.handleUpgrade(request, socket, head, (ws) => {
          wss.emit('connection', ws, request);
        });
      } else {
        console.log('Unauthorized request from:', request.headers.origin);
        // 对其他主机的请求返回 403 状态码
        // socket.write('HTTP/1.1 403 Forbidden\r\n\r\n');
        // socket.destroy();
      }
			break;
		default:
			break;

	}
});

function wsHandles() {
	// 监听 WebSocket 连接
	wss.on('connection', (socket) => {
		console.log('WebSocket 连接已建立');
		// 监听客户端发送的消息
		socket.on('message', (message) => {
			message = message.toString();
			const msg = JSON.parse(message);
			msg.code = 200;
			const { type, roomId, name, id } = msg || {};
			const room = roomMap.get(roomId);
			if (type == 'create') {
				if (!room) {
					const roomInfo = {
						roomId,
						createUser: name,
						createTime: id,
						serverTime: new Date().now,
						userList: [{ name, jionTime: +new Date() }]
					};
					roomMap.set(roomId, roomInfo);
					msg.text = '您已加入房间！！！';
				} else {
					// 房间号已存在
					msg.text = '房间号已存在';
					msg.code = 5001;
				}
			} else if (type == 'join') {
				// 加入房间
				if (!room) {
					msg.code = 5004;
					msg.text = '房间不存在';
				} else {
					let hasUser = false;
					if (Array.isArray(room.userList) && room.userList.length) {
						hasUser = room.userList.some(
							(item) => item.name == name
						);
					}
					if (hasUser) {
						msg.text = '用户名已存在';
						msg.code = 5002;
					} else {
						room.userList.push({ name, jionTime: +new Date() });
						msg.text = name + '已进入房间';
					}
				}
			} else if (type == 'leave') {
				if (Array.isArray(room.userList) && room.userList.length) {
					const index = room.userList.findIndex(
						(item) => item.name === name
					);
					console.log(index);
					index != -1 && room.userList.splice(index, 1);
					msg.text = name + '离开了房间';
					if (roomMap.get(roomId)?.userList?.length == 0) {
						roomMap.delete(roomId);
					}
				}
			}
			msg.users = roomMap.get(roomId)?.userList?.length || 0;
			// 广播消息给所有连接的客户端
			wss.clients.forEach((client) => {
				if (client.readyState === WebSocket.OPEN) {
					client.send(JSON.stringify(msg));
				}
			});
		});
	});
	wss.on('error', (socket) => {
		console.log('报错了');
	});
}

// 启动服务器
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
	console.log(`服务器正在运行，端口：${PORT}`);
});
