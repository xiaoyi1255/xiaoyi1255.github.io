/***
 * List 是一种内置的数据结构，表示有序的集合，允许存储多个元素
 */

void main() {
  // creatList();
  // List_prop();
  // List_method();
  // List_sort();
  // List_join();
  // List_has();
  // List_for();
  List_skip();
}

void creatList() {
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

  // 5. generate 通过指定数量的重复操作来生成列表中的元素
  List<int> numbers = List.generate(5, (index) => index * 3); // 生成 1 到 5 的数字列表
  print(numbers); // [0, 3, 6, 9, 12]

  print(list1); // []
  print(list2); // [0, 0, 0, 0, 0]
  print(list3); // [1, 2, 3, 4, 5]
  print(list4); // [apple, banana, orange]
  print(list5); // [apple, banana, orange]
  print(list6); // [1, 2, 3]
  print(list7); // [apple, banana, orange]

  // 斐波那契数列
  var fibonacciList = List<int>.filled(10, 0);
  for (var i = 0; i < fibonacciList.length; i++) {
    if (i == 0 || i == 1) {
      fibonacciList[i] = i;
    } else {
      fibonacciList[i] = fibonacciList[i - 1] + fibonacciList[i - 2];
    }
  }
  print(fibonacciList); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
}

void List_prop() {
  List<Object> mixedList = [1, 'two', 3.0, 'four', 5];

  print(mixedList.length); // 5 数组的长度
  print(mixedList.first); // 1 数组的第一项
  print(mixedList[0]); // 1 数组的第一项
  print(mixedList.last); // 5 数组的最后一项
  print(mixedList[mixedList.length - 1]); // 5 数组的最后一项
  print(mixedList.isEmpty); // false 数组是否为空
  print(mixedList.isNotEmpty); // true 数组是否不为空
  // print(mixedList.firstOrNull); // 1 数组第一项，不存在返回null
}

void List_method() {
  List<int> list1 = [1, 2];
  // 1. 增
  list1.add(11);
  // list1.add('22'); 报错
  list1.addAll([22, 33]);
  print(list1); // [1, 2, 11, 22, 33]

  // 2. 删除
  // 2.1 删除指定元素（只删除匹配上的第一个)
  list1.remove(1);
  print(list1); // [2, 11, 22, 33]
  list1.add(22); // [2, 11, 22, 33, 22]
  list1.remove(22); // 现在是有两个22
  print(list1); // [2, 11, 33, 22] 删除了第一个22

  // 2.2 删除指定位置的元素
  list1.removeAt(1);
  print(list1); // [2, 33, 22] 删除指定索引的元素
  // list1.removeAt(10); 索引越界会报错

  // 2.3 删除最后一个
  list1.removeLast(); // 删除最后一个
  print(list1); // [2, 33] 删除指定索引的元素
  // 2.4 删除指定区间元素
  list1.removeRange(0, 1); // 删除指定区间元素
  print(list1); // [33]
  // 2.5 删除满足条件的元素
  list1.removeWhere((item) => item == 33); // 删除满足条件的元素
  print(list1); // []
  // 2.6 清空列表
  list1.clear(); // 等价于 list1.length = 0
  print(list1); // []

  // 3. 删除元素
  // 3.1 使用索引直接复制
  List<String> fruits = ['apple', 'banana', 'orange'];
  fruits[1] = 'grape'; // 将索引为 1 的元素修改为 'grape'
  print(fruits); // [apple, grape, orange]

  // 3.2 使用 replaceRange 方法：
  fruits.replaceRange(
      1, 2, ['grape', 'kiwi']); // 从索引 1 开始，删除 1 个元素，然后插入 'grape' 和 'kiwi'
  print(fruits); // [apple, grape, kiwi, orange]
}

/**
 * sort 方法对列表进行排序，会改变原数组
 */
void List_sort() {
  List<int> numbers = [3, 1, 4, 11, 5, 9, 2, 6, 5, 3, 5];
  numbers.sort(); // 升序
  print(numbers); // [1, 2, 3, 3, 4, 5, 5, 5, 6, 9, 11]
  numbers.sort((a, b) => b.compareTo(a)); // 降序
  print(numbers); // [11, 9, 6, 5, 5, 5, 4, 3, 3, 2, 1]

  // 不改变原数组的排序
  List<int> sortedNumbers = List.from(numbers); // 复制原始数组
  sortedNumbers.sort(); // 对复制的数组进行排序
  print(numbers); // [11, 9, 6, 5, 5, 5, 4, 3, 3, 2, 1]
  print(sortedNumbers); // [1, 2, 3, 3, 4, 5, 5, 5, 6, 9, 11]
}

