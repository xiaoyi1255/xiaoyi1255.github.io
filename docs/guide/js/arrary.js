/**
 * 判断两个数组的内容是否完全相等，顺序不影响
 * @param {*} arr1 
 * @param {*} arr2 
 * @returns 
 */

function areArraysContentEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  // 创建计数对象，用于记录每个元素在数组中的出现次数
  const countMap1 = count(arr1)
  const countMap2 = count(arr2)

  // 统计数组中的元素出现次数
  function count(arr = []) {
    const resMap = new Map();
    for (const item of arr) {
      resMap.set(item, (resMap.get(item) || 0) + 1);
    }
    return resMap
  }
  // 检查计数对象是否相等
  for (const [key, count] of countMap1) {
    if (countMap2.get(key) !== count) {
      return false;
    }
  }

  return true;
}

function areArraysContentEqual2(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  // 重复数组元素 加1、2、3
  const countArr1 = updateArray(arr1)
  const countArr2 = updateArray(arr2)

  /**
   * 
   * @param {*} arr 数组 元素重复 转换成val1, val2
   * @returns 
   */
  function updateArray(arr) {
    const countMap = new Map();
    const updatedArr = [];

    for (const item of arr) {
      if (!countMap.has(item)) {
        // 如果元素是第一次出现，直接添加到结果数组
        countMap.set(item, 0);
        updatedArr.push(item);
      } else {
        // 如果元素已经出现过，添加带有编号的新元素到结果数组
        const count = countMap.get(item) + 1;
        countMap.set(item, count);
        updatedArr.push(`${item}${count}`);
      }
    }
    return updatedArr;
  }
  console.log(countArr1, countArr2)
  const flag = countArr1.some(item => !countArr2.includes(item))
  return !flag
}

// const array1 = ["apple", "banana", "cherry", "banana", '1', '11', '1'];
// const array2 = ["banana", "apple", "banana", "cherry", '11', '1', 1];

const array1 =  ["apple", "banana", "cherry"]
const array2 =  ["apple", "cherry", "banana"]
// if (areArraysContentEqual(array1, array2)) {
//   console.log("数组内容相等");
// } else {
//   console.log("数组内容不相等");
// }

// if (areArraysContentEqual2(array1, array2)) {
//   console.log("数组内容相等");
// } else {
//   console.log("数组内容不相等");
// }

function fn(arr1, arr2) {
  return !arr1.some(item => !arr2.includes(item))
}

console.log(fn(array1,array2))