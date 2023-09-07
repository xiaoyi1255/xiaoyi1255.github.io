---
title: wechat
titleTemplate: login
---
这个铁子写的很全了，我补一点我遇到的坑吧
https://juejin.cn/post/7234394174274158650


## 踩坑实录：
### 获取域名 => 内网穿透
### ngrok.com (不行)
[ngrok](https://ngrok.com/) 内网穿透弄了一个https 的，，但是没有证书，所以报安全隐患，并且请求一直没有到达我的服务器。速度好像比下面那个快一点。
### ngrok.cc (2元 可以)
[ngrok.cc](https://ngrok.cc/) 这个弄了一个免费的，，还可以,需要实名认证费2元
* 注册 => 登录 => 隧道管理 => 开通隧道 => 滑到最下面 => 填写信息 => 提交
[使用教程](https://www.ngrok.cc/_book/start/ngrok_windows.html)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e845c07f8e45448da34478dd45f866ff~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1485&h=942&s=144739&e=png&b=ffffff)
```javascript
url: 自己的服务器域名
Token： 自己随便填写 需要和代码里的保持一致
秘钥：随机生成
加密方式： 明文
```
## 微信公众服务器配置 => token验证不通过
登录了微信公众平台：https://mp.weixin.qq.com/
设置与开发 => 基本设置 => 服务器配置
* 在这里配置服务器url，然后提交，一直报 token 验证不通过
* url是 https 需要能正常访问(在浏览器访问不报 安全隐患)
[然后就是漫长的痛苦之路](https://developers.weixin.qq.com/community/search?query=%25E5%2585%25AC%25E4%25BC%2597%25E5%258F%25B7%25E6%258E%25A5%25E5%2585%25A5-%25E5%25A1%25AB%25E5%2586%2599%25E6%259C%258D%25E5%258A%25A1%25E5%2599%25A8%25E9%2585%258D%25E7%25BD%25AE-token%25E9%25AA%258C%25E8%25AF%2581%25E5%25A4%25B1%25E8%25B4%25A5&page=1&block=1&random=1693900223289&type=1)
* 因为自己在腾讯云买的大陆服务器，所以域名：需要进行备案，，奈何备案提交了两次被工信部**驳回**。
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cff22aeed8cc4605b4fd4e801186602e~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1823&h=487&s=49645&e=png&b=ffffff)

