---
title: Dart 语法
titleTemplate: num
---				

## 前言 {#前言}


## Dart 基础类型之数字 {#Dart 基础类型之数字}
 * int: 整数 
 * double: 浮点数
 * num: 可以表示整数和浮点数

## 常用属性 {#常用属性}

属性          | 返回值                        |
| ----------- | ---------------------------- |
| isFinite    | 数值是否是有限的              |
| isInfinite  | 数值是否是无限的               |
| isNaN       | 是否是NAN                    |
| isNegative  | 是否是负数                    |
| hashCode    | hashCode                     |
| runtimeType | 类型                          |
| sign        | 0 返回 0; >=1 返回 1; <= 0 返回 -1 |

## 常用方法 {#常用方法}

方法                   | 返回值                |
| -------------------- | ------------------ |
| abs                  | 绝对值                |
| ceil                 | 向上取整               |
| floor                | 向下取整               |
| toInt                | 转成int              |
| toDouble             | 转浮点数               |
| toString             | 转成字符串              |
| clamp(start,end)     | 取范围最大值 [最小, 最大] 值 |
| toStringAsFixed(num) | 保留小数位数             |
| truncate             | 舍弃小数部分             |
| compareTo()          | 比较大小，大：1；小：-1；一样大0 |
| round                | 四舍五入


## 代码展示 {#代码展示}
 ```dart
 /**
 * Dart 基础类型之数字
 * int: 整数
 * double: 浮点数
 * num: 可以表示整数和浮点数
 * 
 */

void main() {
  num_Properties();
  num_methods();
}

void num_Properties() {
  num n1 = 0;
  num n2 = 1;
  int n3 = -2;
  double n4 = 3.9;
  double n5 = -3.9;

  print(' n2 is : ${n2.isFinite}'); // true 数值是否是有限的
  print(' n3 is : ${n3.isInfinite}'); // false 数值是否是无限的
  print(' n4 is : ${n4.isNaN}'); // false 是否是NAN
  print(' n1 is : ${n5.isNegative}'); // true 是否是负数

  print(' hashCode is : ${n1.hashCode}'); // 0 返回hashCode
  print(' runtimeType is : ${n1.runtimeType}'); // int 类型是 int
  print(' sign is : ${n1.sign}'); // 0 , 0 返回 0; >=1 返回 1; <= 0 返回 -1
  print(' sign is : ${n2.sign}'); // 1 类型是 int
  print(' sign is : ${n3.sign}'); // -1 类型是 int
}

void num_methods() {
  num n2 = 1;
  int n3 = -2;
  double n5 = -3.9;
  double n6 = 123456.78910;

  print(' abs is : ${n3.abs()}'); // 2 绝对值
  print(' ceil is : ${n5.ceil()}'); // -3 向上取整
  print(' floor is : ${n5.floor()}'); // -4 向下取整
  print(' toInt is : ${n5.toInt()}'); // -3 转成int
  print(' toDouble is : ${n2.toDouble()}'); // 1.0 转浮点数
  print(' toString is : ${n5.toString()}'); // "-3.9" 转成字符串
  print(' clamp is : ${n6.clamp(1, 123457)}'); // 123456.7891 取范围最大值 [最小, 最大] 值
  print(' round is : ${n6.round()}'); // 123457 四舍五入
  print(' toStringAsFixed is : ${n6.toStringAsFixed(1)}'); // 123456.8 保留小数位数
  print(' truncate is : ${n6.truncate()}'); // 123456 舍弃小数部分
  print(' compareTo is : ${0.compareTo(0)}'); // 0 比较大小：一样大
  print(' compareTo is : ${1.compareTo(0)}'); // 1 比较大小： 大于
  print(' compareTo is : ${1.compareTo(2)}'); // -1 比较大小： 小于
}

 ```