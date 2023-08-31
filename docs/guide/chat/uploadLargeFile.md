---
title: node
titleTemplate: uploadFile
---

## 前言

1. 断点续传：
断点续传是一种上传技术，允许在上传中断后继续上传，而无需从头开始。

2. 分片上传：
分片上传是将大文件分割成多个小块（分片），然后逐个上传这些小块的技术。每个小块可以并行上传，从而提高上传速度。一旦所有分片上传完成，服务器可以将这些分片合并成完整的文件。

3. 秒传：
秒传实际上就是不传，允许用户在上传文件时，如果服务器已经存在完全相同的文件，就直接跳过上传过程，实现瞬间完成的效果。

**下面是效果**
![文件分片上传.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7bcb7e28f07d4d428a878664aa963b11~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1884&h=882&s=2328507&e=gif&f=225&b=fefefe)

**体验地址** [xiaoyi1255](http://118.89.125.27/)   
需要创建或加入房间才能上传，家人们，下手轻点，，服务器一共就**40GB**
## 整体实现思路
**前端部分**：Vue3 + antdv + web Worker + spark-md5
1. 用户在前端选择文件，使用 web Worker 进行文件分片并计算文件 hash 值。
2. 将分片上传至后端，上传前校验文件是否已存在，如果存在则上传缺失的分片。
3. 完成分片上传后，向服务器发出合并请求，等待合并结果。
4. 收到合并完成的消息和文件访问路径，显示给用户。

**服务端部分**： express + busboy + fs
1. 实现三个接口：接收文件分片、合并分片、校验文件状态。
2. 接收文件分片接口：将上传的文件分片按文件名创建文件夹，每个分片作为文件保存。
3. 合并分片接口：接收文件名，查找对应文件夹下的分片，排序后读取文件流，生成完整文件。
4. 将合并后的文件进行静态文件托管，并返回文件访问路径。
5. 校验接口：检查是否存在文件，是否存在已上传的部分分片，若存在则返回已上传的分片信息。

## 项目框架结构
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2cf7d23e38304d33a2be3197dbfbb3d3~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=785&h=873&s=65180&e=png&b=22262c)
## 前端部分
### 校验文件是否已上传
* 文件已上传就会直接返回文件的访问url 也就是所谓的**秒传**
* 文件没有上传：就需要上传所有分片
* 上传了部分分片，返回已经上传的文件分片名 => 再把未上传的分片进行上传 所谓的断点续传（只是这里没有加个暂停按钮）
```typescript
/**
 * 校验文件是否已上传
 * @param md5 
 * @param chunks 
 */
const verifyFile = (md5: string, chunks: Blob[], file: File) => {
  let chunsNames = [] as string[]
  chunks.forEach((item, index) => chunsNames.push(md5 + separator + index))
  return $fetch(`${config?.baseUrl}/upload/verifyFile`,
    {
      method: 'POST',
      query: {
        chunksObj: { name: md5, chunsNames },
        extName: file.name.split(".").slice(-1)[0],
        fileName: md5 + '.' + file.name.split(".").slice(-1)[0]
      }
    })
}

```

### 文件分片
* File 对象： File 对象表示用户选择的文件，它包含文件的元数据（例如文件名、大小、类型、日期等）。通过读取文件的二进制内容，可以生成 Blob 对象，进而对文件进行分片。
* Blob 对象： Blob（Binary Large Object）是表示二进制数据的对象。它可以包含文件的一部分或全部内容。通过切割 Blob 对象，可以得到文件的分片

```typescript
/**
 * 文件分片
 * @param file 文件对象
 * @param chunksize 分片大小
 */
const createChunks = (file: File, chunksize: number) => {
  const chunks = [];
  for (let i = 0; i < file.size; i += chunksize) {
    chunks.push(file.slice(i, i + chunksize));
  }
  return chunks;
};

```

### 创建MD5 加密串
* 根据分片数组对象 使用spark-md5生成文件加密串
* 好处就是文件唯一标识，除非更改文件内容，否则不会改变
* 用作储存的标识
* 后面会介绍使用 web Worker来进行加密
* 因为文件如果几十个GB的话，程序不一定会崩溃，但是用户肯定会奔溃，因为耗时呀，js是单线程
```typescript
/**
 * 创建MD5 加密串
 * @param chunks 
 */
import SparkMD5 from "spark-md5";

const createMd5 = (chunks: Blob[]) => {
  const spark = new SparkMD5();
  return new Promise((reslove) => {
    function _read(i: number) {
      if (i >= chunks.length) {
        const md5 = spark.end();
        reslove(md5);
        return;
      }
      const blob = chunks[i];
      const reader = new FileReader();

      reader.onload = (e) => {
        const bytes = e?.target?.result;
        spark.append(bytes);
        _read(i + 1);
      };
      reader.readAsArrayBuffer(blob);
    }
    _read(0);
  });
};

```

