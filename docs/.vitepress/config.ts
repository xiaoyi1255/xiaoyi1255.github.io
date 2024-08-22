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
    ['meta', { name: 'referrer', content: 'no-referrer' }],
    [
      'script',
      {
        src: 'https://unpkg.com/valine/dist/Valine.min.js'
      }
    ]
  ],

  transformHead({ page }) {
    if (page === 'index.md') {
      return [
        ['link', { rel: 'preload', as: 'image', href: '/vue.svg' }],
        ['link', { rel: 'preload', as: 'image', href: '/vite.svg' }]
      ]
    }
  },

  themeConfig: {
    nav: nav(),

    sidebar: {
      '/guide/': sidebarGuide(),
      '/flutter/': sidebarFlutter(),
    },

    editLink: {
      pattern: 'https://github.com/xiaoyi1255/xiaoyi1255.github.io/edit/master/docs/:path',
      text: 'Edit this page on GitHub'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/xiaoyi1255' }
    ],

    // footer: {
    //   message: 'Released under the MIT License.',
    //   copyright: 'Copyright © 2019-present Evan You'
    // },

    algolia: {
      appId: 'IPEOGH904I',
      apiKey: '7001393f64b263b1fc44c1094b263008',
      indexName: 'xiaoyi1255io'
    },

    // carbonAds: {
      //   code: 'CEBDT27Y',
      //   placement: 'vuejsorg'
    // }
  },
})

function nav() {
  return [
    { text: 'Guide', link: '/guide/test', activeMatch: '/guide/' },
    ...sidebarFlutter(), // flutter
  ]
}

function sidebarGuide() {
  return [
    {
      text: 'Vue3源码学习',
      collapsed: true, // true:目录自动展开 [pc端生效]
      items: [
        { text: 'ref+依赖收集+更新', link: '/guide/vue/ref' },
        { text: 'reactive', link: '/guide/vue/reactive' },
        { text: 'computed', link: '/guide/vue/computed' },
        { text: 'effect', link: '/guide/vue/effect' },
        { text: '拦截工具函数', link: '/guide/vue/intercept' },
        { text: 'watch & watchEffect', link: '/guide/vue/watch' },
      ]
    },
    {
      text: 'Vue2、Vue3',
      collapsed: true, // true:目录自动展开 [pc端生效]
      items: [
        { text: 'Vue全局错误处理', link: '/guide/project/vue' },
        { text: '2024前端面试题汇总之vue(基础篇)', link: '/guide/vue/interview/vue' },
      ]
    },
    {
      text: '网络请求',
      collapsed: true,
      items: [
        { text: 'http缓存', link: '/guide/network/httpCache.md' },
        { text: 'service Worker缓存', link: '/guide/network/serviceWorker.md' },
        { text: 'web worker', link: '/guide/js/worker/worker.md' },
        { text: 'axios 取消重复请求', link: '/guide/network/axios.md' },
        { text: '接口数据缓存', link: '/guide/network/dataCache.md' },
        { text: '输入URL到页面渲染流程', link: '/guide/network/输入URL到页面渲染流程' },
        { text: '前端网络安全', link: '/guide/network/前端网络安全.md' },

      ]
    },
    {
      text: '项目搭建',
      collapsed: true,
      items: [
        { text: 'vitepress搭建技术文档、个人博客', link: '/guide/project/blog' },
        { text: '给vitepress加上全局搜索', link: '/guide/project/algolia' },
        { text: 'nuxt3 搭建项目', link: '/guide/project/nuxt3' },
        { text: 'nodemailer实现邮件发送', link: '/guide/project/nodemailer' },
        {
          text: '构建高效的聊天室',
          collapsed: true,
          items: [
            { text: '1.websocket实现基础通信',link: '/guide/chat/websocket' },
            { text: '2.支持图片、视频消息',link: '/guide/chat/websocket2' },
            { text: '3.消息转存redis',link: '/guide/chat/redis' },
            { text: '4.在线状态管理：心跳机制',link: '/guide/chat/heartbeat' },
            { text: '5.实现大文件分片上传',link: '/guide/chat/uploadLargeFile' },
            { text: '6.腾讯云服务器进行项目PM2部署',link: '/guide/chat/cloud' },
            { text: '7.微信订阅号实现登录',link: '/guide/chat/wechatLogin' },
            { text: '8.支持emoji表情',link: '/guide/chat/emoji' },
            { text: '9.五子棋在线对战',link: '/guide/chat/fiveline' },
          ]
        },
        { text: '无感刷新Token', link: '/guide/chat/token' },
        { text: 'vue项目代码混淆', link: '/guide/project/obfuscator' },
        { text: '仿抖音-视频流播放', link: '/guide/project/video' },

      ]
    },
    {
      text: 'JS面试系列',
      collapsed: true,
      items: [
        { text: '1、判断两数组内容相等', link: '/guide/js/arraryEqual'},
        { text: '2、js进行大数相加', link: '/guide/js/addNum'},
        { text: '3、SSE实现站内信', link: '/guide/js/message'},
        {
          text: 'js基础',
          collapsed: true,
          items: [
            { text: 'js基础', link: '/guide/js/base'},
            { text: 'js手写题', link: '/guide/js/jsWrite'},
            { text: '手写Promise', link: '/guide/js/promise'},
            { text: 'ES6~ES14', link: '/guide/js/ES6'},
          ]

        },
        {text: '5、js实现图片压缩',link: '/guide/js/compressImg'},
      ],
    },
    {
      text: '工具集',
      collapsed: true,
      items: [
        { text: '免费的内网穿透工具: ngrok', link: '/guide/utils/ngrok'},
        { text: '发布一个npm包', link: '/guide/utils/npm'},
      ],
    },
    {
      text: '那些年踩过的坑',
      collapsed: true,
      items: [
        { text: '同学醒醒，bug来了', link: '/guide/bug/index'},
        { text: 'ant-design-vue的message', link: '/guide/bug/message'},
      ],
    },
  ]
}

function sidebarFlutter() {
  return [
    {
      text: 'Dart基础语法',
      collapsed: true, // true:目录自动展开 [pc端生效]
      items: [
        { text: 'dart基础类型之num', link: '/flutter/num' },
        { text: 'dart基础类型之Sting', link: '/flutter/string' },
        { text: 'dart类型之List', link: '/flutter/List' },
        { text: 'dart类型之Map', link: '/flutter/Map' },
        { text: 'dart类型之Set', link: '/flutter/Set' },
        { text: 'dart之Class', link: '/flutter/Class' },
        { text: 'dart之Function', link: '/flutter/Function' },
      ]
    },
  ]
}