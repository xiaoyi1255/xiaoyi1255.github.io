function mergeTree(node) {
  if (!node.children || node.children.length === 0) {
    return node;
  }

  // 递归处理子节点
  const processedChildren = node.children.map(mergeTree);

  // 合并相邻同值子节点
  const mergedChildren = [];

  const len = processedChildren.length;
  for (let i = 0; i < len; i++) {
    let current = processedChildren[i];
    if ( i+ 1 < len && current.value === processedChildren[i + 1].value) {
      current = {
        ...current,
        children: [...current.children, ...processedChildren[i + 1].children],
      };
      i++;
    }
    mergedChildren.push(current)
  }

  return {
    ...node,
    children: mergedChildren,
  };
}

// 测试用例
const tree = {
  value: 'a',
  children: [
    { value: 'b', children: [{ value: 'c', children: [] }] },
    { value: 'b', children: [{ value: 'd', children: [] }] },
    { value: 'a', children: [{ value: 'e', children: [] }] },
    { value: 'c', children: [{ value: 'e', children: [{ value: 'f', children: [] }] }, { value: 'e', children: [{ value: 'g', children: [] }] }] },
  ],
};

console.log(mergeTree(tree));
