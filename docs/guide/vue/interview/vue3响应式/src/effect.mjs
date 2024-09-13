const trackList = new Set() // 存放依赖

let activeEffect

function track(target, key) {
  trackList.add(activeEffect)
}

function trigger(target, key) {
  
}