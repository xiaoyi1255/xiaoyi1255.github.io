---
title: Dart 语法
titleTemplate: List
---				

## 前言 {#前言}
List是一种内置的数据结构，表示有序的集合，允许存储多个元素
* List是有有序的，可以通过索引访问每一个元素
* List 是可变的，可以添加、删除、修改元素
* 长度是动态的，添加、删除元素，其长度会跟着变换

下文中 会简称为 列表|数组

## 创建 {#创建}
```dart
  // 1.构造函数创建
  List<String> list1 = List<String>.empty();
  // 2. filled 长度5 用0 填充
  List<int> list2 = List<int>.filled(5, 0);
  // 3. 字面量
  List<int> list3 = [1, 2, 3, 4, 5];
  // 4. from 将set\map\List转换为list
  List<String> list4 = List.from(['apple', 'banana', 'orange']);
  List<String> list5 = List.from({'apple', 'banana', 'orange'});
  Map<String, int> map = {'apple': 1, 'banana': 2, 'orange': 3};
  List<int> list6 = List.from(map.values);
  List<String> list7 = List.from(map.keys);

  print(list1); // []
  print(list2); // [0, 0, 0, 0, 0]
  print(list3); // [1, 2, 3, 4, 5]
  print(list4); // [apple, banana, orange]
  print(list5); // [apple, banana, orange]
  print(list6); // [1, 2, 3]
  print(list7); // [apple, banana, orange]

```

## 常用属性 {#常用属性}

```dart
  List<Object> mixedList = [1, 'two', 3.0, 'four', 5];
  print(mixedList.length); // 5 数组的长度
  print(mixedList.first); // 1 数组的第一项
  print(mixedList[0]); // 1 数组的第一项
  print(mixedList.last); // 5 数组的最后一项
  print(mixedList[mixedList.length - 1]); // 5 数组的最后一项
  print(mixedList.isEmpty); // false 数组是否为空
  print(mixedList.isNotEmpty); // true 数组是否不为空
  print(mixedList.firstOrNull); // 1 数组第一项，不存在返回null
```

## 常用方法 {#常用方法}
## 添加元素 {#添加元素}

```dart
  List<int> list1 = [1, 2];
  list1.add(11);
  // list1.add('22'); 报错
  list1.addAll([22, 33]);
  print(list1); // [1, 2, 11, 22, 33]
```
## 删除元素 {#删除元素}
### remove(item):删除指定元素(匹配上的第一个)
```dart
 List<int> list1 = [1, 2, 11, 22, 33];
  // 2.1 删除指定元素（只删除匹配上的第一个)
  list1.remove(1);
  print(list1); // [2, 11, 22, 33]
  list1.add(22); // [2, 11, 22, 33, 22]
  list1.remove(22); // 现在是有两个22
  print(list1); // [2, 11, 33, 22] 删除了第一个22
```
### removeAt(int):删除指定位置元素 
```dart
  list1.removeAt(1);
  print(list1); // [2, 33, 22] 删除指定索引的元素
  // list1.removeAt(10); 索引越界会报错
```
### removeLast():删除列表最后一个
```dart
  list1.removeLast(); // 删除最后一个
  print(list1); // [2, 33] 
```
### removeRange(start, end):删除指定区间元素
```dart
  list1.removeRange(0, 1); // 删除指定区间元素
  print(list1); // [33]
```
### removeWhere((item) => item == 33):删除满足条件的元素
```dart
  // 2.5 删除满足条件的元素
  list1.removeWhere((item) => item == 33); // 删除满足条件的元素
  print(list1); // []
```
### clear():清空数组
```dart
  // 2.6 清空列表
  list1.clear(); // 等价于 list1.length = 0
  print(list1); // []
```
## 修改元素 {#修改元素}

```dart
  // 3.1 使用索引直接复制
  List<String> fruits = ['apple', 'banana', 'orange'];
  fruits[1] = 'grape'; // 将索引为 1 的元素修改为 'grape'
  print(fruits); // [apple, grape, orange]

  // 3.2 使用 replaceRange 方法：
  fruits.replaceRange(1, 2, ['grape', 'kiwi']); // 从索引 1 开始，删除 1 个元素，然后插入 'grape' 和 'kiwi'
  print(fruits); // [apple, grape, kiwi, orange]
```