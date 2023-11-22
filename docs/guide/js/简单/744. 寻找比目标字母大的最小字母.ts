function nextGreatestLetter(letters: string[], target: string): string {
  for (let i = 0, len=letters.length; i < len; i++) {
    if (letters[i] > target) {
      return letters[i];
    }
  }
  return letters[0];
};

console.log(nextGreatestLetter(["c", "f", "j"], "a"));