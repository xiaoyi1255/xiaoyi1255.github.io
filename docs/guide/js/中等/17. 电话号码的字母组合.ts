function letterCombinations1(digits: string): string[] {
  const map = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };
  const result: string[] = [];
  if (digits.length === 0) return result;
  backtrack(digits, 0, "", result);
  return result;
  function backtrack(digits: string, index: number, combination: string, result: string[]) {
    if (index === digits.length) {
      result.push(combination);
      return;
    }
    const letters = map[digits[index]];
    for (let i = 0; i < letters.length; i++) {
      backtrack(digits, index + 1, combination + letters[i], result);
    }
  }
};

function letterCombinations(digits: string): string[] {
  const map = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };
  const res: string[] = [];
  if (digits.length === 0) return res;
  backtrack(digits, 0, []);
  function backtrack(digits: string, index: number, result: string[]=[]) {
    if (index === digits.length) { // 终止条件 组合的长度==数字的个数
      res.push(result.join(''));
      return;
    }
    let curr = map[digits[index]]; // 当前数字 对应的字母
    for (let i = 0; i < curr.length; i++) {
      result.push(curr[i]); // 把当前字母加入组合
      backtrack(digits, index + 1, result); // 递归
      result.pop(); // 回溯，删除最后一个字母
    }
  }
  return res;
};

console.log(letterCombinations("23"));
console.log(letterCombinations("236"));