type JSONValue = null | boolean | number | string | JSONValue[] | { [key: string]: JSONValue };
type OnceFn = (...args: JSONValue[]) => JSONValue | undefined

function once(fn: Function): OnceFn {
  let flag = false
	return function (...args) {
		const result = fn.apply(null, args);
    if (!flag) {
      flag = true
      return result
    }
    return
	};
}

 let fn = (a,b,c) => (a + b + c)
 let onceFn = once(fn)

 onceFn(1,2,3); // 6
 onceFn(2,3,6); // returns undefined without calling fn
 console.log(onceFn(2,3,6));