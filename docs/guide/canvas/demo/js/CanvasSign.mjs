// 使用canvas实现签名照，可以设置颜色，粗细，橡皮擦功能，可以保存图片

class CanvasSign {
  constructor(canvas) {
    this.ctx = canvas
    this.color = '#000000'
    this.lineWidth = 1
    this.isDrawing = false
    this.lastX = 0
    this.lastY = 0
    this.init()
    this.history = []
    this.historyIndex = 0
  }
  init() {
    this.ctx.lineCap = 'round'
    this.ctx.lineJoin = 'round'
    this.ctx.lineWidth = this.lineWidth
    this.ctx.strokeStyle = this.color
    this.ctx.beginPath()
    this.ctx.moveTo(this.lastX, this.lastY)
    this.ctx.lineTo(this.x, this.y)
    this.ctx.stroke()
    this.ctx.closePath()
    this.ctx.beginPath()
    this.ctx.moveTo(this.lastX, this.lastY)
    this.globalCompositeOperation = 'source-over'
    requestAnimationFrame(() => {
      this.clear()
      this.draw()
    })

  }
  // 鼠标按下
  onMouseDown(e) {
    this.isDrawing = true // 开始绘制
    this.lastX = e.offsetX
    this.lastY = e.offsetY
    this.historyIndex++
  }
  // 鼠标移动
  onMouseMove(e) {
    if (this.isDrawing) {
      this.x = e.offsetX
      this.y = e.offsetY
      this.draw()
    }
  }
  // 保存轨迹
  saveHistory() {
    this.history.push(this.ctx.getImageData(0, 0, this.ctx.canvas.width, this.ctx.canvas.height))
  }
  // 撤销
  undo() {
    console.log(this.historyIndex, this.history.length)
    if (this.historyIndex > 0) {
      this.clear()
      this.ctx.putImageData(this.history[--this.historyIndex], 0, 0)
    }
    if (this.historyIndex === 0) {
      this.clear()
    }
  }
  // 重做
  redo() {
    if (this.historyIndex < this.history.length - 1) {
      this.clear()
      this.historyIndex++
      this.ctx.putImageData(this.history[this.historyIndex], 0, 0)
    }
  }
  // 鼠标抬起
  onMouseUp() {
    this.saveHistory()
    this.isDrawing = false // 停止绘制
    }
  // 鼠标离开
  onMouseLeave() {
    this.saveHistory()
    this.isDrawing = false // 停止绘制
  }
  // 鼠标离开画布
  onMouseOut() {
    this.saveHistory()
    this.isDrawing = false // 停止绘制
  }
  // 橡皮擦
  eraser() {
    if (this.globalCompositeOperation === 'destination-out') {
      this.globalCompositeOperation = 'source-over'
    } else {
      this.globalCompositeOperation = 'destination-out'
    }
  }
  // 设置颜色
  setColor(color) {
    this.color = color
  }
  // 设置粗细
  setLineWidth(lineWidth) {
    this.lineWidth = lineWidth
    console.log('lineWidth', lineWidth)
  }
  // 清空画布
  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }
  // 保存图片
  save() {
    const dataURL = this.ctx.canvas.toDataURL('image/png') // 将画布内容转换为图片
    const link = document.createElement('a')
    link.href = dataURL
    link.download = 'canvas.png' // 设置下载的文件名
    link.click() // 模拟点击下载
  }
  // 绘制
  draw() {
    if (!this.isDrawing) return
    this.ctx.beginPath()
    this.ctx.moveTo(this.lastX, this.lastY)
    this.ctx.lineTo(this.x, this.y)
    this.ctx.strokeStyle = this.color
    this.ctx.lineWidth = this.lineWidth
    this.ctx.globalCompositeOperation = this.globalCompositeOperation
    this.ctx.stroke()
    this.lastX = this.x
    this.lastY = this.y
  }
}

export {
  CanvasSign
}