### 上传分片
* 分片进行上传的好处就是：快、失败了某一个分片，不需要重新上传整个文件
```typescript
/**
 * 上传chunk
 * @param item chunks
 * @param md5 加密串
 * @param fileName 文件名
 * @param index 下标：失败辅助标识
 */
const uploadLargeFile = (item, md5 = '', fileName = '', index = -1) => {
  const formData = new FormData();
  formData.append("file", item);
  return useFetch(`${config?.baseUrl}/upload/largeFile`, {
    method: "POST",
    headers: {
      authorization: "authorization-text",
    },
    body: formData,
    query: {
      filename: md5 + separator + index,
      name: md5,
      fileName,
      index,
    },
  });
}

/**
 * 循环上传chunks
 * @param chunks 
 * @param md5 加密串
 * @param fileName 文件名
 */
const uploadChunks = (chunks = [], md5 = '', fileName = '') => {
  const allRequest = chunks.map((item, index) => {
    return uploadLargeFile(item, md5, fileName, index)
  });
  return allRequest 
}
```

### 分片上传完成调合并接口
* 当前端所有分片上传完成，就告诉服务端，把各分片进行整合并返回文件的访问url
```typescript
/**
 * 合并chunks
 * @param md5 
 * @param file 
 */
const mergeFile = async (md5 = '', file: File) => {
  const {
    url = "",
    fileType = "",
    fileName: _fileName,
  } = await $fetch(`${config?.baseUrl}/upload/mergeFile`, {
    method: "POST",
    query: {
      fileName: md5,
      filename: file.name,
      extName: file.name.split(".").slice(-1)[0],
    },
  });
}
```

### 使用web Worker进行MD5加密
* 需要引入park-md5.js库 （注：我这里老报错，暂未找到解决方案，就暴力引入了）
* 主要流程： 
    - 创建worker.js 文件
    - 引入并使用 new Worker('worker.js')
    - 接收消息：通过监听message事件
    - 发送消息：通过发送postMessage
* 注意事项：Worker是独立于主线程的子线程，不能访问dom
```typescript
// md5Worker.js
self.importScripts('park-md5.js');

self.addEventListener('message', async (event) => {
  const chunks = event.data;
  const md5 = await createMd5(chunks);
  self.postMessage( md5);
})

const createMd5 = (chunks) => {
  const spark = new self.SparkMD5();

  return new Promise((resolve) => {
    function _read(i) {
      if (i >= chunks.length) {
        const md5 = spark.end();
        resolve(md5);
        return;
      }

      const blob = chunks[i];
      const reader = new FileReader();

      reader.onload = (e) => {
        const bytes = e?.target?.result;
        spark.append(bytes);
        _read(i + 1);
      };
      reader.readAsArrayBuffer(blob);
    }
    _read(0);
  });
};

```
* 主程序中使用
* 不要问我为什么使用第一种动态引入，问就是遇到坑啦~
```typescript
// 在主线程中创建 Web Worker
import("./md5Worker?worker").then((worker) => {
    const md5Worker = new worker.default();
    // 发送消息
    md5Worker.postMessage('发送的消息')
    // 报错监听
    md5Worker.onerror = err => {
        }
    // 接收消息
    md5Worker.onmessage = function (e) {}
    // 关闭联系
    md5Worker.terminate()
})

// ----------------------或者-----------------------
const worker = new Worker('worker-script.js');
worker.postMessage('Hello from main thread');
worker.onmessage = function(event) {
  console.log('Main thread received message from Worker:', event.data);
};
```

## 后端部分

