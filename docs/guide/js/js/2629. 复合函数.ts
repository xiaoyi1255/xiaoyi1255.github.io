type F = (x: number) => number;

function compose(functions: F[]): F {
  return function (x:number): number {
    return functions.reduceRight((_, cur) =>{
      x = cur(x) as unknown as number;
      return x
    }, x);
  }
};
console.log(compose([(x: number) => x * 2, (x: number) => x + 1])(2));