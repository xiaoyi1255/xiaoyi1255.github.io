---
title: 内网穿透
titleTemplate: ngrok
---

## 前言
内网穿透是一种网络技术，用于将位于内部网络（内网）的计算机、服务器或设备暴露到外部网络（外网）中，使外部网络能够访问内网中的资源。
简单理解：其它人可以通过某个链接，直接访问你本地的 127.0.0.1:xxx的服务


## 工具： ngrok

[官网ngrok.com](ngrok.com)   

[后台管理](https://dashboard.ngrok.com/get-started/setup)

## 使用教程
1. 先注册账户，也可以直接使用git账户[登录](https://dashboard.ngrok.com/login)
2. 下载客户端，根据自己系统选择
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/382bf8aa33d646638d28626a6e1c1071~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1886&h=522&s=66464&e=png&b=bfdbff)
3. 下载完解压，然后双击运行 => 会打开一个小黑窗

4. 添加配置token 
```sh
ngrok config add-authtoken '你对应的token'
```
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cc53cbfaaf484313840f07c39dec159e~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1185&h=726&s=71169&e=png&b=fcfcfc)
5. 设置要暴露出去的端口如 80
```sh
ngrok http 80
```
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b2861415969c4df98dac47d7e9a0446e~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1064&h=377&s=469545&e=png&b=393e49)
看到上面面的图就是成功了
6. 外网访问：https://413f-111-9-47-121.ngrok-free.app/
他会报一个警告，点击 **visit Site** 按钮就好了
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eca9a7eefa98434c95f15e612dedda47~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1160&h=642&s=57777&e=png&b=fbfbfb)

7. 访问结果
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1de2ffc834af4bbe8af049e08138332e~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1245&h=748&s=66246&e=png&b=ffffff)

## 结语
原先是使用uTools里面的插件，前段时间去用，发现用不了， 然后就找到这个，效果也还行吧。除了域名很拉之外，都还好，哈哈！！！