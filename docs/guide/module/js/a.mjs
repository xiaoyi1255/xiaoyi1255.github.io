// a.js
// const b = require('./b.js');
// console.log('a文件内访问b:', b);
// module.exports = {
//   foo: () => {
//     b.bar();
//   },
// };

import b from './b.mjs';
console.log('a文件内访问b:', b);
export default {
  foo: () => {
    b.bar();
  },
};