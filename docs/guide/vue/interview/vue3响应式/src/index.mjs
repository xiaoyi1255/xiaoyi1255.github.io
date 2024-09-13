

import {
  reactive,
  effect
} from './reactive.mjs'

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

effect(() => {
  console.log('effect>>>>', state.name)
})

setTimeout(() => {
  console.log('setTimeout>>>>')
  state.name = '小易'
}, 1000)