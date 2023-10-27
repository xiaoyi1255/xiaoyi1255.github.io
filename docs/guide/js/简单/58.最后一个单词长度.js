/**
 * @param {string} s
 * @return {number}
 * 返回最后一个单词的长度
 */
var lengthOfLastWord = function(s='') {
  // return s.trimEnd().split(/\s+/).pop().length;
  return s.trim().split(' ').pop().length;
};


var lengthOfLastWord = function(s='') {
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

// 优化版

var lengthOfLastWord = function(s = '') {
  s = s.trim(); // 去除首尾空格
  let len = 0;

  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] !== ' ') {
      len++;
    } else {
      break; // 遇到空格就退出循环
    }
  }

  return len;
};
