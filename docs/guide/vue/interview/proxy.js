let Vue = {
  data: {
    name: '小易',
    age: 18
  },
}

function proxy(target, sourceKey) {
  let keys = Object.keys(target.data)
  for (let key of keys) {
    Object.defineProperty(target, key, {
      enumerable: true,
      configurable: true,
      get(){
        return this[sourceKey][key]
      },
      set(val){
        this[sourceKey][key] = val
      }
    })
  }
}
proxy(Vue, 'data', 'name')

console.log(Vue.data.name) // 小易
console.log(Vue.name) // 小易
Vue.name = '小王'
console.log(Vue.data.name) // 小王
console.log(Vue.name) // 小王