import { observe } from './observe.mjs'
import Watcher from './watcher.mjs'


const data = {
  name: '张三',
  age: 18,
  job: {
    salary: 1000,
    do: {
      work: '写代码'
    }
  },
  arr: [1, 2, 3, 4, 5]
}

observe(data)

new Watcher(data, 'name', (newVal, oldVal) => {
  console.log('watcher name 变化了', newVal, oldVal)
}, {})
// data.name = '小易'
// data.arr.push(6)
// data.arr.shift()
// console.log(data)
