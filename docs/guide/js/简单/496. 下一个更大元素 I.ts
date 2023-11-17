// 496. 下一个更大元素 I
/**
 * 示例 1：
输入：nums1 = [4,1,2], nums2 = [1,3,4,2].
输出：[-1,3,-1]
解释：nums1 中每个值的下一个更大元素如下所述：
  - 4 用加粗斜体标识，nums2 = [1,3,4,2]。不存在下一个更大元素，所以答案是 -1 。
  - 1 用加粗斜体标识，nums2 = [1,3,4,2]。下一个更大元素是 3 。
  - 2 用加粗斜体标识，nums2 = [1,3,4,2]。不存在下一个更大元素，所以答案是 -1 。
 */
/**
 * 
 * @param nums1 
 * @param nums2 
 * @returns 
 * 遍历子集数组，
 */
function nextGreaterElement(nums1: number[], nums2: number[]): number[] {
  const res: number[] = [];
  let hasMax = false;
  for (const item of nums1) {
    hasMax = false;
    const index = nums2.indexOf(item);
    if (index !== -1 && index !== nums2.length - 1) {
      for (let i = index; i < nums2.length; i++) {
        if (nums2[i] > item) {
          hasMax = true
          res.push(nums2[i]);
          break;
        }
      }
    }
    !hasMax && (res.push(-1));
  }
  return res;
};

console.log(nextGreaterElement([4, 1, 2], [1, 3, 4, 2])); // [-1,3,-1]