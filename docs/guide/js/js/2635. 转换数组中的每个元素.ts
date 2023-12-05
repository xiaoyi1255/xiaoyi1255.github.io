function map(arr: number[], fn: (n: number, i: number) => number): number[] {
	const result: number[] = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(fn(arr[i], i));
  }
};

console.log(map([1, 2, 3], (n, i) => n + i));