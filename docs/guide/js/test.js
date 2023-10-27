/**
 * 观察者模式：
 * 一个主题可以被多个观察者订阅 =》 一对多
 * 主题更新：所有订阅改主题的都对更新
 */

// 主题
class Subject {
  constructor() {
    this.observers = [];
  }

  // 订阅主题
  register(observer) {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }
  // 取消订阅
  remove(observer) {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }
  // 通知所有订阅者
  notify(info) {
    this.observers.forEach(observer => observer.update(info));
  }
}

// 观察者
class Observer {
  constructor(name) {
    this.name = name;
  }

  update(info) {
    console.log(`${this.name} 收到主题更新消息~${info}`);
  }
}
// 实例主题对象
const sub = new Subject();
// 实例订阅者
const ob1 = new Observer('ob1');
const ob2 = new Observer('ob2');

// 订阅主题
sub.register(ob1);
sub.register(ob2);
sub.register(ob2);

// 主题发布广播事件
sub.notify('语雀有福利');

// 取消订阅主题
sub.remove(ob2);

// 主题发布广播事件
sub.notify('免费领取六个月会员');

// 删除数组重复项
/**
 * 
 * @param {*} nums []
 * @returns nums.length
 * 数组已经是排好序的，说明左边永远小于或等于右边元素
 * 判断num[i] == num[i+1] 就删除当前
 * i--是为了如果相邻且相等，splice之后会跳过下一个
 */
function removeDuplicates(nums=[]) {
  for (let i = 0; i < nums.length; i++) {
    const item = nums[i];
    if (item === nums[i + 1]) {
      nums.splice(i, 1);
      i--;
    }
  }
  return nums.length;
};
// removeDuplicates([1,1,1,2,3])

// 删除指定元素，返回数组长度
/**
 * 
 * @param {*} nums 
 * @param {*} val 
 * @returns 
 * 遍历数组，元素等于指定元素就删除
 * i-- 是为了不漏比较
 */
var removeElement = function(nums=[], val) {
  for (let i = 0, len=nums.length; i < len; i++) {
    if (nums[i] === val) {
      nums.splice(i, 1);
      i--;
    }
  }
  return nums.length;
};

// removeElement([0,1,2,2,3,0,4,2], 2)

// 找出字符串中第一个匹配的下标


/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 * 妈呀现成的api => indexOf
 */
var strStr = function(haystack='', needle='') {
  // return haystack.indexOf(needle); 现成的轮子能不用么？？？
  if (needle === '') return 0;
  if (haystack === '') return -1;
  for (let i = 0, len = haystack.length; i < len; i++) {
    if (haystack[i] === needle[0]) { // 判断第一个字母相等 截取子串长度，与子串对比
      if (haystack.substr(i, needle.length) === needle) {
        return i;
      }
    }
  }
  return -1;
};

// strStr('hello', 'll')

// 搜索插入位置

// /**
//  * 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。
//  * 请必须使用时间复杂度为 O(log n) 的算法。
//  */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 * 先查是否存在这个元素，不存在找到比他大的项，插入它前面 (性能不佳)
 * 1. 遍历 
 */
var searchInsert = function(nums=[], target) {
  if (nums.length === 0) {
    nums.push(target)
    return 0;
  }
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === target) {
      return i;
    } else if (nums[i] > target) {
      nums.splice(i, 0, target);
      return i;
    } else if (i === nums.length-1 && nums[i] < target) {
      nums.push(target);
      return nums.length - 1
    }  
  }
  return -1;
};
// 因为数组是排好序的，所以大可以使用二分法去找
var searchInsert1 = function(nums=[], target) {
  let left = 0;
  let right = nums.length;
  while (left < right) {
    let mid = Math.floor((left + right) /2) + left;
    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return left;
}

// searchInsert1([1,3,5,6], 5)

/**
 * @param {string} s
 * @return {number}
 * 返回最后一个单词的长度
 */
var lengthOfLastWord = function(s='') {
  // return s.trim().split(' ').pop().length;
  // return s.trimEnd().split(/\s+/).pop().length;

  s = s.trim()
  if (s.indexOf(' ') === -1) {
    return s.length;
  }
  let len = 0;
  for (let i = s.length-1; i >0; i--) {
    if (s[i] !== ' ') {
      len++;
    } else {
      return len;
    }
  }
  return len;
};

/**
 * @param {number[]} digits
 * @return {number[]}
 * 加一 数字数组+1， 考虑js最大有效数字 2^53 -1
 */
var plusOne = function(digits) {
  // return (String(Number(digits.join('')) +1)).split('') // bigin类型的计算不了
  // return (BigInt(digits.join('')) + 1n).toString().split('');
  let len = digits.length;
  let resArr = [];
  let carry = 1;

  for (let i = len-1; i >=0; i--) {
    let sum = digits[i] + carry;
    if (sum >= 10) {
      if (i===0) {
        resArr.unshift(1, 0);
      } else {
        resArr.unshift(sum-10);
        carry = 1;
      }
    } else{
      resArr.unshift(sum);
      carry = 0;
    }
  }
  console.log(resArr)
  return resArr
};

var plusOne = function(digits) {
  let carry = 1; // 初始进位设为1
  for (let i = digits.length - 1; i >= 0; i--) {
    let sum = digits[i] + carry;
    if (sum >= 10) {
      digits[i] = sum - 10;
      carry = 1; // 有进位
    } else {
      digits[i] = sum;
      carry = 0; // 无进位
      break; // 提前结束循环，无需继续进位
    }
  }
  
  // 如果循环结束后还有进位，需要在数组头部插入一个1
  if (carry) {
    digits.unshift(1);
  }
  
  return digits;
};

var plusOne = function(digits) {
  let carry = 1;

  for (let i = digits.length - 1; i >= 0 && carry > 0; i--) {
    const sum = digits[i] + carry;
    digits[i] = sum % 10;
    carry = Math.floor(sum / 10);
  }

  if (carry > 0) {
    digits.unshift(carry);
  }

  return digits;
};

plusOne([9])