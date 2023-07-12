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
      text: 'Vue3源码学习',
      collapsed: false,
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
      text: '网络请求',
      collapsed: false,
      items: [
        { text: 'http缓存', link: '/guide/network/httpCache.md' },
        { text: 'service Worker缓存', link: '/guide/network/serviceWorker.md' },
        { text: 'axios 取消重复请求', link: '/guide/network/axios.md' },
        { text: '接口数据缓存', link: '/guide/network/dataCache.md' },
      ]
    },
    {
      text: '项目搭建',
      collapsed: false,
      items: [
        { text: 'vitepress搭建技术文档、个人博客', link: '/guide/project/blog' },
        { text: 'nuxt3 搭建项目', link: '/guide/project/nuxt3' },
        { text: 'nodemailer实现邮件发送', link: '/guide/project/nodemailer' },
      ]
    },
  ]
}

