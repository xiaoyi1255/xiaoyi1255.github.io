---
title: 网络
titleTemplate: 接口缓存
---
## 背景
其实我们在日常开发中，经常会遇到某些接口返回的数据是时效性不高的，那么这种接口的数据不需要每次都去重新请求。或者说可以让后端同学 做redis缓存。当然后端做缓存是最佳方案，因为假如数据变了之后，会及时同步redis

#### 当以下几种情况我们还是可以前端来做的：
* 数据时效性确实不高
* 请求比较耗时
* 公共接口（多个页面复用）

#### 注意
* 是否需要主动清除缓存（如退出登录）
* 缓存周期（视情况而定）

#### 实现思路：
* 声明设置、获取工具函数
* api层 请求接口前先判断是否有缓存且为过期
* 存在且未过期 （返回缓存数据）
* 不存在或者已过期 重新请求并在请求到之后重新设置缓存
* 需要主动清除的 用一个数组把key 存起来，到时候遍历清理就好

## 工具 {#工具}
```typescript
export const keys = [] // 用于清理 缓存（如退出登录等操作）
export function setDataToStorage(key, data, expiration = 1000 * 60 * 60 * 1) {
  if (keys.indexOf(key) > -1) {
    keys.push(key)
  }
  const currentTime = new Date().getTime();
  const storageData = {
    data,
    expiration: currentTime + expiration,
  };
  const jsonString = JSON.stringify(storageData);
  sessionStorage.setItem(key, jsonString);
}

export function getDataFromStorage(key) {
  const jsonString = sessionStorage.getItem(key);
  if (jsonString) {
    const storageData = JSON.parse(jsonString);
    const currentTime = new Date().getTime();
    if (currentTime <= storageData.expiration) {
      return storageData.data;
    } else {
      // 数据已过期，返回 false 或其他合适的值
      return false;
    }
  }
  return null; // 未找到对应的数据
}
```
## api层使用 {#api层使用}

```typescript
import { getDataFromStorage, setDataToStorage } from '/@/utils/cache/common'
enum Api {
    getData = '/admin/pay/currency'
}

export const getData =  async (params) => {
    const data = getDataFromStorage('bt_adnetworkList');
    if (data) {
      return Promise.resolve(data);
    } else {
      const res = await axios.post({ url: Api.getData, params });
      setDataToStorage('bt_adnetworkList', res);
      return res;
    }
};
```