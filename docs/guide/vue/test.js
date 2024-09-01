async function test() {
  let res = []
  for (let i = 0;i < 5;i++) {
    const a = await fetch('https://www.baidu.com')
    res.push(a)
  }
  return res
}
test().then(res => {
  console.log(res)
})