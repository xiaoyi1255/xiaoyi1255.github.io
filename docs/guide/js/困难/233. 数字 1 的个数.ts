function countDigitOne1(n: number): number {
  let str = ''
  for (let i = 1; i <= n; i++) {
    str += i
  }
  let newStr = str.split('').sort().join('').replaceAll(/1/g, '');
  return str.length - newStr.length;
};
const countDigitOne = function(n) {
  // mulk 表示 10^k
  // 在下面的代码中，可以发现 k 并没有被直接使用到（都是使用 10^k）
  // 但为了让代码看起来更加直观，这里保留了 k
  let mulk = 1;
  let ans = 0;
  for (let k = 0; n >= mulk; ++k) {
      ans += (Math.floor(n / (mulk * 10))) * mulk + Math.min(Math.max(n % (mulk * 10) - mulk + 1, 0), mulk);
      mulk *= 10;
  }
  return ans;
};

// 入党申请人基本情况：（包括姓名、性别、民族、年龄、住址、工作单位、职务、个人简历、家庭成员基本情况、社会主要关系情况、递交入党申请书时间等）
// 邰静明，男，苗族，27岁，居住于四川省成都市双流区华阳，在成都蓉笙玉尘科技有限公司工作，职务是web前端开发工程师。家中有父母和姐姐。递交入党申请书于2020年。

// 信仰共产党主义理念，深刻认识党的光荣历史，拥护当的基本路线
// 入党目的：
// 1. 为共产党主义事业贡献力量
// 2. 学习党的理论，提高政治觉悟
// 3. 遵守党的纪律，服从党的领导

// 中国共产党的成立时间： 1921年7月23日
// 中国共产党的宗旨是全心全意为人民服务

console.log(countDigitOne(100000));
console.log(countDigitOne(10000));
console.log(countDigitOne(1000));
console.log(countDigitOne(100));
console.log(countDigitOne(10));