import { createRequire } from 'module'
import { defineConfig } from 'vitepress'

const require = createRequire(import.meta.url)
const pkg = require('vitepress/package.json')

export default defineConfig({
  lang: 'en-US',
  title: 'VitePress',
  description: '小易',

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
      '/vue/': sidebarGuide(),
      // '/reference/': sidebarReference()
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
        { text: 'ref+依赖收集+更新', link: '/vue/ref' },
        { text: 'reactive', link: '/vue/reactive' },
        { text: 'computed', link: '/vue/computed' },
        { text: 'effect', link: '/vue/effect' },
        { text: '拦截工具函数', link: '/vue/intercept' },
        { text: 'watch & watchEffect', link: '/vue/watch' },
      ]
    },
    {
      text: '网络请求',
      collapsed: false,
      items: [
        { text: 'http缓存', link: '/network/httpCache.md' },
        { text: '接口数据缓存', link: '/network/dataCache.md' },
        { text: 'service Worker缓存', link: '/network/serviceWorker.md' },
        { text: 'axios 取消重复请求', link: '/network/axios.md' },
      ]
    },
    {
      text: '项目搭建',
      collapsed: false,
      items: [
        { text: 'vitepress 搭建Blog', link: '/project/blog' },
      ]
    },
  ]
}

function sidebarReference() {
  return [
    {
      text: 'Reference',
      items: [
        { text: 'Site Config', link: '/reference/site-config' },
        { text: 'Frontmatter Config', link: '/reference/frontmatter-config' },
        { text: 'Runtime API', link: '/reference/runtime-api' },
        { text: 'CLI', link: '/reference/cli' },
        {
          text: 'Default Theme',
          items: [
            {
              text: 'Overview',
              link: '/reference/default-theme-config'
            },
            {
              text: 'Nav',
              link: '/reference/default-theme-nav'
            },
            {
              text: 'Sidebar',
              link: '/reference/default-theme-sidebar'
            },
            {
              text: 'Home Page',
              link: '/reference/default-theme-home-page'
            },
            {
              text: 'Footer',
              link: '/reference/default-theme-footer'
            },
            {
              text: 'Layout',
              link: '/reference/default-theme-layout'
            },
            {
              text: 'Badge',
              link: '/reference/default-theme-badge'
            },
            {
              text: 'Team Page',
              link: '/reference/default-theme-team-page'
            },
            {
              text: 'Prev / Next Links',
              link: '/reference/default-theme-prev-next-links'
            },
            {
              text: 'Edit Link',
              link: '/reference/default-theme-edit-link'
            },
            {
              text: 'Last Updated Timestamp',
              link: '/reference/default-theme-last-updated'
            },
            {
              text: 'Algolia Search',
              link: '/reference/default-theme-search'
            },
            {
              text: 'Carbon Ads',
              link: '/reference/default-theme-carbon-ads'
            }
          ]
        }
      ]
    }
  ]
}
