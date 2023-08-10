/**
 * 类（Class）是一种用于创建对象的模板，它定义了对象的属性（字段）和方法（函数）。类允许您将数据和功能组合成一个独立的单元，这有助于实现抽象、封装和代码的模块化
 * 1. 类的定义
 * 2. 构造函数
 * 3.属性和方法
 * 4. 实例化
 * 5. 继承
 * 6. 抽象类
 */

void main() {
  // 1、类的声明
  var p1 = new Person(name: '小易', age: 18);
  var p2 = new Person.newConstructor('小易', 'codeing');
  Student student1 =
      new Student('Alice', 11, 'Computer Science', 'ABC High School');
  Student student2 = Student('Bob', 12, 'Physics', 'XYZ School');
  final name = student1.name; // "Alice"
  final major = student1.major; // 'Computer Science'

  // Action a1 = new Action(10, 20, '小易');
  // a1.jumpFn(); // I am Jump class
  // a1.actionFn(); // I am Action class
  // a1.height; // 10
  // a1.withs; // 20
  // a1.name; // 小易
  // a1.jumpNew(); // 222222
  // print(a1.height);
  // print(a1.withs);
  // print(a1.name); // 继承的

  // var ph1 = new Phone();
  // ph1._price; // 0
  // print(ph1._price);
  // ph1.set(2);
  // ph1._price; // 2
  // print(ph1._price);
}

// 抽象类
abstract class Poin {}

class Person {
  String name = '', habby = '';
  int age = 0;

  Person({required String name, required int age}) {
    this.name = name;
    this.age = age;
  }
  // 语法糖
  // Person(this.name, this.age);

  Person.newConstructor(String name, String habby) {
    this.name = name;
    this.habby = habby;
  }
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

class Draw {
  void drawFn() {
    print('I am Draw class');
  }
}

class Jump {
  String name = '';

  Jump(this.name);

  void jumpFn() {
    print('I am Jump class');
  }

  void jumpNew() => print('1111111');
}

class Action extends Jump {
  int height = 0;
  int withs = 0;
  // String name = '';
  Action(this.height, this.withs, String name) : super(name);

  void actionFn() {
    print('I am Action class');
  }

  // 重写父类 方法
  @override
  void jumpNew() => print('222222');
}

// getter setter

class Phone {
  int _price = 0;

  get() {
    return _price * 2;
  }

  set(newVal) {
    if (newVal != _price) {
      _price = newVal;
    }
  }
}
