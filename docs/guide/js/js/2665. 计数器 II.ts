type ReturnObj = {
  increment: () => number,
  decrement: () => number,
  reset: () => number,
}

function createCounter(init: number): ReturnObj {
  let counter = init;
  return {
    increment: () => ++counter,
    decrement: () => --counter,
    reset: () => counter = init,
  }
};
const obj = createCounter(0);

console.log(obj.increment())
console.log(obj.decrement())