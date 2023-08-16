---
title: cloud
titleTemplate: 云服务器
---

### 前言

**主题**： 本文将介绍云服务器的购买及使用

**内容**： 本分将分为三个部分：首先云服务器的购买及登录；然后是node环境\git安装；最后是项目的部署及避坑点

**目的**：帮助第一次购买服务器的朋友避坑，也记录了自己踩过的坑

* * *
花112块 体验一年的快乐！！！   

* * *

## 一、服务器的购买及登录 {#一、服务器的购买及登录}

### 1. 服务器的选择

放眼市场云服务器的提供商是数不胜数，国内的：阿里云、腾讯云、京东云、网易云；出于阿里云的怀恋（大学的时候，有学生优惠和学校活动账户里还有大几百，高高兴兴地打开了阿里云控制台，TDM 过期啦），当然也在网上查了下阿里云算是云服务的龙头产品，然后就开始在看阿里云的**ECS服务器**了，选择了一款2核1G 40G存储，**差点**就付款了

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/67dc58a3be3242d59da6e7cd45e4dc60~tplv-k3u1fbpfcp-zoom-1.image)

下午的时候，看到腾讯云的**2核2G112元/年**；这次考虑都没考虑直接上车了，这就是112块就能享受到的一年的快乐😁😁

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a88645893d394c5394857bc0fc71c63b~tplv-k3u1fbpfcp-zoom-1.image)

### 2.购买及登录

官网： [https://cloud.tencent.com](https://cloud.tencent.com/)

* 首先需要先注册登录并实名认证，因为这款是活动秒杀的，2核2G 50G SSD盘是不可选的，然后可以选系统、地区等。认证成功、购买成功之后,收到手机短信和邮件。
* 这里我是选择的**window镜像**、地区选的上海
* 然后点击控制台 => 轻量服务器
* [点击进去](https://console.cloud.tencent.com/lighthouse/instance/index?rid=4) 第一次登录先重置密码
* 最后就通过密码就能远程登录服务器啦   
* 1.点击控制台
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fea7ab6f11fb49ac95c3fcf0911eb479~tplv-k3u1fbpfcp-watermark.image?)

* 2.找到轻量应用服务器

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ddf302bc105f4402a776d796e41af2e4~tplv-k3u1fbpfcp-watermark.image?)

* 3. 找个刚刚购买的服务器

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a051b2dcbdfb427d916f45618aa1b057~tplv-k3u1fbpfcp-watermark.image?)

* 4.重置密码

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1ada2cae3d5b4d14b4b03f77bca2f445~tplv-k3u1fbpfcp-watermark.image?)

* 5.重置好之后，点击登录，通过账号密码登录（也可以是其它）

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f876885a18a04ec58f0706084e3e8f28~tplv-k3u1fbpfcp-watermark.image?)

* 6.登录成功(首次登录成功桌面只有一个回收站)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eab3d41e5c9f4b44b32aec39dbbf9d63~tplv-k3u1fbpfcp-watermark.image?)

## 二、环境搭建及软件安装 {#二、环境搭建及软件安装}
* 浏览器：下载安装应用
* 忠于chrome 就先安装了个chrome浏览器
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1921162c77c5479c97d8ff6cdd95acc9~tplv-k3u1fbpfcp-watermark.image?)
### 安装node环境

* 官网安装：[https://nodejs.org](https://nodejs.org/) 可以选择自己需要的node版本进行安装，(云服务器自己使用就没有安装nvm来进行node版本管理，有需求的小伙伴可以自行安装)
* 通过微信文件传输网页版：[https://filehelper.weixin.qq.com](https://filehelper.weixin.qq.com),通过微信文件传输挺快的（亲测）

* 下载完成 一路安装就好了；安装完成在终端测试一下

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ee7274d0914e483c92ede14d85c1533b~tplv-k3u1fbpfcp-watermark.image?)

### git按装
* 官网安装： [https://git-scm.com](https://git-scm.com/)
* 也可以微信文件传输网页版

### 安装其它软件、环境 
* 同理 直接下载安装配置就可以了

## 三、项目部署 {#三、项目部署}
### 1.项目拉取 及部署
* 配置一下淘宝镜像
```bash
npm config set registry https://registry.npmmirror.com
```
* 全局安装一下 yarn | pnpm
```bash
npm i yarn -g
```
* 新建一个存放代码的文件夹
* 通过 **git clone**进行代码拉取
* 然后把项目跑起来
```bash
node server.js
yarn dev
```
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cf1260a7ba3f45c89f6263cb54f5150b~tplv-k3u1fbpfcp-watermark.image?)

看到这里这就部署好项目了。

### 2. 端口开放
* **端口开放端口开放端口开放！！！**终于的事情说三遍
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/40e099b2bbbd42c391a6e31226750d77~tplv-k3u1fbpfcp-watermark.image?)
我就是在这里踩的一个坑！！！！   
**问题描述**：ping 公网ip => 可以 ping 通，但是服务器起的服务的访问不了  
**原因**：服务的端口未开放
**避坑**我根据网上的教程：window防火墙=>入行=>新建入行规则；配置半天
人家在控制台明明就提供了可视化操作，我服了，(注意避坑朋友们！)

### 3.可以公网访问了，公网的ip在实例那里看

[chat](http://118.89.125.27:3001/chat),这是一个多人聊天室。  
聊天室的搭建在这里[即时通讯轻松实现：WebSocket、Vue 3 和 Node.js 缔造的多人实时交流平台](https://juejin.cn/post/7266037480750841896)

## 总结及注意点 {#总结及注意点}
* 腾讯云的112米 价格还是可以的，可以入手
* 购买、登录、环境搭建、项目部署上线;都挺方便的
* 公网ip是可以直接访问，还需要端口开放
* 地区选择：要离自己近的，，比如我的就是上海，，在四川访问感觉不快，然后翻墙访问贼慢
* 实例自测：是检测实例问题比较好的一个方式
* 实在解决不了的问题：可以提工单、也可以重装系统解决
* 

### 避坑点
* 端口开放=>直接在实例防火墙进行配置
* 安装软件时，不要安装360、关机之类的软件，(我就是刚开始，安装chrome的时候是先安装了360，才导致我端口开放了之后，外网还是访问不进来===>>最后是重装系统才解决的)
* 端口开放：只开放用得到的几个端口，可以配置100个够了；不然容易被攻击

最后：之前也在阿里云买过，性能啥的，感觉不出来，我感觉个人的2核2G 足够了，下面是cpu、SSD盘、运行内存的使用情况，只跑了一个node服务+一个vue项目
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/35e44b8dd0624e7fa982e9dbb10d4027~tplv-k3u1fbpfcp-watermark.image?)

本文介绍腾讯云服务器的购买及登录使用、node环境搭建、前后端项目部署上线以及踩坑点；没错就是112元可以让你快乐一年的云服务器实践指南。