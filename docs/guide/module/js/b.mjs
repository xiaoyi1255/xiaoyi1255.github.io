// // b.js
// const a = require('./a.js');
// console.log('b文件内访问a: ', a);
// module.exports = {
//   bar: () => {
//     a.foo();
//   },
// };

// b.js
import a from './a.mjs';
setTimeout(() => {
  console.log('b文件内访问a: ', a);
}, 1000)
export default {
  bar: () => {
    a.foo();
  },
};