### 创建server.js
```javascript
const express = require('express');
const app = express();
const cors = require('cors'); // 导入 cors 中间件
const uploadRoutes = require('./routes/upload.js');

app.use(express.json());
// 托管静态文件
app.use('/static',express.static(path.join(__dirname,'./public'), {
	maxAge: 1000 * 60 * 60 *24 * 7
}))
// 跨域
app.use(cors())
// 上传路由
app.use('/upload', uploadRoutes)

// 启动服务器
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
	console.log(`服务器正在运行，端口：${PORT}`);
});
```
### 文件校验接口
```javascript
const express = require('express');
const path = require('path');
const fs = require('fs')
const router = express.Router();
/**
 * 校验文件是否已上传
 * 1. 静态服务上是否存在该文件 存在=》返回url
 * 2. 不存在改文件
 *    1）是否存在已上传的部分chunks 存在，返回还未上传的chunks 名列表
 */
router.post('/verifyFile', async (req, res) => {
  const {
    fileName,
    extName,
    chunksObj=''
  } = req.query
  console.log(JSON.parse(chunksObj))
  const { name = '', chunsNames= [] } = JSON.parse(chunksObj || '{}') || {}
  let notUploadedChunks = [] // 未上传的chunks名列表
  let chunksFiles = []
  // 校验文件是否已存在
  const isSave = checkFileExistsInFolder(fileName)
  // 文件不存在 接着检查是否存在已上传的chunks
  if (!isSave && name) {
    chunksFiles = getFilesInFolder(`../public/file/thunk/${name}`) || []
    if (chunksFiles?.length && chunsNames?.length) {
      notUploadedChunks = chunsNames.filter(item => !chunksFiles.includes(item))
    }
  }
  const url = isSave ?  '/static/file/' + fileName : ''
  res.status(200).send({
    code: 0,
    fileType,
    fileName,
    notUploadedChunks,
    uploadedChunks: chunksFiles,
    url
  })
})

/**
 * 查看是否已包含某个文件
 * @param {*} targetFileName 查找的目标文件名
 * @param {*} folderPath 文件夹路径 默认 /public/file/
 * @returns 
 */
function checkFileExistsInFolder(targetFileName, folderPath='../public/file/') {
    folderPath = path.join(__dirname, folderPath)
    const filesInFolder = fs.readdirSync(folderPath);
    const isUpoaded = filesInFolder.includes(targetFileName)
    console.log('文件是否已存在', isUpoaded)
    return isUpoaded;
}

/**
 * 检查某个文件夹是否存在
 * @param {*} folderPath 文件夹路径
 * @returns 文件夹内的所有文件
 */
function getFilesInFolder(folderPath) {
    folderPath = path.join(__dirname, folderPath)
    if (!fs.existsSync(folderPath)) {
      console.log(`Folder '${folderPath}' does not exist.`);
      return [];
    }
    
    const filesInFolder = fs.readdirSync(folderPath) || [];
    return filesInFolder;
}

```

### 分片上传接口
```javascript
const express = require('express');
const Busboy = require('busboy')
const path = require('path');
const fs = require('fs')
const router = express.Router();
/**
 * 大文件上传： 分片
 */
router.post('/largeFile', (req, res) => {
  const busboy = Busboy({ headers: req.headers });
  const { filename, name, index } = req.query
  busboy.on('file', (req, (err, file, filds, encoding, mimetype) => {
    try {
      const dir = `../public/file/thunk/${name}`
      mkdirFolder(dir)
      const saveTo = path.join(__dirname, dir, filename);
      file.pipe(fs.createWriteStream(saveTo));
    } catch (error) {
      console.log(error, 'err*---------')
      const resObj = {
        msg: '分片上传失败',
        code: -1,
        err: error,
        index // 返回报错的是那个chunks
      }
      res.send(resObj);
    }
  }));
  busboy.on('finish', function () {
    const resObj = {
      msg: '分片上传成功',
      code: 0,
      index,
    }
    res.send(resObj);
  });
  return req.pipe(busboy);
})
```

### 合并分片接口

