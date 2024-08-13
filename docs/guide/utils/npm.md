# 发布一个npm包

## 1. 创建npm账号

在[npm官网](https://www.npmjs.com/)注册一个账号，并设置邮箱。

## 2. 登录npm账号

在终端输入以下命令，登录npm账号：

```bash
npm login
```

### 遇到问题：Public registration is not allowed
![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/964c4197a2e54f2cb16a9d3f5af555f4~tplv-73owjymdk6-jj-mark:0:0:0:0:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjAzMjM0NDc0NDg1NzEyNyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1723627463&x-orig-sign=1IprbDSuK5befvHRddGqMkFLG9Y%3D)
### 解决方法：改变镜像
```bash
npm config set registry https://registry.npmjs.org/
```
发布完记得改回来，因为旧镜像不能使用了
```bash
npm config set registry https://registry.npmmirror.com/
```

## 4. 发布npm包
进入你的npm包目录，
在终端输入以下命令，发布npm包：
```bash
npm publish
```
后续需要更新版本，只需要修改`package.json`中的`version`字段，然后重新发布即可。
或者使用以下命令：
```bash
npm version patch
```
`patch`表示补丁版本，`minor`表示次版本，`major`表示主版本。
