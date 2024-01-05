function dayOfTheWeek1(day: number, month: number, year: number): string {
  let date = new Date(year, month - 1, day);
  const dayMap = {
    "7": "Sunday",
    "0": "Sunday",
    "1": "Monday",
    "2": "Tuesday",
    "3": "Wednesday",
    "4": "Thursday",
    "5": "Friday",
    "6": "Saturday"
  }
  return dayMap[date.getDay()]
};
function dayOfTheWeek(day: number, month: number, year: number): string {
  const dayMap = {
    "7": "Sunday",
    "0": "Sunday",
    "1": "Monday",
    "2": "Tuesday",
    "3": "Wednesday",
    "4": "Thursday",
    "5": "Friday",
    "6": "Saturday"
  }
  if (month < 3) {
    month += 12;
    year--;
  }

  const q = day;
  const m = month;
  const K = year % 100;
  const J = Math.floor(year / 100);

  const h = (q + Math.floor((13 * (m + 1)) / 5) + K + Math.floor(K / 4) + Math.floor(J / 4) - 2 * J) % 7;

  return dayMap[(h + 5) % 7 + 1]
};

// console.log(dayOfTheWeek(1, 1, 2024)); // 星期一
// console.log(dayOfTheWeek(2, 1, 2024)); // 星期一
// console.log(dayOfTheWeek(3, 1, 2024)); // 星期一
console.log(dayOfTheWeek(6, 1, 2024)); // 星期一