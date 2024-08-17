let connections = [];

// 监听连接事件
self.addEventListener('connect', function(event) {
    const port = event.ports[0];
    connections.push(port);

    // 监听从页面发来的消息
    port.addEventListener('message', function(e) {
        const message = e.data;

        // 向所有连接的页面广播消息
        connections.forEach(function(conn) {
            conn.postMessage('Received: ' + message);
        });
    });

    port.start();  // 必须调用 start() 使 port 开始接收消息
});
