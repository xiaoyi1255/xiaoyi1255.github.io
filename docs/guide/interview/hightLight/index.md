<!--
 * @Author: taijingming 
 * @Date: 2026-07-13 10:22:23
 * @LastEditors: taijingming
 * @LastEditTime: 2026-07-15 18:56:26
 * @FilePath: /xiaoyi1255.github.io/docs/guide/interview/hightLight/index.md
 * @Description: 
 * 
 * Copyright (c) 2026 by ${git_name_email}, All Rights Reserved. 
-->

 
## 构建优化
1. h5:打包时，过期页面剔除（8分钟 => 3分钟）
2. webpack 构建后台项目实际过长 => 使用vite来构建

## 安全方面
1. 站外检测 -> 通过ua、消息、appk -> 检测站外访问 -> 重定向下载页
2. 白屏检测 -> 监听 window.error(捕获阶段) -> js 404 -> 屏幕采样 -> 无dom -> 上报白屏
3. 数据安全
    1. 接口 加解密(放客户端去解)
    2. 腾讯人机校验()
    3. 敏感信息 使用加密
    4. 重写vue mounted => 不满足不挂载(重写$mount)
4. 三方服务更新：本地跑的node服务，监测固定的npm包版本更新，然后发钉钉群
5. 后台通用日志模块封装 => 记录用户后台的操作记录（按钮、接口、数据、模块、页面）

## 提效工具
1. 埋点可视化测试（gif 上报埋点，QA测试麻烦）
2. 环境区分
    1. （test\office）会展示对应的标识：构建时间、分支、commit信息、环境
    2. 后台、公会、中台 对应环境展示（运营老是把测试 生产搞混）
3. 自动登录 - 开发、测试环境的登录问题解决（原来一直去app复制UA）
4. 解密工具 - 接口加密 -> 预发布环境（数据排查） -> 手动解密（chrme）工具
5. 发送url、复制url、发送ua、刷新页面 等常规h5操作工具集封装
6. 任意门：提升本地调试效率 => 启动项目 => 获取ip => 通过websocket => 实现信息共享
7. api 生成 -> 配置关键词 => 调用swagger => 生成api.js
8. 三方插件 => h5 页面上 快捷键 直接定位到对应 代码位置

1、6年前端开发经验：熟悉Vue2/Vue3生态与TypeScript,主导过视频流/中台/后台等多类型产品的开发
2、擅长性能优化：熟悉浏览器渲染原理及调优，有前端缓存、首屏优化、打包体积优化、预/懒加载优化的实战经验
3、擅长AI全栈：熟悉服务端开发（Nestjs/Koa/Egg），有Node.js BFF层实战经验
4、熟悉使用：Nodejs、Koa、Egg、Nestjs、Nuxtjs、Nextjs等中间层框架
5、熟悉使用：Cursor/trae/Copilot提升开发效率
6、熟悉使用：EventLoop、webWorker/serviceWoker多线程、跨域处理


1、拥有 6 年前端开发经验，精通 Vue2/Vue3 生态与 TypeScript，主导视频流、企业中台、管理后台等多类型项目开发，具备复杂业务抽象、需求落地能力。
2、深入理解浏览器渲染、JS 运行机制（EventLoop、WebWorker/ServiceWorker），拥有首屏加载、打包体积、缓存策略、懒加载等全链路性能优化实战经验。
3、具备前后端全栈能力，熟练使用 NestJS/Koa/Egg 开展 Node.js 开发，拥有 BFF 中间层建设实战经验；了解 Next.js/Nuxt.js 服务端渲染方案。
4、深度运用 AI 开发工具链，主力使用 Cursor，通过自定义 Rule、Skill 固化团队编码规范与工作流程，赋能组件编写、页面重构、代码 Review 工作，持续提升团队研发效率。
5、扎实 JavaScript 底层基础，熟练处理跨域、异步并发、大文件上传、SSE/WebSocket 流式通信等常见复杂前端场景。

1、6年前端开发经验，熟悉Vue2/Vue3与TypeScript，主导视频流、中台、后台系统等项目开发，擅长复杂业务前端方案设计。
2、掌握浏览器底层原理，拥有首屏优化、构建打包优化、前端缓存、预/懒加载等性能调优落地经验。
3、具备全栈开发能力，熟练使用 NestJS/Koa/Egg 搭建 Node.js BFF 中间层，了解 Nest/Nuxt SSR 框架。
4、深度使用 Cursor 开展日常开发，通过自定义 Rule、Skill 沉淀标准化工作流，支撑页面重构、组件开发、自动化代码评审，借助 AI 工具持续提升交付效率。
5、熟悉异步机制、WebWorker、跨域、WebSocket/SSE 等技术，能够独立解决各类前端复杂工程问题。