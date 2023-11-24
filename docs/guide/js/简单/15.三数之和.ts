// 给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[left], nums[right]] 满足 i != j、i != right 且 left != right ，同时还满足 nums[i] + nums[left] + nums[right] == 0 。请

// 你返回所有和为 0 且不重复的三元组。

// 注意：答案中不可以包含重复的三元组。





// 示例 1：

// 输入：nums = [-1,0,1,2,-1,-4]
// 输出：[[-1,-1,2],[-1,0,1]]
// 解释：
// nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。
// nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。
// nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。
// 不同的三元组是 [-1,0,1] 和 [-1,-1,2] 。
// 注意，输出的顺序和三元组的顺序并不重要。
// 示例 2：

// 输入：nums = [0,1,1]
// 输出：[]
// 解释：唯一可能的三元组和不为 0 。
// 示例 3：

// 输入：nums = [0,0,0]
// 输出：[[0,0,0]]
// 解释：唯一可能的三元组和为 0 。

/**
 * 1、先排序、使用双指针进行遍历
 * 2、找到L+R+target =0，添加进数组
 * 3、外循环大于0即可返回结果，因为排好序了，3个正整数之和一点不为0
 * 4、L+R+target<0 左指针右移
 * 5、L+R+target>0 右指针左移
 * 6、最后就是去重，声明一个set来记录已添加的L的值，存在就不添加了
 */

function threeSum1(nums: number[]): number[][] {
  const res: number[][] = [];
  if (nums.length < 3) return res;
  const set = new Set<string>();
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === nums[i - 1]) continue;
    const cur = nums[i];
    if (cur > 0) return res
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      const sum = cur + nums[left] + nums[right];
      if (sum === 0) {
        const val = [nums[left], cur, nums[right]].sort((a, b) => a - b);
        const str = val.join(',');
        if (!set.has(str)) {
          res.push(val)
          set.add(str)
        }
        left++;
        right--;
      }  else {
        sum < 0 ? left++:  right--
      }
    }
  }
  return res;
};

function threeSum(nums: number[]): number[][] {
  const res: number[][] = [];
  if (nums.length < 3) return res;
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] > 0) break; // 当前数字大于0，后面的数字不可能使得和为0
    if (i > 0 && nums[i] === nums[i - 1]) continue; // 跳过相同的数字

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        const triplet = [nums[i], nums[left], nums[right]];
        res.push(triplet);

        left++;
        right--;

        while (left < right && nums[left] === nums[left - 1]) left++; // 跳过相同的数字
        while (left < right && nums[right] === nums[right + 1]) right--; // 跳过相同的数字
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }

  return res;
}

console.log(threeSum([-1, 0, 1, 2, -1, -4]));
console.log(threeSum([3, -2, 1, 0]));
console.log(threeSum([0, 0, 0]));
console.log(threeSum([1, 2, -2, -1]));