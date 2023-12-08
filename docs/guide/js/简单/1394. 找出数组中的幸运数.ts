/**
 * 1、使用map 统计每个数字出现的 次数
 * 2、 遍历map, key == value的，最大的那个即可
 * @param arr 
 * @returns 
 */
function findLucky(arr: number[]): number {
  const map = new Map<number, number>();
  for (const num of arr) {
    map.set(num, (map.get(num) || 0) + 1);
  }
  let max = -1;
  for (const [key, value] of map) {
    if (key === value) {
      if (value > max) {
        max = value;
      }
    }
  }
  return max;
};

console.log(findLucky([2, 2, 3, 4,2]))