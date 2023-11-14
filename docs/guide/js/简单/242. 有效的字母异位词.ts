/**
 * 给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。
注意：若 s 和 t 中每个字符出现的次数都相同，则称 s 和 t 互为字母异位词。
  1. 使用map记录出现次数，比较出现次数是否相同
  2. 直接排序，对位比较
 * @param s 
 * @param t 
 */

function isAnagram1(s: string, t: string): boolean {
  if (s.length !== t.length) return false;

  const map = new Map<string, number>();
  const map2 = new Map<string, number>();
  for (let i = 0; i < s.length; i++) {
    map.set(s[i], (map.get(s[i]) || 0) + 1);
  }
  for (let i = 0; i < t.length; i++) {
    if (!map.has(t[i])) return false;
    map2.set(t[i], (map2.get(t[i]) || 0) + 1);
  }

  for (let [key, value] of map) {
    if (!map2.has(key) || map2.get(key) !== value) return false;
  }
  return true;
};

function isAnagram2(s: string, t: string): boolean {
  if (s.length !== t.length) return false;

  let _s = s.split('').sort();
  let _t = t.split('').sort();
  for (let i = 0; i < s.length; i++) {
    if (_s[i] !== _t[i]) return false;
  }
  return true;
};

function isAnagram3(s: string, t: string): boolean {
  if (s.length !== t.length) return false;
  return [...s].sort().join('') === [...t].sort().join('');
};

function isAnagram4(s: string, t: string): boolean {
  if (s.length !== t.length) return false;
  for (let i = 0; i < s.length; i++) {
    if (t.includes(s[i])) {
      t = removeCharAt(t, t.indexOf(s[i]));
    }
  }
  function removeCharAt(str: string, index: number) {
    return str.slice(0, index) + str.slice(index + 1);
  }
  return t.length === 0;
};

function isAnagram5(s: string, t: string): boolean {
  if (s.length !== t.length) return false;
  const map = new Map();
  for (let i = 0; i < s.length; i++) {
    map.set(s[i], (map.get(s[i]) || 0) + 1);
  }
  for (let i = 0; i < t.length; i++) {
    if (!map.has(t[i])) {
      return false;
    } else {
      map.set(t[i], map.get(t[i]) - 1);
    }
  }
  let flag = true
  map.forEach((value,key) => {
    if (value !== 0) return flag = false;
  })
  return flag;
};

function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;
  const map = new Map();
  for (let i = 0; i < s.length; i++) {
    map.set(s[i], (map.get(s[i]) || 0) + 1);
  }
  for (let i = 0; i < t.length; i++) {
    if (!map.has(t[i])) {
      return false;
    } else {
      if (map.get(t[i]) === 1) {
        map.delete(t[i]);
      } else {
        map.set(t[i], map.get(t[i]) - 1);
      }
    }
  }

  return map.size === 0;
};
console.log(isAnagram('anagram', 'nagaram'));
console.log(isAnagram('rat', 'car'));
console.log(isAnagram('aacc', 'ccac'));