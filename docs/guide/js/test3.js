const code = `console.log('Hello, world!');`;

eval(code);
new Function(code)();
const sc = document.createElement('script');
sc.innerHTML = code;
document.body.appendChild(sc);
sc.remove();
setTimeout(eval(code), 1000);