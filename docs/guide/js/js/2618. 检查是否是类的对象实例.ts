function checkIfInstanceOf(obj: any, classFunction: any): boolean {
  if (obj === null || obj === undefined) return false;
  if (classFunction === null || classFunction === undefined) return false;
  let proto = Object.getPrototypeOf(obj);
  while(proto !== null) {
    if (classFunction.prototype === proto) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false;
};

console.log(checkIfInstanceOf(new Date(), Date));
console.log(checkIfInstanceOf(null, null));
/**
 * checkIfInstanceOf(new Date(), Date); // true
 */