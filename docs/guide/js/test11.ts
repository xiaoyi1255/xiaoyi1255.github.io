// 单例模式
function singleton(className) {
  let ins;
    return new Proxy (className,  {
      construct(target, argArray){
        if (!ins) {
          ins = new target(...argArray);
        }
        return ins;
      }
    })
}

class User {
}

const UserProxy = singleton(User);
const u11 = new UserProxy();
const u22 = new UserProxy();
console.log(u11 === u22);

class Singleton {
  private static instance: Singleton | null;
  private constructor() {}
  static getInstance() {
    return Singleton.instance ??= new Singleton();
  }
}
const u1 = Singleton.getInstance();
const u2 = Singleton.getInstance();
console.log(u1 === u2);

