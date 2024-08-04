const obj = {
  // name: "小易",
  // age: 18,
  // gender: "男",
};
// 1. for...in  会遍历原型上的属性
for (let key in obj) {
  console.log(key, obj[key]);
}

// 2. Object.keys 遍历自身可枚举属性
Object.keys(obj).forEach((key) => {
  console.log(key, obj[key]);
});

// 3. Object.getOwnPropertyNames
Object.getOwnPropertyNames(obj).forEach((key) => {
  console.log(key, obj[key]);
});

// 4. Object.entries
Object.entries(obj).forEach(([key, value]) => {
  console.log(key, value);
});

// 5. Reflect.ownKeys
Reflect.ownKeys(obj).forEach((key) => {
  console.log(key, obj[key]);
})

obj[Symbol.iterator] = function () {
  let index = 0;
  let keys = Object.keys(this);
  return {
    next: () => {
      if (index < keys.length) {
        const res = {
          value: [keys[index], this[keys[index]]],
          done: false,
        };
        index++;
        return res;
      } else {
        return {
          value: undefined,
          done: true,
        };
      }
    },
  };
}

for (let [key, value] of obj) {
  console.log(key, value, 'for...of');
}

// 1秒后输出1,2秒后输出2， 3秒后输出3
function sleep(time) {
  return new Promise(
    (resolve) => setTimeout(resolve, time)
  );
}

async function test() {
  for (let i = 1; i <= 3; i++) {
    await sleep(i * 1000);
    console.log(i); 
  }
}


// 
function* gen() {
  yield setTimeout(() => console.log(1), 1000);
  yield setTimeout(() => console.log(2), 2000);
  yield setTimeout(() => console.log(3), 3000);
}
// let g = gen();
// g.next();
// g.next();
// g.next();


// 1. 实现数组扁平化
const arr = [1, [2, [3, [4, [5]]]]];

// 1.使用reduce
function flatten1(arr) {
  return arr.reduce((pre,cur) => {
    return pre.concat(Array.isArray(cur) ? flatten1(cur) : cur)
  }, [])
}

// 2.使用递归
function flatten2(arr) {
  let res = [];
  arr.forEach(item => {
    if (Array.isArray(item)) {
      res = res.concat(flatten2(item))
    } else {
      res.push(item)
    }
  })
  return res;
}

// 3. 控制扁平深度
function flatten3(arr, depth = 1) {
  if (depth === 0) return arr;
  return arr.reduce((pre,cur) => {
    return pre.concat(Array.isArray(cur) ? flatten3(cur, depth - 1) : cur)
  }, [])
}


// 2. 实现深拷贝

function deepClone(obj, map = new WeakMap()) {
	if (typeof obj !== 'object' || obj === null) return obj

	// 处理循环引用
	if (map.has(obj)) return map.get(obj)

	// 处理日期对象
	if (obj instanceof Date) return new Date(obj)
	// 处理正则对象
	if (obj instanceof RegExp) return new RegExp(obj)

	// Handle Map
	if (obj instanceof Map) {
		const mapCopy = new Map()
		map.set(obj, mapCopy)
		for (const [key, value] of obj) {
			mapCopy.set(deepClone(key, map), deepClone(value, map))
		}
		return mapCopy
	}

	// Handle Set
	if (obj instanceof Set) {
		const setCopy = new Set()
		map.set(obj, setCopy)
		for (const value of obj) {
			setCopy.add(deepClone(value, map))
		}
		return setCopy
	}

	let res = Array.isArray(obj) ? [] : {}
	map.set(obj, res)

	for (let key in obj) {
		// for...in会遍历原型链上的属性
		if (obj.hasOwnProperty(key)) {
			// 只拷贝对象自身的属性
			res[key] = deepClone(obj[key], map)
		}
	}
	return res
}

// 测试代码
const obj2 = {
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3
    }
  },
  f: [4, 5, 6],
  g: new Date(),
  h: /abc/,
  i: new Map([['a', 1], ['b', 2]]),
  j: new Set([1, 2, 3])
}
let cpObj = deepClone(obj2)
cpObj.b.d.e = 4
cpObj.j.add(4)
console.log(obj2, cpObj)