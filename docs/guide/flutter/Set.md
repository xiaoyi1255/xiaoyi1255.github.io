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
* fold(initval, (pre.cur)=> pre+xur) 做累加累成等

```dart 
  Set<int> s1 = {1, 2, 3};
  s1.forEach(print); // 1 2 3
  final s2 = s1.map((e) => e * 2).toSet(); // {2, 4, 6}
  bool b1 = s1.every((element) => element > 0); // true
  bool b2 = s1.any((element) => element > 2); // true
  int b3 = s1.fold(100, (pre, cur) => pre + cur); // 106
```