function areArraysContentEqual(arr1 = [], arr2 = []) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  arr1 = [].concat(arr1, arr2);
  
  // 对数组中的元素进行按位异或运算
  let result = combinedArray.reduce((acc, value) => acc ^ value, 0);

  return result === 0;
}
areArraysContentEqual([2, 1, '1', null, NaN], [1, 2, '1', null, NaN]); // true
areArraysContentEqual([1], ['1']); // true 元素进行异或操作，有类型隐私转换

