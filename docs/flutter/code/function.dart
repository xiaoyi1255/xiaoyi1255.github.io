/**
 *  Function 普通函数和箭头函数
 *  不能使用关键字 new
 *  参数可以是任意类型包括函数
 *  函数和箭头函数明天this, class中this是实例
 *  形参 可以有默认值
 *  形参可选
 */

void main() {
  // helloWorld(); // Hello woeld
  // sayHello(); // Hello 小易
  // hasReturn('含有返回值'); // this is 含有返回值
  // add(1, 2); // 3
  // add1(1, 3); // 4
  // add2(1, 4); // 4
  // print(add2(1, 4));
  // fnThis(); // // Error: Expected identifier, but got 'this'.
  // fnThis1(); // // Error: Expected identifier, but got 'this'.
  // Coder p1 = new Coder('小易');
  // p1.sayHello(); // I am 小易
  // var xx = new newFn(); // Error: Couldn't find constructor 'newFn'.

  // fn1(2); // this is 2
  // fn2(a: 11); // a is 11, str is null
  // fn2(a: 1, str: 'abc'); // a is 1, str is abc
  // fn3(11); // a is 11, str is null
  // fn3(11, '我是可选参数'); // a is 11, str is 我是可选参数
  // fn4(10); // 10
  // fn5('xiaoyi'); // xiaoyi
  // fn6(false); // false
  // fn7({"name": 'xiaoyi'}); // {name: xiaoyi}
  // fn8({1, 2, 3}); // [x, y, z]
  // fn9(['x', 'y', 'z']); // [x, y, z]
  // fn10('33', cb); // 33
  // fn9.call(['10', '2']);

  var res = closure();
  res(2); // number is 2
  res(4); // number is 6
  var res1 = closure();
  res1(4); // number is 4
}

int add(int a, int b) {
  return a + b;
}

Function add1 = (int a, int b) {
  return a + b;
};

int add2(int a, int b) => a + b;

void helloWorld() {
  print("Hello woeld");
}

sayHello() {
  print("Hello 小易");
}

String hasReturn(String str) {
  return 'this is $str';
}

// 函数没有this
void fnThis() {
  // print(this); // Error: Expected identifier, but got 'this'.
}

// void fnThis1() => print(this);

// class 可以使用new
class Coder {
  String name = '';
  Coder(this.name);

  void sayHello() {
    print('I am ${this.name}');
  }
}

// 函数不能使用new
String newFn() {
  return '函数不能被new';
}

/**
 * 函数 参数
 * 参数可选
 * 参数默认值
 * 参数：任意类型
 *  
 */

void fn1(int a) {
  print('this is $a');
}

void fn2({a, str}) {
  print('''
  a is $a, str is $str
''');
}

void fn3(int a, [str]) {
  print('''
    a is $a, str is $str
  ''');
}

// 参数类型
void fn4(int n) => print(n);
void fn5(String n) => print(n);
void fn6(bool n) => print(n);
void fn7(Map n) => print(n);
void fn8(Set n) => print(n);
void fn9(List n) => print(n);
void fn10(x, Function n) => print(n(x));
String cb(x) {
  return x;
}

Function closure() {
  num number = 0;
  return (num i) {
    number += i;
    print("number is $number");
  };
}
