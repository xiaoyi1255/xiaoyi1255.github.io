/**
 Do not return anything, modify nums1 in-place instead.
 */
function merge(nums1: number[], m: number, nums2: number[], n: number) {
  nums2.splice(n);
  nums1.splice(m, nums1.length - m, ...nums2)
  nums1.sort((a, b) => a - b)
  return nums1;
};


console.log(merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6, 0], 3))