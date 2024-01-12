/**
 * 1、使用一个map存储数据， key:数组元素，value: 下标
 * 2、因为题目说只有一个结果，所以在遍历时判断 map是否存在 目标值-当前值 的元素
 * 3、返回结果 主要+1 因为下标从1开始
 * @param numbers 
 * @param target 
 * @returns 
 */
function twoSum(numbers: number[], target: number): number[] {
  const map = new Map<number, number>();
  for (let i = 0; i < numbers.length; i++) {
    const complement = target - numbers[i];
    if (map.has(complement)) {
      return [map.get(complement)! +1, i+1];
    }
    map.set(numbers[i], i);
  }
  return [];
};

console.log(twoSum([2, 7, 11, 15], 9));
console.log(twoSum([2,3,4], 6));
console.log(twoSum([-1, 0], -1));