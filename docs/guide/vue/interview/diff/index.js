// vue2 的dom diff算法
/**
 * 
 * @param {*} parent 父节点(同一个)
 * @param {*} oldC 旧子节点
 * @param {*} newC  新子节点
 * 双端比较：头头比较、尾尾比较、头尾比较、尾头比较
 * 
 */
function diff(parent,oldC, newC) {
  let oldStartIdx = 0
  let oldEndIdx = oldC.length - 1
  let newStartIdx = 0
  let newEndIdx = newC.length - 1

  let oldStartVNode = oldC[oldStartIdx]
  let oldEndVNode = oldC[oldEndIdx]

  let newStartVNode = newC[newStartIdx]
  let newEndVNode = newC[newEndIdx]
  while(oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if(oldStartVNode.key === newStartVNode.key) { // 头头比较
      patch(parent, oldStartVNode, newStartVNode)
      oldStartIdx++
      newStartIdx++
      oldStartVNode = oldC[oldStartIdx]
      newStartVNode = newC[newStartIdx]
    } else if(oldEndVNode.key === newEndVNode.key) { // 尾尾比较
      patch(parent, oldEndVNode, newEndVNode)
      oldEndIdx--
      newEndIdx--
      oldEndVNode = oldC[oldEndIdx]
      newEndVNode = newC[newEndIdx]
    } else if(oldStartVNode.key === newEndVNode.key) { // 头尾比较
      patch(parent, oldStartVNode, newEndVNode)
      // 交换位置
      parent.insertBefore(oldStartVNode.el, oldEndVNode.el.nextSibling)
      oldStartIdx++
      newEndIdx--
      oldStartVNode = oldC[oldStartIdx]
      newEndVNode = newC[newEndIdx]
    } else if(oldEndVNode.key === newStartVNode.key) { // 尾头比较
      patch(parent, oldEndVNode, newStartVNode)
      // 把 oldEndVNode 移动到 oldStartVNode 前面
      parent.insertBefore(oldEndVNode.el, oldStartVNode.el)
      oldEndIdx--
      newStartIdx++
      oldEndVNode = oldC[oldEndIdx]
      newStartVNode = newC[newStartIdx]
    } else {
      // 乱序比较
      // 1. 遍历 oldC，找到与 newStartVNode.key 相同的节点，进行 patch
      // 2. 如果找到了，则把 oldC 中对应的节点移动到 oldStartVNode 前面
      let newKey = newStartVNode.key
      let oldVnodeIdx = oldC.findIndex(vnode => vnode.key === newKey)
      if(oldVnodeIdx > -1) {
        // 找到了
        patch(parent, oldVnode, newStartVNode)
        let oldVnode = oldC[oldVnodeIdx]
        oldC[oldVnodeIdx] = undefined
        parent.insertBefore(oldVnode.el, oldStartVNode.el)
      } else {
        // 没找到，直接创建节点，插入到 oldStartVNode 前面
        mounnt(newStartVNode, parent, oldStartVNode.el)
      }
      newStartVNode++
      newStartVNode = newC[newStartIdx]
    }
  }
  if (oldEndIdx < oldStartIdx) {
    // 新增的情况 => 新节点比旧节点多
    for (let i = newStartIdx; i < newEndIdx; i++) {
      mount(newC[i])
    }
  } else if (newEndIdx < newStartIdx) {
    // 删除的情况 => 旧节点比新节点多
    for (let i = oldStartIdx; i < oldEndIdx; i++) {
      parent.removeChild(oldC[i].el)
    }
  }
}

