function sum(...args) {
  let result = args.reduce((prev, cur) => prev + cur, 0);
  function fn(...nextArgs) {
    if (nextArgs.length === 0) {
      return result;
    }
    result += nextArgs.reduce((prev, cur) => prev + cur, 0);
    return fn;
  }
  return fn;
}

const a = sum(1, 2, 3)([3])();
const b = sum(1, 2, 3)(2, 7)();

console.log('a', a);
console.log('b', b);