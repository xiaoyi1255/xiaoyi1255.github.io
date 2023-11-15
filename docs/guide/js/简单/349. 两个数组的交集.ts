// 给定两个数组 nums1 和 nums2 ，返回 它们的交集 。输出结果中的每个元素一定是 唯一 的。我们可以 不考虑输出结果的顺序 。

/**
 * 示例 1：
    输入：nums1 = [1,2,2,1], nums2 = [2,2]
    输出：[2]
 */
/**
 * 1.直接其中一个数组，找到其在另一个数组中包含的元素，最后去重
 * 2. 找出长度小的一个，并把另一个set保存起来，遍历小的看是否在大的里面，然后返回在大的里面的项，最后去重
 */
function intersection1(nums1: number[], nums2: number[]): number[] {
  return [...new Set(nums1.filter(item => nums2.includes(item)))];
};

function intersection(nums1: number[], nums2: number[]): number[] {
  if (nums1.length===0 || nums2.length===0) {
    return []
  }
  let arr = new Set<number>()
  let set = new Set<number>()
  if (nums1.length>nums2.length) {
    arr = new Set(nums2)
    set = new Set(nums1)
  } else {
    arr = new Set(nums1)
    set = new Set(nums2)
  }
  for (let item of arr) {
    if (!set.has(item)) {
      arr.delete(item)
    }
  }
  return [...arr]
};

console.log(intersection([1, 2, 2, 1], [2, 2]));
