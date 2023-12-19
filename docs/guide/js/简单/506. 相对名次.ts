/**
 * 1、定义前三名为一个数组，声明一个map存储 数组对应元素的下标
 * 2、 对原数组进行排序
 * 3、 遍历数组，分别替换为对应字符串，前三名外为索引+1
 * @param score 
 * @returns 
 */

function findRelativeRanks(score: number[]): string[] {
  const gold = ["Gold Medal","Silver Medal","Bronze Medal"]
  const res: string[] = [];
  let map = new Map<number, number>()

  for (let i = 0; i < score.length; i++) {
    map.set(score[i], i)
  }
  score.sort((a, b) => b - a);
  for (let i = 0; i < score.length; i++) {
    if (i < 3) {
      res[map.get(score[i]) as number] = gold[i]
    } else {
      res[map.get(score[i]) as number] = (i + 1).toString()
    }
  }
  return res;
};

console.log(findRelativeRanks([5,4,9,2,1]));