---
title: 项目
titleTemplate: 邮件
---
## 前言 {#前言}

**主题**： 本文基于nuxt3 + nodemailer 实现邮件发送的功能

**内容**：本文分为三个部分：首先是插件介绍，然后是代码实现，最后是注意事项

**目的**：手模手 实现一个发送邮件功能

  


* * *

## 环境准备： {#环境准备：}

**框架**：基于 nuxt3 搭建的SSR 项目 对于nuxt3项目搭建可以参考 [SSR-Nuxt3项目搭建](https://juejin.cn/post/7204471695544336439)

**插件**： [nodemailer](https://www.npmjs.com/package/nodemailer)

**node**：14.18.1 [node版本应该没有有要求]

## 一、介绍及使用 {#一、介绍及使用}

#### 1. nodemailer

**Nodemailer**是一个流行的Node.js模块，用于发送电子邮件。它可以发送包含HTML，文本和附件的邮件，并支持多种协议，如SMTP、SMTPS、Sendmail、Amazon SES、和其他传输协议。Nodemailer还提供了许多功能，例如发送定时邮件、SMTP认证、SSL和TLS支持、自定义头和邮件模板等。

#### 2. nuxt3

**Nuxt3**是一个基于Vue.js实现的服务端渲染框架。其提供了很多功能：路由，中间件，插件，自定义hook,状态管里等等。它支持服务端渲染（SSR），静态生成（SSG），客户端渲染（CSR）。它都采用约定式的文件命名方式来开发，如路由只需要写在pages下的默认当然页面，嵌套级为二级页面， 当我们没有写pages的时候，默认不会引入Router, 还有 页面中使用的vue 方法像 reactive，ref,watch 这些全都不需要引入，就可以直接使用。

#### 3. server

**server** 层也就是node 层，所谓的服务端渲染：在服务端做**初始化请求**、 HTML页面构建渲染，再返回给前端，如果对首屏渲染时间、或者SEO有较高要求，服务端渲染是个不二之选。因为像Vue 、React 前端框架搭建的 SPA 项目它是单页应用，就是只有一个HTML，并且会把页面、组件都挂载在一个div上，首屏的时候会做很多页面初始化请求、构建页面，所以就会很慢。

**nuxt**项目中：我们只需要创建server文件夹，就可以在上面做一些node能的事情比如请求转发、拦截、修改，时效性不高的接口数据进行缓存、存redis、还有鉴权呀等等。本文主要是 使用node 去实现一下邮件的发送。

吹不下去了，上菜上菜👻

## 二、邮件功能实现 {#二、邮件功能实现}

#### 1. 安装:

**nuxt3** 搭建项目我这里就不赘述了，参考： [SSR-Nuxt3项目搭建](https://juejin.cn/post/7204471695544336439) 项目目录如下

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/41bbc3b3b1784361bd4b026139225fbf~tplv-k3u1fbpfcp-zoom-1.image)

**nodemailer**

```typescript
yarn add nodemailer
or
npm i nodemailer
```

#### 2. 代码编写

新建 server/api/sendEmail.ts

```typescript
import nodemailer from 'nodemailer';

export default defineEventHandler(async (context) => {
    const params = await readBody(context) || {} // 讀取參數
    const transporter = nodemailer.createTransport({
        host: 'smtp.qq.com',
        port: 465, // SMTP 端口
        secure: true, // 使用 SSL
        secureConnection: true, // 使用 SSL
        auth: {
            user: "xxxx@qq.com",
            pass: 'xxxxhqvfqdwsupvbdiaj' // 这是邮箱去申请的开启服务的密码，POP3/IMAP/SMTP/Exchange/CardDAV/CalDAV服务
        }
    });
    const mailOptions = {
        from: '2xxxx@qq.com', // 发件地址
        to: 'xxxx@qq.com', // 收件列表
        subject: 'Hollo', // 标题
        html: '<b>Hello world ?</b>' // html 内容
    };

    mailOptions.html = getHtml(params)
    let resp = null
    const resObj = {
        code: 200,
        msg: '',
        data: {
            messageId: ''
        }
    }
    try {
        console.log('开始发送邮件')
        resp = await transporter.sendMail(mailOptions)
    } catch (error) {
        console.log('报错了', error)
        resObj.code = 10001
        resObj.msg = 'Submit Fail !'
    } finally {
        console.log('发送完成', resp)
        if (resp?.messageId) {
            resObj.msg = 'Submit Success !'
            resObj.data.messageId = resp.messageId
        }
        return resObj
    }
})
// 构建发送的邮件内容
function getHtml(params: object) {
    let html = ""
    if (Object.keys(params).length) {
        const formNames = {
            "name": "姓名",
            "email": "邮箱",
            "messenger": "公司",
            "messengerAct": "手机",
            "txt": "留言",
        }
        for (let k in params) {
            html += `<p style="line-height: 48px;color: #666666;border-bottom: 1px solid #dddddd;">
                        <span style="color: #333333; width: 100px;">${formNames[k]}：</span>
                        ${params[k]}
                    </p>`
        }
    }
    return html
}
```

定义完就可以去页面中使用啦

pages/test.vue

```typescript
<template>
  <h1 @click="submit">發送郵件</h1>
</template>
<script setup lang="ts">
async function submit() {
  const res = await useFetch("/api/sendEmail", {
    method: "POST",
    params: {
      name: "小易",
      job: "前端",
    },
  });
  console.log(res);
}
</script>
```

#### 3. 测试一下

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a9d6abd6d921409cb75a26891afc66bb~tplv-k3u1fbpfcp-zoom-1.image)

恭喜你 大功告成 😎😎

## 源码： {#源码：}

<https://github.com/xiaoyi1255/nuxt3-temple>

感兴趣朋友们可以试一试哦，觉得麻烦的可以吧 ，账号信息的配置 提到环境配置文件中

## 注意事项 {#注意事项}

-   注意 SMTP 服务器地址、端口、认证方式、用户名和密码（去邮箱申请开启服务）等
-   注意发件邮箱需要和auth 邮箱一致
-   注意邮件的主题、内容、附件等信息的正确性和完整性，尽可能提高邮件的送达率和稳定性。
-   意防止邮件滥发、垃圾邮件等问题
