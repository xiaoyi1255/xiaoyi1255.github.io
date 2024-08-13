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
