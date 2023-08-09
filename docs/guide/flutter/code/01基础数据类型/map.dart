void main() {
  // mapPro();
  // mapMethods();
  mapFor();
}

void mapPro() {
  // 1.字面量创建
  Map<String, Object> m1 = {"name": 'xiaoyi', "age": 18};
  final len = m1.length; // 2
  final keys = m1.keys; // (name, age)
  final entries = m1.entries; // (MapEntry(name: xiaoyi), MapEntry(age: 18))
  final isEmpty = m1.isEmpty; // false
  final isNotEmpty = m1.isNotEmpty; // true
  final runtimeType = m1.runtimeType; // _Map<String, Object>

  print('''
  length: $len
  keys: $keys
  entries: $entries
  isEmpty: $isEmpty
  isNotEmpty: $isNotEmpty
  runtimeType: $runtimeType
  ''');

  // 2. 构造函数创建
  Map<String, int> goods = Map();
  goods['hat'] = 19;
  goods['shoe'] = 99;
  print(goods);

  // 3. of
  final m2 = Map.of(goods);
  //4. from
  final m3 = Map.from(goods);
  print(m2);
  print(m3);
}

void mapMethods() {
  Map<String, Object> m1 = {"name": 'xiaoyi', "age": 18};

  // 新增
  m1.addAll({"hobby": 'coding'}); // {name: xiaoyi, age: 18, hobby: coding}
  m1['add'] = {
    "name": '新增'
  }; // {name: xiaoyi, age: 18, hobby: coding, add: {name: 新增}}
  m1.addAll(
      {"name": '小易'}); // {name: 小易, age: 18, hobby: coding, add: {name: 新增}}
  m1.remove('hobby'); // {name: 小易, age: 18, add: {name: 新增}}
  m1.remove('hobby1'); // {name: 小易, age: 18, add: {name: 新增}}
  // m1.clear(); // {}
  final hasKey = m1.containsKey('age'); // true
  final hasVal = m1.containsValue(18); // true
  final age = m1['age']; // 18

  m1.update('age', (val) => '20');
  m1.updateAll((key, value) => {value});

  print(m1);
  print(hasKey);
  print(hasVal);
  print(age);
}

void mapFor() {
  Map<String, Object> m1 = {"name": 'xiaoyi', "age": 18};
  m1.forEach((key, value) {
    print('key:$key, value:$value');
    // key:name, value:xiaoyi
    // key:age, value:18
  });
  Map<String, Object> m2 = m1.map((key, value) {
    return MapEntry(key, '===$value==='); // {name: ===xiaoyi===, age: ===18===}
  });

  m1.addEntries({'a': 2}.entries); // m1: {name: xiaoyi, age: 18, a: 2}
  print(m1);
  print(m2); // {name: ===xiaoyi===, age: ===18===}
}
