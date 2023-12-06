function commonChars(words: string[]): string[] {
  const result: string[] = []
  for (const i of words[0]) {
    const isCludes = words.every((item) => item.includes(i))
    if (isCludes) {
      result.push(i)
      words = words.map((item) => item.replace(i, ''))
    }
  }
  return result
};

// console.log(commonChars(["bella","label","roller"]))
console.log(commonChars(["bbddaabc","bacdbbaa","dbbddcdc","ddaddacd","cbbacbcc","acabdadb","cadcaacb","dbcacbbd"]))
// console.log(commonChars(["cool","lock","cook"]) )