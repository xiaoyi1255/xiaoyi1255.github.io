---
title: Dart 语法
titleTemplate: class
---	

## 前言 {#前言}
* 类（Class）是一种用于创建对象的模板，它定义了对象的属性（字段）和方法（函数）。类允许您将数据和功能组合成一个独立的单元，这有助于实现抽象、封装和代码的模块化

## class的声明 {#class的声明}
* 下面是一个简单的 Person 类的定义
* 包含 name 和 age 属性 及 构造函数
* 抽象类 不能被实例化 常用于声明接口方法、有时也会有具体的方法实现。
```dart
class Person {
  String name = '';
  int age = 0;

  Person(String name, int age) {
    this.name = name;
    this.age = age;
  }
}
// 抽象类 不能被实例化，
abstract class Poin{}

```

## constructor {#constructor}
* 构造函数：
* 默认构造函数
* 具名构造函数
* 语法糖
### 默认构造函数

```dart
class Person {
  String name = '', habby = '';
  int age = 0;

  // 默认构造函数 和类型相同
  Person(String name, int age) {
    this.name = name;
    this.age = age;
  }

}


```
### 具名构造函数
```dart
class Person {
    // 属性
  String name = '', habby = '';
  int age = 0;
  // 具名构造函数 使用 new Person.newConstructor('', '')
  Person.newConstructor(String name, String habby) {
    this.name = name;
    this.habby = habby;
  }
}
```

### 构造函数语法糖
```dart
class Person {
  String name = '', habby = '';
  int age = 0;

  // 构造函数 语法糖
  Person(this.name, this.age);

   // 等价于下面这种写法
  // Person(String name, int age) {
  //   this.name = name;
  //   this.age = age;
  // }

}
```

## 属性和方法 {#属性和方法}
### 属性和方法
* 下面是一个学生类
* 属性：name grade major school
* 方法：printInfo 打印学生信息
* 类的属性和方法都可以通过实例化处理的对象访问
```dart
class Student {
  // 属性
  String name = '';
  int grade = 1;
  String major = '';
  String school = '';

  // 构造函数
  Student(String name, int grade, String major, String school) {
    this.name = name;
    this.grade = grade;
    this.major = major;
    this.school = school;
  }

  // 方法：打印学生信息
  void printInfo() {
    print('Name: $name');
    print('Grade: $grade');
    print('Major: $major');
    print('School: $school');
  }
}

```
### 静态属性和静态方法
* 静态属性和静态方法 只能通过类名访问 Student.xxx
* 需要使用static 关键字标识

```dart
class Student {
	...
  // 静态属性
  static int totalStudents = 0;

  // 静态方法
  static void printTotalStudents() {
    print('Total students: $totalStudents');
  }
	...
}
// 在外面访问访问
Student.printTotalStudents();
Student.totalStudents;

```

## 实例化 {#实例化}
* new ClassName()
* 2.0后面的版本就可以省略new关键字了
* 实例化对象

```dart
void main() {
  Student student1 =
      new Student('Alice', 11, 'Computer Science', 'ABC High School');
  Student student2 = Student('Bob', 12, 'Physics', 'XYZ School');

	final name = student1.name; // "Alice"
  final major = student1.major; // 'Computer Science'
}

class Student {
  String name = '';
  int grade = 1;
  String major = '';
  String school = '';

  // 静态属性
  static int totalStudents = 0;

  // 构造函数
  Student(String name, int grade, String major, String school) {
    this.name = name;
    this.grade = grade;
    this.major = major;
    this.school = school;
  }

  // 方法：打印学生信息
  void printInfo() {
    print('Name: $name');
    print('Grade: $grade');
    print('Major: $major');
    print('School: $school');
  }

  // 静态方法
  static void printTotalStudents() {
    print('Total students: $totalStudents');
  }
}
```
## 继承 {#继承}
* extends 关键字实现继承
```dart
void main() {
	Action a1 = new Action();
  a1.jumpFn(); // I am Jump class
  a1.actionFn(); // I am Action class
}

class Jump {
  void jumpFn() {
    print('I am Jump class');
  }
}

class Action extends Jump {}

```
### 继承的父类存在构造函数
```dart
void main() {
	Action a1 = new Action(10, 20, '小易');
  a1.jumpFn(); // I am Jump class
  a1.actionFn(); // I am Action class
  a1.height; // 10
  a1.withs; // 20
  a1.name; // 小易
}

class Jump {
  String name = '';

  Jump(this.name);

  void jumpFn() {
    print('I am Jump class');
  }
}

class Action extends Jump {
  int height = 0;
  int withs = 0;
  // String name = '';
  Action(this.height, this.withs, String name) : super(name);

  void actionFn() {
    print('I am Action class');
  }
}
```

## 重写父类方法override {#重写父类方法override}

```dart
void main() {
  Action a1 = new Action();
  a1.jumpNew(); // 222222
}

abstract class Jump {
  void jumpNew() => print('1111111');
}

class Action extends Jump {

  // 重写父类 方法
  @override
  void jumpNew() => print('222222');
}
```

## getter和setter {#getter和setter}
* getter和setter就是对属性访问和设置进行拦截及自定义返回
```dart
void main() {
  var ph1 = new Phone();
  ph1._price; // 0
  ph1.set(2);
  ph1._price; // 4
}

class Phone {
  int _price = 0;

  get() {
    return _price;
  }

  set(newVal) {
    if (newVal != _price) {
      _price = newVal;
    }
  }
}
```