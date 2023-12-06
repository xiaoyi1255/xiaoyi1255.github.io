type JSONValue = null | boolean | number | string | JSONValue[] | { [key: string]: JSONValue };
type Obj = Record<string, JSONValue> | Array<JSONValue>;

function chunk(arr: Obj[], size: number): Obj[][] {
	const result: Obj[][] = [];
  let count = Math.ceil(arr.length / size);
  while(count--){
    result.push(arr.splice(0, size));
  }
  return result;
};
