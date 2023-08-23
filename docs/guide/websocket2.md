---
title: websocket
titleTemplate: vue
---

## 前言 {#前言}
本文将介绍如何结合 WebSocket、Vue 3 和 Node 构建一个支持图片类型信息发送的多人聊天室。

## 整体实现思路 {#整体实现思路}
1. 前端使用了antdv 的upload 组件进行图片上传
2. 服务端解决跨域
3. 收到请求，把文件保存下来
4. 服务端保存在静态托管的服务下
5. 服务端并把文件访问的url返回
6. 前端上传成功之后拿到url向websocket发送消息
7. 服务端收到消息向各个客户端发消息
8. 客户端收到消息，判断为图片，进行展示
## 一、前端部分 {#一、前端部分}

### 前端上传文件组件
* 这里使用的vue3 + antdv
```vue
<template>
    <Upload
      v-model:file-list="fileList"
      name="file"
      :action= "`${config?.baseUrl}/upload/imgs`"
      :headers="headers"
      enctype="multipart/form-data"
      :showUploadList="false"
      @change="handleChange"
    >
    <Button>
        <div v-if="loading">
          <Spin />
        </div>
        <div v-else>
          <upload-outlined></upload-outlined>
          发送图片
        </div>
      </Button>
    </Upload>
  </template>
  <script lang="ts" setup>
  import { ref } from 'vue';
  import { message, Button, Upload, Spin } from 'ant-design-vue';
  import { UploadOutlined } from '@ant-design/icons-vue';
  import type { UploadChangeParam } from 'ant-design-vue';
  import { config } from '@/baseConfig' // 上传地址配置

  const emit = defineEmits(['uploadSucess'])
  const handleChange = (info: UploadChangeParam) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      // message.success(`${info.file.name} 发送成功`);
      loading.value = false
      emit('uploadSucess', info.file?.response?.url)
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 发送失败`);
      loading.value = false
    }
  };
  const loading = ref(false)
  const fileList = ref([]);
  const headers = {
    authorization: 'authorization-text',
  };
  </script>

```
* 配置文件如下
```javascript
// baseConfig.js
let dev = false
const config = {
    baseUrl: 'http://118.89.125.27:3000',
    baseWsUrl: 'ws://118.89.125.27:3000'
}
if (dev) {
    config.baseUrl = 'http://localhost:3000'
    config.baseWsUrl = 'ws://localhost:3000'
    
}
export {
    config
}

```

* 前端图片的展示就不贴代码了，直接img 完事儿

## 二、服务端的实现 {#二、服务端的实现}
* 环境：node: 16.14.1
* 框架express + busboy + fs
* 先安装依赖
```sh
yarn add express busboy
```

### 服务端入口文件
```javascript
// 入口文件 server.js
const express = require('express');
const app = express();
const uploadRoutes = require('./routes/upload.js');

// 文件上传接口
app.use('/upload', uploadRoutes)
// 启动服务器
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
	console.log(`服务器正在运行，端口：${PORT}`);
});
```
### 上传接口具体实现
* busboy：一个用来处理文件的依赖
* 1. 创建一个保存文件的文件夹
```javascript
/**
 * 判断文件夹是否存在、不存在则创建
 * @param {*} name 判断的文件夹
 */
const path = require('path');
const fs = require('fs')

function mkdirFolder(name = '../public/uploads') {
    const folderPath = path.join(__dirname, name);
    // 判断文件夹是否存在
    if (!fs.existsSync(folderPath)) {
        // 如果文件夹不存在，则创建它
        fs.mkdirSync(folderPath);
        console.log('文件夹已创建');
    } else {
        console.log('文件夹已存在');
    }
}
```
* 2. 接收文件并保存到对应文件夹
* 3. 这里需要对文件名进行处理（不然会乱码）
* 4. 返回文件的访问路径 

```javascript
// routes/upload.js
const express = require('express');
const Busboy = require('busboy')
const router = express.Router();
const path = require('path');
const fs = require('fs')

router.post('/imgs', (req, res) => {
  const busboy = Busboy({ headers: req.headers });
  let _fileName = ''
  mkdirFolder()
  busboy.on('file', async (fieldname, file, filename, encoding, mimetype) => {
    // 对文件名进行处理
    const imgName = filename.filename;
    const names = imgName.split('.')
    _fileName = names[0] + '-' + formatDateTime(new Date()) + '.' + names[1]
    const saveTo = path.join(__dirname, '../public/uploads/', _fileName);
    file.pipe(fs.createWriteStream(saveTo));
  });

  busboy.on('finish', function () {
    const resObj = {
      msg: '发送成功',
      url: '/static/uploads/' + _fileName // 返回文件的访问路径
    }
    console.log('文件上传：', _fileName)
    res.send(resObj);
  });
  return req.pipe(busboy);
});

module.exports = router;


```

### 静态托管文件夹
* express 是有提供静态托管的模块**static**，可直接使用
* 在入口文件添加如下代码

```javascript
// 入口文件 server.js
const express = require('express');
const app = express();

// 访问 主机+端口/static
// 这里的static是虚拟路径，它映射到public下
// maxAge 是设置的强制缓存 时间
app.use('/static',express.static(path.join(__dirname,'./public'), {
	maxAge: 1000 * 60 * 60 *24 * 7
})) // 图片文件夹路径

```

### 跨域解决 cors
* 安装 cors 依赖
```sh
yarn add cors
```
* 在入口文件使用

```javascript
// 入口文件 server.js
const express = require('express');
const app = express();
const cors = require('cors'); // 导入 cors 中间件

