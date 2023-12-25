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

console.log(letterCombinations("23"));