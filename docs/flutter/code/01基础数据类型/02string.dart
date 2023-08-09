/**
 * 
 * 
 */

void main() {
  // str_prop();
  // str_method();
  // campare();
  // contains();
  indexOf();
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

void str_method() {
  String str = ' xiaoyi小易 ';
  String str1 = ' xiaoyi ';
  String str2 = ' xiaoyicacsscas ';
  print('str is $str'); // ' xiaoyi小易 '
  print('trim is ${str.trim()}'); // 'xiaoyi小易' 去掉两边空格
  print('trim is ${str.trimLeft()}'); // 'xiaoyi小易 ' 去掉左边空格
  print('trim is ${str.trimRight()}'); // ' xiaoyi小易' 去掉右边空格
  print(
      'trim is ${str.runes.toList()}'); // [32, 120, 105, 97, 111, 121, 105, 23567, 26131, 32]
  print('trim is ${str[2]}'); // i 下标为2的子串
  allMatches(); // 字符串使用正则匹配
  print('${str.compareTo(str1)}');
  print('${str.compareTo(str2)}');
}

void allMatches() {
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
}

void campare() {
  String str1 = "apple";
  String str2 = "banana";
  int result = str1.compareTo(str2);
  int result1 = str2.compareTo(str1);
  int result2 = str2.compareTo(str2);
  print('$result $result1 $result2');
}

void contains() {
  String message = "Hello, World!";
  bool containsHello = message.contains("Hello"); // true
  bool containsDart = message.contains("Dart"); // false
  print(containsHello);
  print(containsDart);
}

void indexOf() {
  String text = "Dart is fun, Dart is cool!";
  int indexOfDart = text.indexOf("Dart"); // 0
  int indexOfIs = text.indexOf("is"); // 5
  int indexOfFlutter = text.indexOf("Flutter"); // -1，因为找不到该子字符串

  int lastIndexOfDart = text.lastIndexOf("Dart"); // 15
  int lastIndexOfIs = text.lastIndexOf("is"); // 17
  int lastIndexOfFlutter = text.lastIndexOf("Flutter"); // -1，因为找不到该子字符串

  print(indexOfDart);
  print(indexOfIs);
  print(indexOfFlutter);
  print(lastIndexOfDart);
  print(lastIndexOfIs);
  print(lastIndexOfFlutter);
}
