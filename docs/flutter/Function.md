---
title: Dart
titleTemplate: Function
---	

## 前言 {#前言}
### dart中的Function
* 分类：普通函数和箭头函数、匿名函数
* 参数类型 任意数据类型(包括函数)
* 函数没有自身this, 对象中的方法才有
* 参数：可选、可以有默认值
* 返回值：任意，也可以不返回
* dart中程序入口就是main函数

## 函数的分类 {#函数的分类}
* 普通函数 'String add(){ return ''}'
* 箭头函数 int add(a,b)=> a + b
* 匿名函数 Function add1 = (int a, int b) {return a + b;};
```dart
void main() {
  add(1, 2); // 3
  add1(1, 3); // 4
  add2(1, 4); // 5
}
// 普通函数
int add(int a, int b) {
  final res = a + b;
  print(res);
  return res;
}

//匿名函数
Function add1 = (int a, int b) {
  return a + b;
};

// 箭头函数
int add2(int a, int b) => a + b;

```

## 函数返回值 {#函数返回值}
* 函数没有返回值
* 函数有返回值
```dart
void main() {
  helloWorld(); // Hello woeld
  sayHello(); // Hello 小易
  hasReturn('含有返回值'); // this is 含有返回值
}
// 没有返回值
void helloWorld() {
  print("Hello woeld");
}
// 不太建议这么写，可读性差
sayHello() {
  print("Hello 小易");
}

// 含返回值
String hasReturn(String str) {
  return 'this is $str';
}
```


## 函数中的this {#函数中的this}
* 函数中没有this 注意会报错
* class 中才有this
```dart
void main() {
  fnThis(); // // Error: Expected identifier, but got 'this'.
  fnThis1(); // // Error: Expected identifier, but got 'this'.
  Coder p1 = new Coder('小易');
  p1.sayHello(); // I am 小易
}
void fnThis() {
  print(this); // Error: Expected identifier, but got 'this'.
}

void fnThis1() => print(this);  // Error: Expected identifier, but got 'this'.

// class 中才有this
class Coder {
  String name = '';
  Coder(this.name);

  void sayHello() {
    print('I am ${this.name}');
  }
}

```


## 函数不能使用new {#函数不能使用new}
* 函数不能被new, 强行new 会报错
* 点击源码看，就可以发现 Function 是一个抽象类
* abstract final class Function
```dart 
void main() {
  var xx = new newFn(); // Error: Couldn't find constructor 'newFn'.
}
String newFn() {
  return '函数不能被new';
}

```

## 函数参数 {#函数参数}
### 可选参数和必传参数
* 可选参数：在调用函数时，可以选择不传
* 必传参数：在调用函数时，必须传递

```dart 
void main() {
  fn1(2); // this is 2
  fn2(a: 11); // a is 11, str is null
  fn2(a: 1, str: 'abc'); // a is 1, str is abc
  fn3(11, '我是可选参数'); // a is 11, str is 我是可选参数

}

// 必传参数
void fn1(int a) {
  print('this is $a');
}

// 可选参数
void fn2({a, str}) {
  print('''
  a is $a, str is $str
''');
}

// 可选和 必传
void fn3(int a, [str]) {
  print('''
    a is $a, str is $str
  ''');
}

```

### 参数类型
* 参数类型 任意类型

```dart
void main() {
  fn4(10); // 10
  fn5('xiaoyi'); // xiaoyi
  fn6(false); // false
  fn7({"name": 'xiaoyi'}); // {name: xiaoyi}
  fn8({1, 2, 3}); // [x, y, z]
  fn9(['x', 'y', 'z']); // [x, y, z]
  fn10('33', cb); // 33
}

// int
void fn4(int n) => print(n);

// string
void fn5(String n) => print(n);

//bool
void fn6(bool n) => print(n);

//Map
void fn7(Map n) => print(n);

// Set
void fn8(Set n) => print(n);

// List
void fn9(List n) => print(n);

// dynamic, Function
void fn10(x, Function n) => print(n(x));
String cb(x) {
  return x;
}
```
## call {#call}
* 调用函数的时候还可以使用 fn.call()

```dart
fn9.call(['10', '2']); // [x, y, z]
fn9(['x', 'y', 'z']); // [x, y, z]

void fn9(List n) => print(n);

```

## 闭包 {#闭包}
* 闭包（closure）是一个函数以及其捆绑的周边环境状态（lexical environment，词法环境）的引用的组合。 换而言之，闭包让开发者可以从内部函数访问外部函数的作用域
* 【个人理解】：外层函数返回了内层函数，内层函数使用了外层函数的变量，并且在外层函数被调用时，被保存了起来，就会形参闭包

```dart
void main() {
  var res = closure();
  res(2); // number is 2
  res(4); // number is 6
  var res1 = closure();
  res1(4); // number is 4
}

Function closure() {
  num number = 0;
  return (num i) {
    number += i;
    print("number is $number");
  };
}
```

