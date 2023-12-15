interface MyObject {
  [key: string]: any; // key是字符串，value可以是数字或字符串
}

class TimeLimitedCache {
  private cache: MyObject = {};
  constructor() {

  }

  set(key, value, duration) {
    const currentTime = Date.now();
    const cacheItem = this.cache[key];
  
    if (cacheItem && currentTime <= cacheItem.expire) {
      // 缓存未过期
      cacheItem.value = value;
      cacheItem.expire = currentTime + duration;
      return true;
    }
  
    // 缓存不存在或已过期
    this.cache[key] = {
      value,
      expire: currentTime + duration
    };
  
    return false;
  }

  get(key: number): number {
    const cacheItem = this.cache[key];
    const currentTime = Date.now();
    if (cacheItem && currentTime <= cacheItem.expire) {
      return cacheItem.value;
    }
    return -1;
  }

  count(): number {
    let res: number = 0;
    const currentTime = Date.now();
    for (const key in this.cache) {
      if (this.cache.hasOwnProperty(key) && currentTime <= this.cache[key]?.expire) {
        res++;
      }
    }
    return res;
  }
}

/**
* const timeLimitedCache = new TimeLimitedCache()
* timeLimitedCache.set(1, 42, 1000); // false
* timeLimitedCache.get(1) // 42
* timeLimitedCache.count() // 1
*/