/**
 * 在上一版本中已经实现了n行
 * 现在只需要返回第n行就好了
 */
function getRow1(rowIndex: number): number[] {
  if (rowIndex === 0) {
    return [1]
  }
  let res: number[] = []
  for (let i = 0; i <= rowIndex; i++) {
    let temp: number[] = [1]
    for (let j = 0; j < i; j++) {
      temp.push((res?.[j] || 0) + (res?.[j + 1] || 0))
    }
    res = temp
    if (i > rowIndex) { 
      return temp
    }
  }
  return res
};

function getRow(rowIndex: number): number[] {
  let row: number[] = [];

  for (let i = 0; i <= rowIndex; i++) {
    row.unshift(1);
    for (let j = 1; j < row.length - 1; j++) {
      row[j] = row[j] + row[j + 1];
    }
  }

  return row;
}

console.log(getRow(2))