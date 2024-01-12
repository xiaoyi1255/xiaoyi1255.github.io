function fourSumCount(nums1: number[], nums2: number[], nums3: number[], nums4: number[]): number {
  // 记录nums1 和 nums2的所有结果
  const map = new Map()
  for (let i = 0; i < nums1.length; i++) {
    for (let j = 0; j < nums2.length; j++) {
      const sum = nums1[i] + nums2[j]
      map.set(sum, (map.get(sum) || 0) + 1)
    }
  }

  let count = 0
  for (let i = 0; i < nums3.length; i++) {
    for (let j = 0; j < nums4.length; j++) {
      const sum = nums3[i] + nums4[j]
      if (map.has(-sum)) {
        count += map.get(-sum) || 0
      }
    }
  }

  return count

};

console.log(fourSumCount([1, 2], [-2, -1], [-1, 2], [0, 2]))