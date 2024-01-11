/**
 * 1、先对原数组进行排序 按元素第一个的值升序排
 * 2、声明一个结果数组，先放入排序数组第一个元素，
 * 3、遍历排序数组：结果数组最后一个与遍历项进行比较：结果数组最后一项元素的右值 < 当前项左值,不存在区间重叠
 * 4、 返之则存在重叠，结果数组当前项的右值 取两者大的右值
 * 
 * @param intervals 
 * @returns 
 */

function merge(intervals: number[][]): number[][] {
  intervals.sort((a, b) => a[0] - b[0]);
  let res: number[][] = [intervals[0]];
  for (let i = 0; i < intervals.length; i++) {
    if (res.at(-1)[1] < intervals[i][0]) { // 不存在重叠区间，直接push
      res.push(intervals[i]);
    } else { // 存在重叠
      res.at(-1)[1] = Math.max(res.at(-1)[1], intervals[i][1]);
    }
  }
  return res;
};
console.log(merge([[1, 3], [6, 7], [2, 6], [8, 10], [15, 18]])) // 
