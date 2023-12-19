type JSONValue = null | boolean | number | string | JSONValue[] | { [key: string]: JSONValue };
type Obj = Record<string, JSONValue> | JSONValue[]

function isEmpty(obj: Obj): boolean {
  return Array.isArray(obj) ? obj.length === 0 : Object.keys(obj).length === 0;
};

console.log(isEmpty({}))