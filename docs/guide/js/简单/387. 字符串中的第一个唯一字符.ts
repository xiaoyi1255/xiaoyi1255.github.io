// 给定一个字符串 s ，找到 它的第一个不重复的字符，并返回它的索引 。如果不存在，则返回 -1 。

/**
 * 用一个map存数组元素出现的次数
 * 然后遍历map 找到第一个出现为1的key 在原字符串中的位置并返回
 * @param s 
 * @returns 
 */

function firstUniqChar1(s: string): number {
  let len = s.length
  const map = new Map()
  const _s = s.substring(0)
  for (let i = 0; i < len; i++) {
    if (map.has(_s[i])) {
      s = s.replaceAll(_s[i], '')
      map.delete(_s[i])
    } else {
      map.set(_s[i], i)
    }
  }
  return map.size === 0 ? -1 : _s.indexOf(s[0])
}

function firstUniqChar2(s) {
  const charCount = new Map();

  for (let char of s) {
    charCount.set(char, (charCount.get(char) || 0) + 1);
  }

  for (let i = 0; i < s.length; i++) {
    if (charCount.get(s[i]) === 1) {
      return i;
    }
  }

  return -1;
}

function firstUniqChar(s) {
  const charCount = new Map();

  for (let char of s) {
    charCount.set(char, (charCount.get(char) || 0) + 1);
  }

  for (const item of [...charCount.entries()]) {
    if (item[1] === 1) {
      return s.indexOf(item[0]);
    }
  }
  return -1;
}
console.log(firstUniqChar('loveleetcode'));
console.log(firstUniqChar('aabb'));
console.log(firstUniqChar('aabbcdefff'));