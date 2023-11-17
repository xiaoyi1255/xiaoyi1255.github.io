/**
 * 统计字符串中的单词个数，这里的单词指的是连续的不是空格的字符。
  请注意，你可以假定字符串里不包括任何不可打印的字符。
 */

function countSegments(s: string): number {
  return s.split(/\s+/).filter(item => !!item).length;
};

console.log(countSegments("Hello, my name is John"));