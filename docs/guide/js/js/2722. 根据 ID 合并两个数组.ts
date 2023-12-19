type JSONValue = null | boolean | number | string | JSONValue[] | { [key: string]: JSONValue };

function join(arr1: JSONValue[], arr2: JSONValue[]): JSONValue[] {
  const map = new Map<number, JSONValue>();
  const newArr = [...arr1, ...arr2]
  let result: any = {}
  newArr.forEach((item: any) => {
    if (!map.has(item.id)) {
      map.set(item.id, item);
      result[item.id] = item
    } else {
      result[item.id] ={...map.get(item.id) as unknown as Object,...item}

    }
  })
  result = Object.values(result)
  result.sort((a, b) => a.id - b.id)
  return result
};

console.log(join([{ id: 3, x: 2, y: 2 }], [{ id: 1, x: 3 }, { id: 3, x: 6 }]));