```typescript
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
/**
 * 合并分片
 */
router.post('/mergeFile', async (req, res) => {
  const { fileName, extName, filename } = req.query
  thunkStreamMerge(
    '../public/file/thunk/' + fileName,
    '../public/file/' + fileName + '.' + extName
  );
  let fileType = extName
  if (imageFormats.includes(extName)) {
    fileType = 'img'
  } else if (videoFormats.includes(extName)) {
    fileType = 'video'
  }

  res.json({
    code: 1,
    url: '/static/file/' + fileName,
    fileType,
    fileName
  });
})

/**
 * 文件合并
 * @param {string} sourceFiles 源文件目录
 * @param {string} targetFile 目标文件路径
 */
function thunkStreamMerge(sourceFiles, targetFile) {
  const sourceFilesDir = path.join(__dirname, sourceFiles);
  targetFile = path.join(__dirname, targetFile);

  const fileList = fs
    .readdirSync(sourceFilesDir)
    .filter((file) => fs.lstatSync(path.join(sourceFilesDir, file)).isFile())
    .sort((a, b) => parseInt(a.split('@')[1]) - parseInt(b.split('@')[1]))
    .map((name) => ({
      name,
      filePath: path.join(sourceFilesDir, name),
    }));

  const fileWriteStream = fs.createWriteStream(targetFile);

  thunkStreamMergeProgress(fileList, fileWriteStream, sourceFilesDir);
}

/**
 * 合并每一个切片
 * @param {Array} fileList 文件数据列表
 * @param {WritableStream} fileWriteStream 最终的写入结果流
 * @param {string} sourceFilesDir 源文件目录
 */
function thunkStreamMergeProgress(fileList, fileWriteStream, sourceFilesDir) {
  if (!fileList.length) {
    fileWriteStream.end('完成了');
    // 删除临时目录
    fs.rmdirSync(sourceFilesDir, { recursive: true, force: true });
    return;
  }

  const { filePath: chunkFilePath } = fileList.shift();
  const currentReadStream = fs.createReadStream(chunkFilePath);

  // 把结果往最终的生成文件上进行拼接
  currentReadStream.pipe(fileWriteStream, { end: false });

  currentReadStream.on('end', () => {
    // 拼接完之后进入下一次循环
    thunkStreamMergeProgress(fileList, fileWriteStream, sourceFilesDir);
  });
}

```

## 踩坑实录
1. Worker的使用 new Worker('worker.js') 路径问题
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/080b61d2d9e54d53b5edd0d75b6770fb~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1805&h=479&s=71693&e=png&b=fffefe)
```typescript
import md5Worker from "./md5Worker";
const worker = new Worker('./md5Worker.js')
worker.onerror= (err) => {
  console.log(err)
}
```
**解决**
```typescript
import("./md5Worker?worker").then((worker) => {
const md5Worker = new worker.default();
md5Worker.postMessage(chunks)
md5Worker.onerror = err => {
    console.log(err)
}
md5Worker.onmessage = async function (e) {}
})
```


2. 分片上传
* 所有分片上传成功 => 删除某一个分片（9） 
* 然后判断请求成功数，取错了 const isAllSuccess = successArr.length === chunks.length
* 应该取的是总发送的分片数（因为部分分片已上传的情况是不满上面的条件的） 啪 就是一巴掌
* const isAllSuccess = successArr.length === allRequest.length 才对
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f1b3e84cf1394569827198694024ddc7~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1458&h=435&s=78767&e=png&b=fcfcfc)
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8e08563466c1425f9562ca611b17eda6~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1140&h=358&s=53653&e=png&b=262a31)
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b1c0bde547834f17b66f1059d6123442~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1495&h=330&s=47272&e=png&b=fefefe)
```typescript
const allRequest = uploadChunks(chunks, md5, fileName, notUploadedChunks, uploadedChunks)
console.log(allRequest, 'allRequest')
const successArr: any[] = [] // 纪录成功上传的chunks
Promise.allSettled(allRequest).then(res => {
    res?.forEach(item => {
    if (item.status == 'fulfilled' && item.value?.data?.value?.code == 0) {
        const failIndex = item.value.data.value?.index
        successArr.push(failIndex)
    }
    })
}).finally(async () => {
    // const isAllSuccess = successArr.length === chunks.length // 你小子让我徘徊半小时是吧，看完不揍死你
    const isAllSuccess = successArr.length === allRequest.length
    if (!isAllSuccess) {
        const tryAllRequest = chunks.map((item, index) => {
            if (!successArr.includes('' + index)) {
                return uploadLargeFile(item, md5, fileName, index)
            }
        })
        // 失败重试一次
        await Promise.all(tryAllRequest)
    }
    mergeFile(md5, file)
    loading.value = false;
    showUploadList.value = false
})
```

3. 上传结果的校验
* 刚开始，我是通过上次分片结果返回的index进行记录的，结果 node 已报错，就整个都没有了
* 后面才使用一个单独的接口 实时查询 文件状态

文件合并: 合并的时候没有对分片进行排序，，导致文件不对

## 源码
[xiaoyi1255](https://github.com/xiaoyi1255/nuxt3-temple)

结语： 如果本文对你有收获，麻烦动动发财的小手，点点关注、点点赞！！！