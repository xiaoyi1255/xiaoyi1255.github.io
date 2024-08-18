const http = require('http');

// 创建服务器
const server = http.createServer((req, res) => {
    // 检查请求的 URL 和方法
    if (req.method === 'GET' && req.url === '/api/user/getJSON') {
        // 设置响应头，允许跨域访问
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*' // 允许所有源访问
        });
        // 发送 JSON 数据
        res.end('hello world!!');
    } else {
        // 处理其他请求，返回 404
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

// 监听端口
const port = 3001;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
