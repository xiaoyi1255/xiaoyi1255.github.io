type JSONValue = null | boolean | number | string | JSONValue[] | { [key: string]: JSONValue };
type Obj = Record<string, JSONValue> | Array<JSONValue>;

function compactObject(obj: Obj): Obj {
  if (Array.isArray(obj)) { // 数组
    const res: JSONValue[] = []
    for (let i = 0; i < obj.length; i++) {
      const element = obj[i];
      if (element) {
        if (typeof element === "object" && element !== null) {
          res.push(compactObject(element))
        } else {
          res.push(element)
        } 
      }
    }
    return res
  } else { // 对象
    for (const key in obj) {
      const element = obj[key];
      if (element) {
        if (typeof element === "object" && element !== null) {
          obj[key] = compactObject(element)
        }
      } else {
        delete obj[key]
      }
    }
  }
 
  return obj;
};

console.log(compactObject([null, 0, false, 1, {a:0, b: 2}]))