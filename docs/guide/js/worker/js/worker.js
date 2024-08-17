console.log('webworker start')

// 监听主线程发送过来的消息
self.addEventListener('message', async(e) => {
  const { type, data } = e.data
  console.log('webworker 接受主线程消息', type, data)
  let res = null;
  switch (type) {
    case 'fetch':
      fetch(data, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then( async res => {
        const json = await res.json()
        self.postMessage({
          type: 'worker',
          data: json
        })
      })
      break;
    case 'add':
      setImmediate(() => {
        res = data.reduce((a, b) => a + b, 0)
        // 向主线程发送消息
        self.postMessage({
          type: 'worker',
          data: res
        })
      }, 3000)
      break;
    default:
      break;
  }
  // 向主线程发送消息
})