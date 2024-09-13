import { reactive } from './reactive.mjs'
import { effect } from './effect.mjs'
import { computed } from './computed.mjs'
import { watch } from './watch.mjs'
const state = reactive({
  count: 1,
  name: '张三',
  age: 18,
  info: {
    gender: '男',
    address: '北京'
  },
  arr: [1, 2, 3]
})

// effect(() => {
//   console.log('外层effect', state.count)
// }, {
//   lazy: true,
//   scheduler: (fn) => {
//     jobQUeue.add(fn)
//     flushJob()
//   }
// })

// const count = computed(() => {
//   console.log('computed')
//   return state.count + 1
// })

// watch(() => state.count, (newVal, oldVal, onInvalidate) => {
//   onInvalidate(() => {
//     console.log('onInvalidate')
//   })
//   console.log('watch state.count', newVal, oldVal)
// }, {
//   immediate: true
// }
// )

// setTimeout(() => {
//   state.count = 9
// }, 1000)
// state.count++


state.arr.push(4)
state.arr[0] = 10
console.log(state.arr)