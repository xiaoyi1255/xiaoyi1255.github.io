function getType(value) {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if(typeof value === 'object' || typeof value === 'function') {
    const typeString = Object.prototype.toString.call(value);
    return typeString.slice(8, -1);
  }
  return typeof value;
}

console.log(getType(NaN)); // "null"

let arr1 = Array.of(1, 2, 3); // [1, 2, 3]
let arr2 = Array.of(undefined); // [undefined]
let arr3 = Array.of('1'); // [1]

console.log(arr1, arr2, arr3);

console.log(0.1+0.2)


function _new(fn, ...args) {
  const obj = Object.create(null);
  const res = fn.apply(obj, args);
  return res instanceof Object ? res : obj;
}