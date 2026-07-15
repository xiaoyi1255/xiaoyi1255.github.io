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




