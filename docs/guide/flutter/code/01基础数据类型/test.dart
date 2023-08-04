void main() {
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
