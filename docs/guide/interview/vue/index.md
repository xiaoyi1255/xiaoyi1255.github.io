<!-- @format -->

## Vue2

### 1.为什么 Vue2 中新增属性的修改不会触发页面刷新？
Vue2使用`Objecty.defineProperty`对属性劫持来实现的响应式，新增的属性没有劫持，没有进行依赖收集，所以值改了不会触发页面刷新。  
想要页面数据更新可以进行以下操作：
```js
data: {
  message: 'Hello Vue!',
  obj: {
    name: '小易',
    gender: '男'
  }
}

// $set
this.$set(this.obj, 'age', 18)

// Vue.set
Vue.set(this.obj, 'age', 18)

// $forceUpdate 能让页面跟新
this.obj.age = 18
this.$forceUpdate()

// Object.assign 或者 展开符
// this.obj = Object.assign({}, this.obj, { age: 18 })
 this.obj = {...this.obj, age: 18 };
```
推荐使用 `$set` 或者在 `data` 中提前声明属性, 赋默认值值

### 2. Vue2 中如何实现双向绑定？
Vue2中使用Object.defineProperty对属性劫持来实现的，通过getter和setter来实现数据劫持，当数据改变时，通过发布订阅模式通知视图更新。

```js
// 1.数据劫持
```
### 组件通信
