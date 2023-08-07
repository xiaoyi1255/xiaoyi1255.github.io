---
title: 项目
titleTemplate: Blog
---
## 前言 {#前言}

VitePress 是一个基于 Vue.js 和 Vite 构建的静态网站生成器，专注于快速搭建文档和技术博客！
-----
这篇文章：你将能从0到1创建部署属于自己的博客、技术文档。来吧！展示！

## 准备工作 {#准备工作}

### 创建git仓库并配置好部署环境

* 1.登录[github](https://github.com) 
* 2.创建项目 **项目名** 规则 xxx.github.io   如：xiaoyi1255.github.io
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ac349df2ea364af89b897e55c8502ba2~tplv-k3u1fbpfcp-watermark.image?)
* 3.创建未来要部署的分支 gh-pages
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/12aeaeeca0114302909600afea161b86~tplv-k3u1fbpfcp-watermark.image?)

* 4.Settings => Pages 去选择 gh-pages 分支
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/797c0e58acd44ee182d3cb3d6a2e8d78~tplv-k3u1fbpfcp-watermark.image?)
* 5.每次push **gh-pages**分支就会自动进行部署

## 一、快速搭建项目 {#一、快速搭建项目}

* 步骤 1: 拉取创建好的git项目
```sh
git clone https://github.com/xiaoyi1255/xiaoyi1255.github.io.git
```

* 步骤 2: 初始化 yarn | npm | pnpm 看喜好来
```sh
yarn init -y
```

* 步骤 3: 本地安装 VitePress
```sh
yarn add vitepress -D
```

* 步骤 4: 创建你第一篇文档
```sh
mkdir docs && echo 'Hello VitePress' > docs/index.md
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
|  └─ guid
|     └─ test.md
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
            text: 'test',
            collapsed: false,
            items: [
                { text: 'test1', link: '/guide/test' },
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

* package.json配置build打包命令
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
* 1. build生成dist => docs/.vitepress/dist
* 2. 把dist里面的文件推送到git **gh-pages** 分支就可以了
* 3. 先把dist文件复制好，再切换到gh-pages然后粘贴再push

## 脚本进行部署 {#脚本进行部署}
相信各位看官 看到这里就开始吐槽了，难道我改一次代码，我重新打包然后把dist再上传？  

答案肯定是否定的: 以上步骤可以使用代码来执行
### 创建deploy.sh => 添加到package.json => yarn deploy
* 1.在根目录创建一个deploy.sh
**注意**：git ch 是我自定义的git 指令 git ch === git checkout
```sh
# 通过 git config --global alias.ch 设置
git config --global alias.ch checkout
```
```sh
# 根目录新建一个deploy.sh文件
#!/bin/bash

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
git push

git branch -D temp
git ch -b master

```
* 2. package.json
```json
"scripts": {
  "dev": "vitepress dev docs --port 3333",
  "build": "vitepress build docs",
  "serve": "vitepress serve docs",
  "deploy": "sh deploy.sh"
}
```
* yarn deploy 自动化部署 也可以 终端直接跑**sh deploy.sh**
```sh
yarn deploy
```
恭喜你！到这里你就可以去github settings => pages 看了
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e4c6044c768845f7a44094ae3b10fdbf~tplv-k3u1fbpfcp-watermark.image?)

## 网络资源图片403解决 {#网络资源图片403解决}
```typescript
// docs/.vitepress/config.ts 
export default defineConfig({
  ...
  head: [
    ['meta', { name: 'referrer', content: 'no-referrer' }],
  ],
  ...
})
```

## 源码 {#源码}
[xiaoyi1255](https://github.com/xiaoyi1255/xiaoyi1255.github.io)