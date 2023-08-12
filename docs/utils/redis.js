const redis = require("redis");
const client = redis.createClient(); // 创建 Redis 客户端

// 设置缓存数据
function setCache(key, value, expirationInSeconds = 24) {
  client.setex(key, expirationInSeconds*1000*60*60, value);
}

// 获取缓存数据
function getCache(key) {
  return new Promise((resolve, reject) => {
    client.get(key, (err, value) => {
      if (err) {
        reject(err);
      } else {
        resolve(value);
      }
    });
  });
}

// 示例使用
// setCache("username", "john", 3600); // 缓存 username 数据，有效期 1 小时

// getCache("username")
//   .then((value) => {
//     console.log("Cached username:", value);
//   })
//   .catch((err) => {
//     console.error("Error retrieving cache:", err);
//   });

module.exports = {
    getCache,
    setCache
}