/**
 *  join([string]); 数组根据链接符号拼接成字符串，不会改变原数组
 */

void List_join() {
  List<Object> mixedList = ['xiao', 'yi'];
  String str = mixedList.join('-');
  print(str); // "xiao-yi"
  print(mixedList); // [xiao, yi]
}

/**
 * 查找某个元素
 * 1.使用 contains 方法可以检查列表是否包含指定的元素，返回一个布尔值。
 * 2.使用 indexOf 方法可以查找指定元素在列表中的索引，如果找到则返回索引，否则返回 -1。
 * 3.使用 lastIndexOf 方法可以查找指定元素在列表中的最后一个出现的索引，如果找到则返回索引，否则返回 -1
 * 4.使用 firstWhere 方法可以查找符合指定条件的第一个元素。
 * 5.使用 where 方法可以查找符合指定条件的所有元素，返回一个新的可迭代对象（Iterable）。
 */

void List_has() {
  List<int> numbers = [1, 2, 3, 4, 5, 1];
  bool has2 = numbers.contains(2); // true
  bool has6 = numbers.contains(6); // false

  int index1 = numbers.indexOf(1); // 0 找到第一个就返回 找不到返回-1
  int index2 = numbers.lastIndexOf(1); // 5 从后往前找找到第一个就返回 找不到返回-1
  int index3 = numbers.indexOf(111); // -1

  final elementAt = numbers.elementAt(4); // 5

  print(has2);
  print(has6);
  print(index1);
  print(index2);
  print(index3);
  print(elementAt);
}

/**
 * 1. for 
 * 2. froEach
 * 3. for in
 * 4. map
 * 5.where
 * 
 */
void List_for() {
  List<int> numbers = [1, 2, 3, 4];
  // for循环
  // for (var i = 0, len = numbers.length; i < len; i++) {
  //   print(numbers[i]); // 1 2 3 4
  // }

  // forEach
  // numbers.forEach(print); // 1 2 3 4
  // numbers.forEach((item) => print(item)); // 1 2 3 4

  // for in
  // for (var item in numbers) {
  //   print(item);
  // }

  // map
  // Iterable<int> obj = numbers.map((e) => e * 2);
  // obj.forEach(print); // 2 4 6 8
  // print(numbers); //[1, 2, 3, 4]

  //where
  // Iterable<int> evenNumbers = numbers.where((number) => number % 2 == 0);
  // evenNumbers.forEach(print); // 2 4

  // firstWhere
  // var result = numbers.firstWhere((element) => element < 5); // 1
  // print(result);
  // result = numbers.firstWhere((element) => element > 3); // 3
  // print(result);

  // result =
  //     numbers.firstWhere((element) => element > 10, orElse: () => -1); // -1
  // print(result);

  // lastWhere
  // var result1 = numbers.lastWhere((element) => element < 5); // 4
  // print(result1);
  // result1 = numbers.lastWhere((element) => element > 3); // 4
  // print(result1);

  // result1 =
  //     numbers.lastWhere((element) => element > 10, orElse: () => -1); // -1
  // print(result1);

  //every
  // bool b1 = numbers.every((item) => item % 2 == 0); // false
  // bool b2 = numbers.every((item) => item > 0); // true
  // print(b1);
  // print(b2);

  // any
  // bool b3 = numbers.any((item) => item % 2 == 0); // true
  // bool b4 = numbers.any((item) => item < 0); // false
  // print(b3);
  // print(b4);

  /**
   * fold 
   * T fold<T>(T initialValue,T combine(T previousValue,E element))
   * initialValue: 初始值
   * combine(T previousValue,E element) 拿到上一次迭代的结果进行这次计算
   * 类似js 中的reduce
   */
  // final res =
  //     numbers.fold(0, (previousValue, element) => previousValue + element);
  // print(res); // 10

  /**
   * reduce 和fold 类似，只是没有初始值
   */
  final num = numbers.reduce((value, element) => value + element); // 10
  final num1 = numbers.reduce((value, element) => value * element); // 24
  print(num);
  print(num1);
}

void List_skip() {
  List<int> numbers = [1, 2, 3, 4, 5, 6];
  // final result = numbers.skip(2); // (3, 4, 5, 6)
  // final skipAll = numbers.skip(100); // ()
  // print(result);
  // print(skipAll);

  final result2 = numbers.skipWhile((x) => x != 2); // (3, 4, 5, 6)
  final skipAl2 = numbers.skipWhile((x) => x > 0); // ()
  print(result2);
  print(skipAl2);
}