app.use(cors())
```

## 踩坑点 {#踩坑点}
### 1.文件名乱码
* 在服务端保存文件的时候，拿到的文件名含中文就会乱码
* 图片名：ai动漫美女.jpg
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d8220c70bae848559be6127790668aac~tplv-k3u1fbpfcp-watermark.image?)
服务端正常保存了，前端也正常展示了，但是这这这TM~是乱码，，还是处理一下吧
* **Buffer.from(filename.filename, "latin1").toString("utf8")**
```javascript
// routes/upload.js
router.post('/imgs', (req, res) => {
  ...
  busboy.on('file', async (fieldname, file, filename, encoding, mimetype) => {
    // 对文件名进行处理
    const imgName = Buffer.from(filename.filename, "latin1").toString("utf8");
  })
  ...
});
```
### 2.静态托管文件夹
* 原先的写法 **有问题** ，本地跑着正常托管，然后部署到线上，就访问不到了。
* 第一反应： 服务器的文件访问权限，，后面网上查了下说不会，我就在服务器跑向本地那么跑，结果公共公网ip可以访问。。我勒个去
* 第二反应：本地跑和部署区别==>> 部署是**pm2**管理的。好吧=>只能是路径问题了
* 后面改了路径就好了
```javascript
// 有问题的写法
// app.use(express.static('public'));


// 正确的写法
app.use('/static',express.static(path.join(__dirname,'./public'), {
	maxAge: 1000 * 60 * 60 *24 * 7
})) // 图片文件夹路径

```
### 3.手机上传的图片heic
* 在电脑上测试差不多之后就部署了
* 在手机上传照片，哦豁=》 这是个啥？？ **heic**？
* 还有这种格式。。。我无语了，来活了！！！
* 网上查了下，img 标签是不支持 heic 文件的，不支持？那只能强转类型了。
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9475260d113f418a8ceb8ec9cd91dcd8~tplv-k3u1fbpfcp-watermark.image?)


#### 方案1：在node端处理 heic-convert
**heic-convert**
* 流程： 判断是heic类型 =>传buffer 和要转成的类型 => 返回再进行文件的写入
```javascript
    const heicConvert = require('heic-convert');

router.post('/imgs', (req, res) => {
  const busboy = Busboy({ headers: req.headers });
  let _fileName = ''
  busboy.on('file', async (fieldname, file, filename, encoding, mimetype) => {
    const imgName = Buffer.from(filename.filename, "latin1").toString(
      "utf8"
    );
    const names = imgName.split('.')
    const preName = names[0] + '-';
    _fileName =preName + formatDateTime(new Date()) + '.' + names[1]
    const saveTo = path.join(__dirname, '../public/uploads/', _fileName);
    if (names[1] == 'heic') {
      try {
        _fileName = new Date().getTime() + '.' + 'png'
        const saveTo = path.join(__dirname, '../public/uploads/', _fileName);
        // 创建一个数组，用于存储数据块
        const chunks = [];
        // 监听 'data' 事件来收集数据块
        file.on('data', (chunk) => {
          chunks.push(chunk);
        });

        file.on('end', async() => {
          const buffer = Buffer.concat(chunks);
          const pngBuffer = await heicConvert({
            buffer: buffer,
            format: 'PNG',
          });
          fs.writeFileSync(saveTo, pngBuffer);
        });
      } catch (error) {
        console.log(error)
      }
    } else { // 正常写入
      file.pipe(fs.createWriteStream(saveTo));
    }
  });
})


```
* 效果展示：左边转过后的，右边原图
直接裂开了。。。这玩个啥呀！！！
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6e41e563f1064a6b92f5e76eb8a4c341~tplv-k3u1fbpfcp-watermark.image?)

#### 方案2：在前端处理 heic2any
流程：文件上传之前判断是heic ，先转成png 然后再上传

```vue
<template>
    <Upload
      v-model:file-list="fileList"
      name="file"
      :action= "`${config?.baseUrl}/upload/imgs`"
      :headers="headers"
      enctype="multipart/form-data"
      :beforeUpload="handleBeforeUpload"
      :showUploadList="false"
      @change="handleChange"
    >
    <Button>
        <div v-if="loading">
          <Spin />
        </div>
        <div v-else>
          <upload-outlined></upload-outlined>
          发送图片
        </div>
      </Button>
    </Upload>
  </template>

  <script lang="ts" setup>
  import heic2any from 'heic2any';
  const handleBeforeUpload = async (file:any) => {
    loading.value = true
    console.log(file.name, 'file===>>>>>')
    if (file.name.includes('.heic')) {
      try {
          const pngBlob = await heic2any({
            blob: file,
            toType: 'image/png',
          });
          const pngFile = new File([pngBlob], file.name.replace(/\.heic$/, '.png'), {
            type: 'image/png',
          });
          return pngFile;
        } catch (error) {
          console.error('Error converting HEIC to PNG:', error);
          message.error('Failed to convert HEIC to PNG');
          return false; // Prevent upload
        }
    }
    return file
  }
  </script>
```

效果展示：  
试了几次都失败了：
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2cfcad0edc394f25ac323f199b4385a2~tplv-k3u1fbpfcp-watermark.image?)
在手机上到是成功了，但是。。。效果还是很不尽人意
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dfab6394a5bd40bfaf0912ae52f52c38~tplv-k3u1fbpfcp-watermark.image?)

