# Vue

## 1. Vue项目中的错误处理
```js
const app = createApp(App)
app.config.errorHandler = (err, vm, info) => {
  console.log(err, vm, info)
  // 错误日志上报
}
window.onerror = function (event) {};
// 未处理的promise错误
window.onunhandledrejection = function (event) {}
```
## 2. vite中构建优化
### 1.日志去除
```js
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    minify: 'terser',
    terserOptions: {
      // mangle: true, // 混淆变量名
      compress: {
        drop_console: true,  // 移除 console
        drop_debugger: true, // 移除 debugger
      },
    }
  }
})

```
### 2. gzip压缩
```js
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [vue(),
    viteCompression({
      verbose: true,        // 是否在控制台输出压缩结果
      disable: false,       // 是否禁用压缩
      threshold: 10240,     // 只有大小大于该值的资源会被压缩，单位是字节
      algorithm: 'gzip',    // 压缩算法 ('gzip'、'brotliCompress'等)
      ext: '.gz',           // 生成的压缩包后缀 '.gz'、'.br'
      deleteOriginFile: false, // 是否删除源文件
    })
  ]
})

```
### 3. 手动分包
```js
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // node_modules下的第三方库单独打包
            return 'vendor-' + id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  }
})

```
### 4. 多进程打包
 
