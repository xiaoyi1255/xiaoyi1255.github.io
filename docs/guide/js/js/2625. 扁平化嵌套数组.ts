type MultiDimensionalArray = (number | MultiDimensionalArray)[];

const flat = function (arr: MultiDimensionalArray, n: number): MultiDimensionalArray {
  let res: MultiDimensionalArray = [];

  const flattening = (nums: MultiDimensionalArray, l: number) => {
    for (const num of nums) {
      if (Array.isArray(num) && l > 0) {
        flattening(num as MultiDimensionalArray, l - 1);
      } else {
        res.push(num);
      }
    }
  };

  flattening(arr, n);
  return res;
};

console.log(flat([[1, 2], [3, [4, [5, [6]]], 7], [8, 9, 10]], 3))