let uid = 0
export default class Dep {
  constructor() {
    console.log('Dep')
    this.id = uid++
    this.subs = [] // 存放所有的watcher的实例
  }
  addSub(sub) {
    this.subs.push(sub)
  }
  depend() {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }
  notify() {
    const subs = this.subs.slice()
    console.log('notify', this, subs)
    subs.forEach(sub => {
      sub.update()
    })
  }
}
Dep.target = null