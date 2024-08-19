define(function(require) {
  const a = require('./a');
  console.log(a.message);
  return {
    message: 'app.js',
    obj: {
      name: 'obj'
    }
  }
});