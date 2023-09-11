## 踩坑实录
### mysql依赖包问题： ER_NOT_SUPPORTED_AUTH_MODE
* nodejs 中使用 mysql 
报错信息如下： ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server;
大致意思: 客户端请求不支持服务端的认证协议
完美解决：安装新版的 mysql2 依赖包 
[参考文章](https://www.techgeeknext.com/mysql-ER_NOT_SUPPORTED_AUTH_MODE)
```sh
yarn remove mysql
yarn add mysql2

```
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f5c94de7cc8f49e79439ced02341075f~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1664&h=607&s=1966075&e=png&b=633574)

### mysql连接自动断开问题
就是node端连接上以后，没有主动断开连接,经过一段时间后mysql会主动断开连接
完美解决：使用链接池
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8ac58ece2c12475b86174e10f5fe60b9~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1058&h=739&s=73026&e=png&b=282c34)
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/537f05686c454a69981c9d0284def9e6~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1633&h=989&s=3014498&e=png&b=633574)

```javascript
// 报错代码
const mysql = require("mysql2");

class MySQL {
  constructor(config) {
    this.connection = mysql.createConnection(config);
  }

  // 建立数据库连接
  connect() {
    this.connection.connect((err) => {
      if (err) {
        console.error('Error connecting to MySQL:', err);
        throw err;
      }
      console.log('Connected to MySQL database');
    });
  }

  // 执行查询
  query(sql, values = []) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, values, (err, results) => {
        if (err) {
          console.error('MySQL query error:', err);
          return reject(err);
        }
        resolve(results);
      });
    });
  }
  
}

```