function isWinner(player1: number[], player2: number[]): number {
  function getScore(arr: number[]): number {
    let pre: number[] = arr.slice(0, 1);
    let score = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (pre.includes(10)) {
          score += arr[i];
        }
        score += arr[i];
        // 更新pre
        let sec = pre[1];
        if (sec === void 0) {
          pre = [pre[0], arr[i]];
        } else {
          pre = [sec, arr[i]];
        }
    }
    return score;
  }

  const p1Score = getScore(player1);
  const p2Score = getScore(player2);
  if (p1Score > p2Score) {
    return 1;
  } else if (p1Score < p2Score) {
    return 2;
  }

  return 0;
};

console.log(isWinner([4, 10, 3,2], [2, 10, 4,2])) // 0
console.log(isWinner([10, 10, 3,2], [2, 10, 4,2])) // 0