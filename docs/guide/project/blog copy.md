---
title: 项目
titleTemplate: VitePress
---
## 前言 {#前言}

VitePress 是一个基于 Vue.js 和 Vite 构建的静态网站生成器，专注于快速搭建文档和技术博客

## 一、快速搭建项目 {#一、快速搭建项目}

* 步骤 1: 创建并进入一个目录
```sh
mkdir vitepress-starter && cd vitepress-starter
```

* 步骤 2: 初始化
```sh
yarn init -y
```

* 步骤 3: 本地安装 VitePress
```sh
yarn add vitepress -D
```

* 步骤 4: 创建你第一篇文档
```sh
mkdir docs && echo '# Hello VitePress' > docs/index.md
```

* 步骤 5: 在 package.json.添加一些script

```json
"scripts": {
    "dev": "vitepress dev docs --port 3333",
    "build": "vitepress build docs",
    "serve": "vitepress serve docs"
}
```

* 启动项目

```sh
yarn dev
```
[中文网](https://vitejs.cn/vitepress/guide/getting-started.html)


## 二、配置 {#二、配置}

#### 新建配置文件**config.js** 位置如下：
```sh
├─ docs
│  ├─ .vitepress
│  │  └─ config.js
│  └─ index.md
└─ package.json
```

#### 具体配置可参考：

* 顶部导航 & 侧边导航
```typescript
themeConfig: {
    nav: [
        {
           text: 'Guide', link: '/guide/test', activeMatch: '/guide/' 
        }
    ],
    sidebar: [
        {
            text: '项目搭建',
            collapsed: false,
            items: [
                { text: 'vitepress 搭建Blog', link: '/guide/project/blog' },
            ]
        },
    ],
}
```
* 页面内具体导航   

需要注意：**默认是二级标题** 
``` typescript
## test {#test}
```

* 完整的配置如下

```javascript
import { createRequire } from 'module'
import { defineConfig } from 'vitepress'

const require = createRequire(import.meta.url)

export default defineConfig({
  lang: 'en-US',
  title: '小易',
  description: '',

  lastUpdated: true,
  cleanUrls: true,

  head: [
    ['meta', { name: 'theme-color', content: '#3c8772' }],
    [
      'script',
      {
        src: 'https://cdn.usefathom.com/script.js',
        'data-site': 'AZBRSFGG',
        'data-spa': 'auto',
        defer: ''
      }
    ]
  ],

  themeConfig: {
    nav: nav(),

    sidebar: {
      '/guide/': sidebarGuide(),
    },

    // editLink: {
    //   pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
    //   text: 'Edit this page on GitHub'
    // },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/xiaoyi1255' }
    ],

    // footer: {
    //   message: 'Released under the MIT License.',
    //   copyright: 'Copyright © 2019-present Evan You'
    // },

    // algolia: {
    //   appId: '8J64VVRP8K',
    //   apiKey: 'a18e2f4cc5665f6602c5631fd868adfd',
    //   indexName: 'vitepress'
    // },

    // carbonAds: {
    //   code: 'CEBDT27Y',
    //   placement: 'vuejsorg'
    // }
  }
})

function nav() {
  return [
    { text: 'Guide', link: '/guide/test', activeMatch: '/guide/' },
  ]
}

function sidebarGuide() {
  return [
    {
      text: '项目搭建',
      collapsed: false,
      items: [
        { text: 'vitepress 搭建Blog', link: '/guide/project/blog' },
      ]
    },
  ]
}


```

## 三、部署 {#三、部署}

我这里选择的**github page**来部署的比较简单  
当然也可以买个服务器进行部署
* package.json配置打包命令
```json
"scripts": {
    "dev": "vitepress dev docs --port 3333",
    "build": "vitepress build docs",
    "serve": "vitepress serve docs",
    "deploy": "sh deploy.sh"
}
```
* 构建项目
```sh
yarn build 
```
* 生成dist => docs/.vitepress/dist
* 然后推送到git page 对应的分支就可以了


### GitHub创建项目

* 1.登录[github](https://github.com)
* 2.创建项目 **项目名** 规则 xxx.github.io   
xxx是用户名如：xiaoyi1255.github.io

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ac349df2ea364af89b897e55c8502ba2~tplv-k3u1fbpfcp-watermark.image?)
* 3.dist推到该git master分支

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1295be51e589485ab9e99d2bdfcad29d~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aab8dbdc98b24df78a1e53b243bbba9d~tplv-k3u1fbpfcp-watermark.image?)
* 4.Settings => Pages 去选择master分支

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5875a161b1e4445dae089ffbd00fad40~tplv-k3u1fbpfcp-watermark.image?)
* 5.每次push master分支就会自动进行部署

## 脚本进行部署 {#脚本进行部署}
相信各位看官 看到这里就开始吐槽了，这难道我改一次代码，我重新打包然后把dist再上传？

答案肯定是否定的:
* 1.我们可以git master分支用来开发
* 2.打包生成dist 
* 3.切换分支(gh-pages) 把dist上传
* 4.git pages部署的分支改为 **gh-pages** 上传dist

以上步骤可以使用代码来执行   
**我们先把先前的vitepress项目复制到dev 分支,然后新建一个自动化脚本**   

这里需要改git pages 为 gh-pages分支来部署

```sh
# 新建一个sh 文件 deploy.sh
#!/bin/bash

# yarn 
# 构建 Vitepress 项目
git ch -b temp

yarn

yarn build

# 创建一个临时目录用于保存构建生成的静态文件
mkdir temp_deploy

# 将构建生成的静态文件复制到临时目录
cp -r docs/.vitepress/dist/* temp_deploy

find . -mindepth 1 -maxdepth 1 ! -name '.git' ! -name '.gitignore' ! -name 'temp_deploy' -exec rm -rf {} \;
git add .
git commit -m "deploy"

git ch gh-pages

find . -mindepth 1 -maxdepth 1 ! -name '.git' ! -name '.gitignore' -exec rm -rf {} \;

git add .
git commit -m "deploy"

git merge temp

find . -mindepth 1 -maxdepth 1 ! -name '.git' ! -name '.gitignore' ! -name 'temp_deploy' -exec rm -rf {} \;

mv temp_deploy/* .


rm -rf temp_deploy

git add .
git commit -m 'deploy'


git branch -D temp

```
## 源码 {#源码}
[xiaoyi1255](https://github.com/xiaoyi1255/xiaoyi1255.github.io)