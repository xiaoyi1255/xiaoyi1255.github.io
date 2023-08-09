---
title: Dart 语法
titleTemplate: Map
---				

## 前言 {#前言}
* Map 是一种键-值对的数据结构，其中每个值都与唯一的键相关联

## 创建Map {#创建Map}

```dart
// 1.字面量创建
Map<String, Object> m1 = {"name": 'xiaoyi', "age": 18};

// 2. 构造函数创建
Map<String, int> goods = Map();
goods['hat'] = 19;
goods['shoe'] = 99;
print(goods); // {hat: 19, shoe: 99}

  // 3. of
  final m2 = Map.of(goods); // {hat: 19, shoe: 99}

  //4. from
  final m3 = Map.from(goods); // {hat: 19, shoe: 99}
```

## Map常用属性 {#Map常用属性}
```dart
  Map<String, Object> m1 = {"name": 'xiaoyi', "age": 18};
  final len = m1.length; // 2
  final keys = m1.keys; // (name, age)
  final entries = m1.entries; // (MapEntry(name: xiaoyi), MapEntry(age: 18))
  final isEmpty = m1.isEmpty; // false
  final isNotEmpty = m1.isNotEmpty; // true
  final runtimeType = m1.runtimeType; // _Map<String, Object>
```

## 增删改 {#增删改查}
* 增： 
    1. addAll({}) 新增其它Map的所有key value,有key重复，其它的Map value覆盖自身的
    2. 用map[key] 的形式，key存在则覆盖，不存在则新增
* 改：
    1. 用map[key] 的形式，key存在则覆盖，不存在则新增; 
    2. update(key, (val)=>newVal), 
    3. m1.updateAll((key, value) => {value})
* 删除：
    1. remove(key), 如果key不存在 不影响原map对象； 
    2. map.clear()清空对象
* 查: 
    1. 通过key map[key]; 
    2. containsKey(key); 
    3. containsValue(val)

```dart 
  Map<String, Object> m1 = {"name": 'xiaoyi', "age": 18};

  // 新增
  m1.addAll({"hobby": 'coding'}); // {name: xiaoyi, age: 18, hobby: coding}
  m1['add'] = {"name": '新增'}; // {name: xiaoyi, age: 18, hobby: coding, add: {name: 新增}}
  m1.addAll({"name": '小易'}); // {name: 小易, age: 18, hobby: coding, add: {name: 新增}}
  // 通过指定key删除
  m1.remove('hobby'); // {name: 小易, age: 18, add: {name: 新增}}
  m1.remove('hobby1'); // {name: 小易, age: 18, add: {name: 新增}}
  // 通过判断是否包含某个key
  final hasKey = m1.containsKey('age'); // true
  // 判断是否包含某个 value
  final hasVal = m1.containsValue(18); // true
  final age = m1['age']; // 18
  // 更新 age => '20'
  m1.update('age', (val) => '20'); // {name: 小易, age: 20, add: {name: 新增}}

  // 清空对象
  m1.clear(); // {}

```

## 循环 {#循环}
* map 对每一项进行遍历并返回新map对象， 不影响原数据
* forEach 对每一项进行遍历

```dart
  Map<String, Object> m1 = {"name": 'xiaoyi', "age": 18};
  
  m1.forEach((key, value) {
    print('key:$key, value:$value');
    // key:name, value:xiaoyi
    // key:age, value:18
  });
  Map<String, Object> m2 = m1.map((key, value) {
    return MapEntry(key, '===$value==='); // {name: ===xiaoyi===, age: ===18===}
  });
```

## addEntries {#addEntries}
* m1.addEntries(m2.entries)
* 将另一个映射的键值对添加到当前映射中
```dart 
  Map<String, Object> m1 = {"name": 'xiaoyi', "age": 18};

  m1.addEntries({'a': 2}.entries); // m1: {name: xiaoyi, age: 18, a: 2}
```
