---
title: Dart 语法
titleTemplate: String
---				

## 前言 {#前言}


## Dart 基础类型之字符串 {#Dart 基础类型之字符串}

## 常用属性 {#常用属性}

属性          | 返回值                        |
| ----------- | ---------------------------- |
| hashCode    | hashCode            |
| isEmpty     | 是否为空字符串       |
| isNotEmpty  | 是否不为空           |
| length      | 长度                |
| runtimeType | 类型                |
| codeUnits   | unicode 码          |

```dart
 void main() {
  str_prop();
}

// 属性
void str_prop() {
  String str = ' xiaoyi小易 ';
  print('str is $str');
  print('hashCode: ${str.hashCode}'); // 243523189
  print('isEmpty: ${str.isEmpty}'); // false 是否为空字符串
  print('isNotEmpty: ${str.isNotEmpty}'); // true 是否不为空
  print('length: ${str.length}'); // 10 长度
  print('runtimeType: ${str.runtimeType}'); // String 类型
  print(
      'codeUnits: ${str.codeUnits}'); // [32, 120, 105, 97, 111, 121, 105, 23567, 26131, 32] unicode码
}
```


## 常用方法 {#常用方法}

方法                   | 返回值                |
| -------------------- | ------------------ |
| trim                 | 去掉两边空格                |
| trimLeft             | 去掉左边空格               |
| trimRight            | 去掉右边空格               |
| runes.toList         | 转成数组的unicode              |
| allMatches           | 根据正则匹配子串              |
| toUpperCase          | 将字符串转换为大写              |
| toLowerCase          | 将字符串转换为小写        |
| substring(start, end)| 根据开始和结束索引（结束索引不包含在内）|
| split                | 将字符串拆分为子字符串列表，根据指定的分隔符 |
| compareTo()          | 比较两个字符串，返回一个整数来指示它们在字典中的顺序关系 |
| contains             | 是否包含指定的子字符串           |
| endsWith             | 检查字符串是否以指定的后缀结尾，返回布尔值 |
| startsWith           | 检查字符串是否以指定的前缀缀开头，返回布尔值 |
| indexOf              | 指定子串首次出现的索引，没有返回-1        |
| lastIndexOf          | 指定子串最后出现的索引，没有返回-1        |
| padLeft(length, 'xx')| 字符串左边填充指定 字符串，以达指定长度    |
| padRight             | 字符串右边边填充指定 字符串，以达指定长度  |


### 1.  去掉空格 【trim\trimLeft\trimRight】
 ```dart
String str = ' xiaoyi小易 ';
str.trim(); // 'xiaoyi小易' 去掉两边空格
str.trimLeft(); // 'xiaoyi小易 ' 去掉左边空格
str.trimRight(); // ' xiaoyi小易' 去掉右边空格
 ```
### 2. 正则匹配子串 【allMatches】
```dart
  String text = 'apple banana apple orange apple pear';

  // 创建正则表达式对象
  RegExp regex = RegExp(r'apple');

  // 使用 allMatches 方法查找所有匹配项
  Iterable<Match> matches = regex.allMatches(text);

  // 遍历匹配项并打印结果
  for (Match match in matches) {
    int start = match.start; // 匹配项在原始字符串中的起始索引
    int end = match.end; // 匹配项在原始字符串中的结束索引（不包含）
    String matchedString = match.group(0) ?? ''; // 匹配的子字符串

    print('Matched String: $matchedString, Start: $start, End: $end');
  }
```
### 3. 转大小写 【toUpperCase\toLowerCase】
```dart
String text = "Dart Programming";
String uppercaseText = text.toUpperCase(); // "DART PROGRAMMING"
String lowercaseText = text.toLowerCase(); // "dart programming"

```

### 4.  提取子字符串，根据开始和结束索引 【substring】
```dart
String text = "Dart Programming";
String substring1 = text.substring(5); // "Programming"
String substring2 = text.substring(5, 9); // "Prog"

```

### 5.  将字符串拆分为子字符串列表，根据指定的分隔符 【split】
```dart
String fruits = "apple,banana,orange";
List<String> fruitList = fruits.split(","); // ["apple", "banana", "orange"]

```
### 6. 比较两个字符串，返回一个整数来指示它们在字典中的顺序关系 【compareTo】
```dart
String str1 = "apple";
String str2 = "banana";
int result = str1.compareTo(str2); // -1，因为 "apple" 在 "banana" 之前
int result = str2.compareTo(str1); // 1，因为 "apple" 在 "banana" 之后
int result = str2.compareTo(str2); // 0
```

### 7. 是否包含指定的子字符串 【contains】
```dart
String str = "Hello, World!";
bool containsHello = str.contains("Hello"); // true
bool containsDart = str.contains("Dart"); // false

```

### 8. 检查字符串是否以指定的后缀结尾|前缀开头 【endsWith\startsWith】
```dart
String text = "Hello, Dart!";
bool startsWithHello = text.startsWith("Hello"); // true
bool startsWithHey = text.startsWith("Hey"); // false

```
### 9. 字符串中第一次|最后一次出现指定子字符串的索引位置，没有返回-1 【indexOf\lastIndexOf】
```dart 
String text = "Dart is fun, Dart is cool!";
int indexOfDart = text.indexOf("Dart"); // 0
int indexOfIs = text.indexOf("is"); // 5
int indexOfFlutter = text.indexOf("Flutter"); // -1，因为找不到该子字符串

int lastIndexOfDart = text.lastIndexOf("Dart"); // 15
int lastIndexOfIs = text.lastIndexOf("is"); // 17
int lastIndexOfFlutter = text.lastIndexOf("Flutter"); // -1，因为找不到该子字符串
```
### 10. 在字符串的左侧（或右侧）填充指定字符，使字符串达到指定的长度 【padLeft / padRight】
```dart 
String text = "Dart";
String paddedLeft = text.padLeft(10, "-"); // "------Dart"
String paddedRight = text.padRight(10, "."); // "Dart......"

```