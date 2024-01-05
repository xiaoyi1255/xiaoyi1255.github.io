function singleNumber(nums: number[]): number {
  const map = new Map<number, number>()
  nums.forEach(item => map.set(item, (map.get(item) || 0) + 1))
  let res = -1
  for (const [key, value] of map.entries()) {
    if(value === 1){
      res = key
      break
    }
  }
  return res
};

console.log(singleNumber([2, 2,3,2,3,3, 1])) // 1