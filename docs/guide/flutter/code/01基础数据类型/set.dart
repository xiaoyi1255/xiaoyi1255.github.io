void main() {
  // fn1();
  // setPro();
  setFor();
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
  print(s2);
  print(b1);
  print(b2);
  print(b3);
}
