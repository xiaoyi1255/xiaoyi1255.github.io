/**
 * 1、声明一个left记录当前下标，遍历数组，下一位比前一位大1，left++
 * 2、 left===i 说明无连续，push当前项
 * 3、 否则 说明存在连续项， push('i -> left')
 * 4、 返回数组结果
 */
function summaryRanges(nums: number[]): string[] {
  let left = 0;
  const res: string[] = [];
  for (let i = 0; i < nums.length; i++) {
    left = i
    while (nums[left+1] - nums[left] == 1) {
      left++
    }
    if (left === i) {
      res.push(nums[i].toString())
    } else{ 
      res.push(`${nums[i]}->${nums[left]}`)
      i=left
    }
  }
  return res;
};

console.log(summaryRanges([0, 1, 2, 4, 5, 7]));