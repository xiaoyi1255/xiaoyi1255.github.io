function countSeniors(details: string[]): number {
  let count = 0;
  for (const val of details) {
    let year = val.slice(-4, -2);
    +year > 60 ? count++ : '';
  }
  return count;
};

console.log(countSeniors(["7868190130M7522", "5303914400F9211", "9273338290F4010"]))