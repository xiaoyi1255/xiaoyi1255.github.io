/**
 * 数组去重
 * @param {*} arr 
 */
{
  // 利用set
  const fn1 = arr => [...new Set(arr)]
  // 利用filter
  const fn2 = arr => arr.filter((item, index) => arr.indexOf(item) === index)
  // 利用reduce
  const fn3 = arr => arr.reduce((prev, cur) => {
    if (!prev.includes(cur)) {
      prev.push(cur)
    }
    return prev
  }, [])
  // 利用map
  const fn4 = (arr) => {
    const map = new Map()
    return arr.filter(item => !map.has(item) && map.set(item, 1))
  }

  // for循环
  const fn5 = arr => {
    const res = []
    for (let i = 0; i < arr.length; i++) {
      if (res.indexOf(arr[i]) === -1) {
        res.push(arr[i])
      }
    }
    return res
  }

  const arr = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]
  console.log(fn1(arr))
  console.log(fn2(arr))
  console.log(fn3(arr))
  console.log(fn4(arr))
  console.log(fn5(arr))

}

{
  // 数组对象分组
  function groupBy(arr, key) {
    return arr.reduce((prev, cur) => {
      const val = cur[key]
      if (!prev[val]) prev[val] = []
      prev[val].push(cur)
      return prev
    }, {})
  }

  function groupBy2(arr, key) {
    if (!Array.isArray(arr)) return []

    const res = {}
    arr.forEach(item => {
      if (!res[item[key]]) {
        res[item[key]] = []
      }
      res[item[key]].push(item)
    })
    return res
  }

  function groupBy3(arr, key) {
    if (!Array.isArray(arr)) return {}
    return arr.reduce((prev, cur) => {
      const keyName = typeof key === 'string' ? key : key(cur)
      const val = cur[keyName]
      if (!prev[val]) {
        prev[val] = []
      }
      prev[val].push(cur)
      return prev
    }, {})
  }

  const arr = [
    { name: '张三', age: 18, gender: '男' },
    { name: '李四', age: 20, gender: '男' },
    { name: '王五', age: 19, gender: '女' },
    { name: '赵六', age: 20, gender: '女' },
  ]
  const res = groupBy(arr, 'age')
  const res2 = groupBy2(arr, 'age')
  const res3 = groupBy3(arr, 'age')
  const res4 = groupBy3(arr, item => item.age)


  // console.log(res, res2)
  console.log(res3, res4)
}


{
  /**
   * 实现一个add
   * 
   */
 

  function creatAdd(val = 1) {
    return new Proxy({},
      {
        get(_, key) {
          console.log(key)
          return creatAdd(val * Number(key))
        }
      })

  }
  const add = creatAdd()

  const r1 = add[1][2][4] + 4 // 2*4 + 4 = 12
  const r2 = add[1][12][4] + 4 + 5 // 2*12*4 + 4 + 5 = 96
}