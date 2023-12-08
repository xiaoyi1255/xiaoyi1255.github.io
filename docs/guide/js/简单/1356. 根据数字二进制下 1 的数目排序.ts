/**
 * 思路： 计数、排序
 * 0、 先把数组进行一次排序（这样后面就只需对结果map进行排序即可
 * 1、 遍历数组， 分别计算出二进制位 1出现的次数
 * 2、 使用map进行记录， key: item+'-'+index; value: count
 * 3、 把map转数组 按value排序，最后返回key中item部分
 * @param arr 
 * @returns 
 */
function sortByBits(arr: number[]): number[] {
  arr.sort((a, b) => a-b)
  let map = new Map<string, number>()
  for (let i = 0; i < arr.length; i++) {
    map.set(arr[i] + '-' + i, count1(arr[i]));
  }

  function count1(num: number): number {
    let count = 0;
    while (num) {
      num = num & (num - 1);
      count++;
    }
    return count;
  }
  return [...map.entries()].sort((a, b) => a[1] - b[1]).map(v => +v[0].split('-')[0]);
};

console.log(sortByBits([0, 2, 1, 3, 4, 5, 6, 7, 8, 16, 8]));