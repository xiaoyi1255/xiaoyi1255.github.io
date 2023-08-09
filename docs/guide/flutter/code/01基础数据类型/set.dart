void main() {
  // fn1();
  // setPro();
  // setFor();
  setMethods();
}

void fn1() {
  Set<int> s1 = {1, 2, 3};
  // 新增
  s1.add(4); // {1, 2, 3, 4}
  s1.addAll({5, 6}); // {1, 2, 3, 4, 5, 6}
  s1.remove(6); // {1, 2, 3, 4, 5}
  s1.removeAll({1, 2}); // {3, 4, 5}
  s1.removeWhere((item) => item < 4); // {4, 5}
  s1.elementAt(0); // 4
  s1.clear(); // {}

  print(s1);
  print(s1.elementAt(0));
}

void setPro() {
  Set<int> s1 = {1, 2, 3};
  final len = s1.length; // 3
  final first = s1.first; // 1
  final last = s1.last; // 3
  final isEmpty = s1.isEmpty; // false
  final isNotEmpty = s1.isNotEmpty; // true
  final runtimeType = s1.runtimeType; //  _Set<int>

  print('''
  length: $len
  first: $first
  last: $last
  isEmpty: $isEmpty
  isNotEmpty: $isNotEmpty
  runtimeType: $runtimeType
''');
}

void setFor() {
  Set<int> s1 = {1, 2, 3};
  s1.forEach(print); // 1 2 3
  final s2 = s1.map((e) => e * 2).toSet(); // {2, 4, 6}
  bool b1 = s1.every((element) => element > 0); // true
  bool b2 = s1.any((element) => element > 2); // true
  int b3 = s1.fold(100, (pre, cur) => pre + cur); // 106
  int b4 = s1.reduce((pre, cur) => pre + cur); // 6

  for (var i = 0; i < s1.length; i++) {
    print(s1.elementAt(i)); // 1 2 3
  }

  for (var item in s1) {
    print(item); // 1 2 3
  }
  print(s2);
  print(b1);
  print(b2);
  print(b3);
  print(b4);
}

void setMethods() {
  Set<int> s1 = {1, 2, 3};
  // 1. 是否包含一个、多个元素
  final b1 = s1.contains(1); // true
  final b2 = s1.contains(4); // false
  final b3 = s1.containsAll({1, 2, 3}); // true
  final b4 = s1.containsAll({1, 4, 3}); // false

// 通过索引访问某个元素
  final item1 = s1.elementAt(0); // 1
  final item2 = s1.elementAt(2); // 3
  // final item3 = s1.elementAt(3); // 报错 RangeError (index): Index out of range: index should be less than 3: 3

  // 找不同于另一个set 对象中的元素(自己有，别的没有)
  final d1 = s1.difference({2, 4}); // {1, 3}
  final d2 = s1.difference({1, 2, 4}); // {3}
  final d3 = s1.difference({1, 2, 3}); // {}
  final d4 = s1.difference({}); // {1, 2, 3}

  // 创建一个 set1 和 set2 共同元素组成的新set对象
  final s2 = s1.intersection({1, 2, 3, 4}); // {1, 2, 3}
  final s3 = s1.intersection({1}); // {1}
  final s4 = s1.intersection({}); // {}

  // join 拼接成字符串
  final str = s1.join('-'); // "1-2-3"
  final str1 = s1.join('*'); // "1*2*3"
  // print(str1);
  // print(s1);

  // s1中只保留与s2共有的元素
  s1.retainAll({1, 2, 3, 4, 5}); // s1: {1, 2, 3}
  s1.retainAll({1, 2}); // s1: {1, 2}
  s1.retainAll({1}); // s1: {1}
  s1.retainAll({}); // s1: {}

  print(s1);

  // print(s4);
  // print(s3);
  // print(s2);
  // print(s1);

  // print(b1);
  // print(b2);
  // print(b3);
  // print(b4);
  // print(item1);
  // print(item2);
  // print(item3);
  // print(d1);
  // print(d2);
  // print(d3);
  // print(d4);
}
