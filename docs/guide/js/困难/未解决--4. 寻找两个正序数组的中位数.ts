/**
 * 时间复杂度 O(n)
 * @param nums1 
 * @param nums2 
 * @returns 
 */
function findMedianSortedArrays1(nums1: number[], nums2: number[]): number {
  const arr = [...nums1, ...nums2].sort((a, b) => a - b);
  let isOdd = arr.length % 2 === 0;
  return isOdd ? (arr[arr.length / 2] + arr[arr.length / 2 - 1]) / 2 : arr[Math.floor(arr.length / 2)];
};


function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  let len = nums1.length + nums2.length;
  let mid1 = len / 2
  let isOdd = len % 2 === 0;
  let arr: number[] = [];
  let i = 0;
  let j = 0;
  while (i < nums1.length || j < nums2.length) {
    if ((nums2[j] && nums1[i] > nums2[j]) || !nums1[i]) {
      arr.push(nums2[j] || 0);
      j++
    } else if ((nums1[i] && nums1[i] < nums2[j]) || !nums2[j]) {
      arr.push(nums1[i] || 0);
      i++
    }
    if (isOdd && arr.length === mid1 +1) {
      return (arr[mid1 - 1] + arr[mid1])/2;
    } else if (!isOdd && arr.length === Math.floor(mid1) +1) {
      return arr[Math.floor(mid1)];
    }
  }
  return 0
};

console.log(findMedianSortedArrays([1, 2], [3, 4]));
console.log(findMedianSortedArrays([1, 2], [3]));