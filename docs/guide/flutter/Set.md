---
title: Dart 语法
titleTemplate: Set
---				

## 前言 {#前言}
* Set 是一种集合数据结构，用于存储一组唯一的元素，其中重复的元素将被自动忽略。与 List 不同，Set 中的元素没有固定的顺序

## 常用属性 {#常用属性}
* length 长度
* first 第一项
* last 最后一项
* isEmpty 空
* isNotEmpty 不为空
* runtimeType 类型

```dart
Set<int> s1 = {1, 2, 3};
  final len = s1.length; // 3
  final first = s1.first; // 1
  final last = s1.last; // 3
  final isEmpty = s1.isEmpty; // false
  final isNotEmpty = s1.isNotEmpty; // true
  final runtimeType = s1.runtimeType; //  _Set<int>
```
## 增删查 {#增删查}
* add\addAll 新增
* remove、removeAll、removeWhere 删除
* elementAt(index) 查
* clear() 清空
* Set 本身是不会重复的所以一般不存在改，要么新增 要么删除

```dart
  Set<int> s1 = {1, 2, 3};
  // 新增
  s1.add(4); // {1, 2, 3, 4}
  s1.addAll({5, 6}); // {1, 2, 3, 4, 5, 6}
  s1.remove(6); // {1, 2, 3, 4, 5}
  s1.removeAll({1, 2}); // {3, 4, 5}
  s1.removeWhere((item) => item < 4); // {4, 5}
  s1.elementAt(0); // 4
  s1.clear(); // {}
```

## 常用循环 {#常用循环}
* map 返回新对象
* every 是否每一项都满足条件 返回 bool
* any 任意一项满足条件 返回 bool
* fold(initval, (pre.cur)=> pre+xur) 带初始值做累加累乘等
* reduce( (pre.cur)=> pre+xur) 做累加累乘等
* for 循环 set.elementAt(index)
* for in 循环

```dart 
  Set<int> s1 = {1, 2, 3};
  s1.forEach(print); // 1 2 3
  final s2 = s1.map((e) => e * 2).toSet(); // {2, 4, 6}
  bool b1 = s1.every((element) => element > 0); // true
  bool b2 = s1.any((element) => element > 2); // true
  int b3 = s1.fold(100, (pre, cur) => pre + cur); // 106
  int b4 = s1.reduce((pre, cur) => pre + cur); // 6

  for (var i = 0; i < s1.length; i++) {
    print(s1.elementAt(i)); // // 1 2 3
  }

  for (var item in s1) {
    print(item); // 1 2 3
  }
```

## contains、containsAll {#contains、containsAll}
* contains(item) 是否包含某个元素 返回 bool
* containsAll({1,2,3}) 是否包含所有元素 返回bool
```dart 
  Set<int> s1 = {1, 2, 3};
  final b1 = s1.contains(1); // true
  final b2 = s1.contains(4); // false
  final b3 = s1.containsAll({1, 2, 3}); // true
  final b4 = s1.containsAll({1, 4, 3}); // false

```

## difference {#difference}
* difference({})找出和另一个set对象不同的元素
* (自己有，别的没有)
```dart
  Set<int> s1 = {1, 2, 3};
  final d1 = s1.difference({2, 4}); // {1, 3}
  final d2 = s1.difference({1, 2, 4}); // {3}
  final d3 = s1.difference({1, 2, 3}); // {}
  final d4 = s1.difference({}); // {1, 2, 3}
```

## elementAt {#elementAt}

* elementAt(index) 通过索引访问元素
```dart
  Set<int> s1 = {1, 2, 3};

  final item1 = s1.elementAt(0); // 1
  final item2 = s1.elementAt(2); // 3

  //RangeError (index): Index out of range: index should be less than 3: 3
  // final item3 = s1.elementAt(3); // 索引越界 报错
```

## intersection {#intersection}
* s1.intersection(s2)
* 创建一个 set1 和 set2 共同元素组成的新set对象
```dart
  Set<int> s1 = {1, 2, 3};
  final s2 = s1.intersection({1, 2, 3, 4}); // {1, 2, 3}
  final s3 = s1.intersection({1}); // {1}
  final s4 = s1.intersection({}); // {}
```

## retainAll {#retainAll}
* s1.retainAll(s2) 
* s1中只保留与s2共有的元素
```dart
  Set<int> s1 = {1, 2, 3};

  s1.retainAll({1, 2, 3, 4, 5}); // s1: {1, 2, 3}
  s1.retainAll({1, 2}); // s1: {1, 2}
  s1.retainAll({1}); // s1: {1}
  s1.retainAll({}); // s1: {}

```

## join {#join}
* s1.join('xx')
* s1 通过 'xx' 拼接成新的字符串
* 不影响 原数据

```dart
 Set<int> s1 = {1, 2, 3};
  final str = s1.join('-'); // "1-2-3"
  final str1 = s1.join('*'); // "1*2*3"
  print(s1); // {1, 2, 3}
```