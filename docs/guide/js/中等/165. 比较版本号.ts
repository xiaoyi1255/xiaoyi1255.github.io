/**
 * 1、version1>version2 返回1
 * 2、version1<version2 返回-1
 * 3、version1=version2 返回0
 * 4、 前置0 忽略 => 1.0001 和 1.1 相等
 * @param version1 
 * @param version2 
 * 解题思路：
 * 1、先分别通过. 把字符串拆分成数组， 数组元素转成数字（前置0去除）
 * 2、遍历次数为两数组中长度大的，
 * 3、数组元素不存在 则为0，分别对应比较，最后返回比较结果
 */
function compareVersion(version1: string, version2: string): number {
  const v1 = version1.split('.').map(Number);
  const v2 = version2.split('.').map(Number);
  let maxLen = Math.max(v1.length, v2.length)
  for (let i = 0; i < maxLen; i++) {
    const num1 = v1[i] || 0;
    const num2 = v2[i] || 0;
    if (num1 > num2) {
      return 1;
    }
    if (num1 < num2) {
      return -1;
    }
  }
  return 0;
};

console.log(compareVersion("1.01", "1.001")) // 0
console.log(compareVersion("1.01", "1.001.1")) // 0