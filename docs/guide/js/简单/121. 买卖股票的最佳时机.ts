function maxProfit1(prices: number[]): number {
  let maxPrice = 0
  for (let i = 0; i < prices.length; i++) {
    for (let j = i+1; j < prices.length; j++) {
      maxPrice = Math.max(maxPrice, prices[j] - prices[i])
    }
  }
  return maxPrice
};

function maxProfit(prices: number[]): number {
  let maxPrice = 0
  let low = Infinity
  for (let i = 0; i < prices.length; i++) {
    low = Math.min(low, prices[i]) // 从左往右遍历的，，左最小值
    maxPrice = Math.max(maxPrice, prices[i] - low) // 右边最大值 - 左边最小值
  }
  return maxPrice
};

console.log(maxProfit([7, 1, 5, 3, 6, 4])) // 5