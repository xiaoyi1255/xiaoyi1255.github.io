function combine1(n: number, k: number): number[][] {
  let result: number[][] = [];
  const path: number[] = []

  backtrack(1)
  return result
  function backtrack(startIndex: number) {
    if (path.length===k) {
      result.push([...path])
    }
    for (let i = startIndex; i <= n; i++) {
      path.push(i)
      backtrack(i + 1)
      path.pop()
    }
  }
};

function combine(n: number, k: number): number[][] {
  let result: number[][] = [];
  backtrack([],1)
  return result
  function backtrack(path:number[],startIndex: number) {
    if (path.length===k) {
      result.push([...path])
    }
    for (let i = startIndex; i <= n; i++) {
      path.push(i)
      backtrack(path,i + 1)
      path.pop()
    }
  }
};
console.log(combine(4, 2));