---
title: node
titleTemplate: redis
---

## 前言

Redis是一种支持key-value等多种数据结构的存储系统。 可用于缓存，事件发布或订阅，高速队列等场景。 使用C语言编写，支持网络，提供字符串，哈希，列表，队列，集合结构直接存取，基于内存，可持久化。

**Redis的优势：**
- 性能极高  读110000次/s,写81000次/s，约是MySQL的100倍 (使用内存存储)
- 支持数据持久化
- 支持事务
- 支持主从复制
- 支持发布订阅
- 支持key 过期


本文将介绍：Redis的**安装、配置、常用命令及实战**   
主要是基础使用，大佬可以直接移步！！！

## 安装、配置、连接

### 安装
* 如果是连接远程的Redis，就可以不安装本地客户端
1. redis客户端的安装 [安装包下载](https://github.com/tporadowski/redis/releases)

2. 安装完之后就可以启动Redis服务了 
```sh
redis-server
```
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/158e202ecaf643068af1a336c54bd811~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1913&h=896&e=png&b=603470)
上图就说明redis服务已经成功启动

默认host: 127.0.0.1   
默认port: 6379

3. cli进行连接(注意：新开一个小黑窗，来跑)
```sh
redis-cli
```
输入ping 返回PONG 就说明和Redis建立了连接
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7ad93f70734548e08f6f54b22d6cba53~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1427&h=455&e=png&b=5d3671)


### 配置+cli连接

1. 密码设置 可以直接在安装的目录下找到 .conf 文件 => requirepass
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/953888d0f3e44136a564b74837974311~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1097&h=677&e=png&b=ffffff)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a96331c2e07d464198a0a7dbef87a5fc~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1252&h=631&e=png&b=fefdfd)

2. 也可以直接在cli 上设置
```sh
config set requirepass xiaoyi
```
返回ok 就说明成功了  
这时ping,验证连接，就会发现失败了，所以需要校验

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/57615aef3c0e48fe986fa1f17d0ddf58~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1168&h=482&e=png&b=4f3472)

## 常用命令
* **ping**: 检测是否建立连接
* **shutdown** 退出服务器
* **quit** 关闭当前连接
* **info** redis相关信息
* **config set xxx** 设置配置相关
* **config get xxx** 或者相关配置
* **flusjall** 清空所有键值对
* keys * 获取所有key
* **set newKey newValue** 设置新的键值对
* **get key** 获取某个key值
* **del key** 删除某个key
* **ttl key** 获取某个key的过期时间

## 实战：Nodejs中使用
* 安装依赖 redis 、ioredis
```sh
yarn add ioredis

```
### 封装一个基础redis类
```javascript
const Redis = require('ioredis');

const redisConfig = {
    host: 'localhost', // Redis服务器主机地址
    port: 6379, // Redis 服务器端口
    password: 'xxxx', // 密码
}
class RedisClient {
	constructor() {
		this.redis = new Redis(redisConfig);
	}
	async set(key, value) {
		await this.redis.set(key, value);
	}

	async get(key) {
		return await this.redis.get(key);
	}

	async clear(){
        return await this.redis.flushall()
    }

	async getAllKeys (){
		return await this.redis.keys('*')
	}

	async del(key){
		return await this.redis.del(key)
	}

	async ttl(key) {
		return this.redis.ttl(key)
	}

	async close() {
		await this.redis.quit();
	}
}
```
### 基础类封装配合处理业务的类（聊天室）
* 先前本来是把聊天室信息存储在一个Map对象上(重启服务就会丢失)
* 纠结了一哈，还是决定使用redis来存吧 所以就有了这篇文章，哈哈
* [体验地址！！](http://118.89.125.27/)
```javascript
class RoomListCkient extends RedisClient {
    _key=''
    map=new Map()
    constructor(key) {
        super()
        this._key = key
         this.get2Map('roomList').then(res => {
            this.map=res
         })
	}
    get size() {
        return this.map.size
    }
	async get2Map() {
		const value = await this.redis.get(this._key);
		if (value) {
			const mapData = JSON.parse(value);
			const mapFromRedis = new Map(mapData);
			console.log('Map from Redis:', mapFromRedis);
			return mapFromRedis;
		} else {
			console.log('Map not found in Redis. key:', this._key);
			return new Map();
		}
	}
    async get2MapByKey(key){
        return (await this.get2Map()).get(+key)
    }


	async set2Map(value= new Map(), day = 30) {
        this.map = value
        console.log('set ', value)
		await this.redis.set(
			this._key,
			JSON.stringify([...value]),
			'Ex',
			day * 60 * 60 * 24
		);
	}

}
```

## 完整代码
```javascript
const Redis = require('ioredis');

class RedisClient {
	constructor() {
		this.redis = new Redis({
            host: 'localhost', // Redis服务器主机地址
            port: 6379, // Redis 服务器端口
            password: 'xiaoyi', // 密码
        });
	}

	async set(key, value) {
		await this.redis.set(key, value);
	}

	async get(key) {
		return await this.redis.get(key);
	}

	async clear(){
        return await this.redis.flushall()
    }

	async getAllKeys (){
		return await this.redis.keys('*')
	}

	async del(key){
		return await this.redis.del(key)
	}

	async ttl(key) {
		return this.redis.ttl(key)
	}

	async close() {
		await this.redis.quit();
	}
}

class RoomListCkient extends RedisClient {
    _key=''
    map=new Map()
    constructor(key) {
        super()
        this._key = key
         this.get2Map('roomList').then(res => {
            this.map=res
         })
	}
    get size() {
        return this.map.size
    }
	async get2Map() {
		const value = await this.redis.get(this._key);
		if (value) {
			const mapData = JSON.parse(value);
			const mapFromRedis = new Map(mapData);
			console.log('Map from Redis:', mapFromRedis);
			return mapFromRedis;
		} else {
			console.log('Map not found in Redis. key:', this._key);
			return new Map();
		}
	}
    async get2MapByKey(key){
        return (await this.get2Map()).get(+key)
    }


	async set2Map(value= new Map(), day = 30) {
        this.map = value
        console.log('set ', value)
		await this.redis.set(
			this._key,
			JSON.stringify([...value]),
			'Ex',
			day * 60 * 60 * 24
		);
	}

}


```
## 业务中使用

```javascript
const redisCkient = require('./utils/redis')


let roomMap = new Map()
// 获取整个Map
await redisCkient.get2Map()
// 设置
await redisCkient.set2Map(roomMap)
// 获取某个key的值
await get2MapByKey('key')

```



## 踩坑
* 安装完redis 去小黑窗使用 redis-server 报错
这种情况：需要自己手动把redis安装路径添加到环境变量中
* 服务器上部署redis 记得记得记得==>>端口开放




## 往期精彩

[即时通讯轻松实现：WebSocket、Vue 3 和 Node.js 缔造的多人实时交流平台](https://juejin.cn/post/7266037480750841896)    

[创新互动体验：WebSocket、Vue 3 和 Node实现图片共享的多人聊天室](https://juejin.cn/post/7270478168758550583)   

[腾讯云服务器：从购买到部署上线的实践之旅](https://juejin.cn/post/7267576592780673076)   

