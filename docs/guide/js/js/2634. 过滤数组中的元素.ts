type Fn = (n: number, i:number) => any

function filter(arr: number[], fn: Fn): number[] {
	const result: number[] = [];
  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i], i)) {
      result.push(arr[i]);
    }
    
  }
  return result;
};

console.log(filter([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], (n) => n>3))