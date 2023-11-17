/**
 * 示例 1:
      输入: list1 = ["Shogun", "Tapioca Express", "Burger King", "KFC"]，list2 = ["Piatti", "The Grill at Torrey Pines", "Hungry Hunter Steakhouse", "Shogun"]
      输出: ["Shogun"]
      解释: 他们唯一共同喜爱的餐厅是“Shogun”。
示例 2:
    输入:list1 = ["Shogun", "Tapioca Express", "Burger King", "KFC"]，list2 = ["KFC", "Shogun", "Burger King"]
    输出: ["Shogun"]
    解释: 他们共同喜爱且具有最小索引和的餐厅是“Shogun”，它有最小的索引和1(0+1)。
 */

function findRestaurant1(list1: string[], list2: string[]): string[] {
  const map = new Map<string, number>();
  for (let i = 0; i < list1.length; i++) {
    map.set(list1[i], i);
  }
  let arr: string[] = []; // 交集
  for (const item of list2) {
    if (map.has(item)) {
      arr.push(item);
    }
  }
  let map1 = new Map<string, number>();
  for (const item of arr) {
    const idx1 = list1.indexOf(item);
    const idx2 = list2.indexOf(item);
    const indexSum = idx1 + idx2;
    map1.set(item, indexSum);
  }
  for (const [key, value] of map1.entries()) {
    console.log(key, value);
  }
  const a = Array.from(map1.entries()).sort((a, b) => a[1] - b[1]);
  const resArr: string[] = [];
  for (let i = 0; i < a.length; i++) {
    resArr.push(a[i][0]);
    if (a[i][1] !== a[i + 1]?.[1]) {
      return resArr
    }
  }
  return resArr
};

function findRestaurant(list1: string[], list2: string[]): string[] {
  const map = new Map<string, number>();
  for (let i = 0; i < list1.length; i++) {
    map.set(list1[i], i);
  }
  let arr: { name: string; idx: number }[] = []; // 交集
  for (let i = 0; i < list2.length; i++) {
    if (map.has(list2[i])) {
      const idx1 = list1.indexOf(list2[i]);
      arr.push({ name: list2[i], idx: idx1 + i });
    }
  }
  arr.sort((a, b) => a.idx - b.idx);
  return arr.filter(item => item.idx === arr[0].idx).map(item => item.name);
};
console.log(findRestaurant(["Shogun","Tapioca Express","Burger King","KFC"],["KFC","Shogun","Burger King"]))