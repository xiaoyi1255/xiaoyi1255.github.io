/**
给你一个长度为 n 的整数数组 nums ，其中 nums 的所有整数都在范围 [1, n] 内，且每个整数出现 一次 或 两次 。请你找出所有出现 两次 的整数，并以数组形式返回。

你必须设计并实现一个时间复杂度为 O(n) 且仅使用常量额外空间的算法解决此问题。

 */
function findDuplicates(nums: number[]): number[] {
    const set = new Set()
    let res:number[] = []
    for(let i = 0; i < nums.length; i++) {
        if(!set.has(nums[i])) {
          set.add(nums[i])
        } else {
          res.push(nums[i])
        }
    }
    console.log(res)
    return res
};
findDuplicates([4,3,2,7,8,2,3,1])