function areArraysContentEqual(arr1 = [], arr2 = []) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  arr1 = [].concat(arr1, arr2);

  // 对数组中的元素进行按位异或运算
  let result = combinedArray.reduce((acc, value) => acc ^ value, 0);

  return result === 0;
}

function isArrSame(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  
  const set = [...new Set([...arr1, ...arr2])]
  function getCounts(arr) {
    return set.map(item => arr.filter(ele => [ele].includes(item)).length).join('')
  }
  return getCounts(arr1) === getCounts(arr2)
}
function areArraysContentEqual3(arr1= [], arr2 = []) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  const countMap = new Map();

  // 计数第一个数组的元素
  for (const item of arr1) {
    countMap.set(item, (countMap.get(item) || 0) + 1);
  }

  // 比较第二个数组与计数
  for (const item of arr2) {
    const val = countMap.get(item);
    if (val === undefined || val <= 0) {
      return false;
    }
    countMap.set(item, val - 1);
  }

  return true;
}

console.time('time')
console.log(isArrSame([2, 1, NaN, '2', 1,1,1,10], [NaN, 1, '2', 1, 2,1,1,10]))
console.timeEnd('time')

console.time('time1')
console.log(areArraysContentEqual3([2, 1, NaN, '2', 1,1,1,10], [NaN, 1, '2', 1, 2,1,1,10]))
console.timeEnd('time1')
// areArraysContentEqual([2, 1, '1', null, NaN], [1, 2, '1', null, NaN]); // true
// areArraysContentEqual([1], ['1']); // true 元素进行异或操作，有类型隐私转换

