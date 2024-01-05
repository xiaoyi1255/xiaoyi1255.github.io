class Solution {
  private nums: number[];
  private original: number[];
  constructor(nums: number[]) {
    this.nums = nums;
    this.original = nums.slice();
  }

  reset(): number[] {
    this.nums = this.original.slice();
    return this.nums;
  }

  shuffle(): number[] {
    let res: number[] = [];
    while (this.nums.length > 0) {
      let index = Math.floor(Math.random() * this.nums.length);
      res.push(this.nums[index]);
      this.nums.splice(index, 1);
    }
    this.nums = res;
    return this.nums;
  }
}