(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD 模块系统 (RequireJS)
    define(factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS 模块系统 (Node.js)
    module.exports = factory();
  } else {
    // 作为全局变量暴露
    root.myModule = factory();
  }
}(this, function () {
  // 模块代码
  const message = "Hello, UMD!";

  return {
    getMessage: function () {
      return message;
    }
  };
}));
