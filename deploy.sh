#!/bin/bash

# 构建 Vitepress 项目
yarn run build

# 切换到 gh-pages 分支
git checkout gh-pages

# 删除旧的构建文件
rm -rf *

# 将构建生成的静态文件复制到当前目录
cp -r docs/.vitepress/dist/* .

# 提交更改并推送到远程仓库
git add .
git commit -m "Auto deploy"
git push origin gh-pages
