#!/bin/bash

# 构建 Vitepress 项目
yarn build

# 创建一个临时目录用于保存构建生成的静态文件
# mkdir temp_deploy

# 将构建生成的静态文件复制到临时目录
cp -r docs/.vitepress/dist/* temp_deploy

# 切换到 gh-pages 分支
git checkout gh-pages

# 删除旧的构建文件
rm -rf *

# 将临时目录中的文件复制到当前目录
cp -r temp_deploy/* .

# 删除临时目录
rm -rf temp_deploy

# 提交更改并推送到远程仓库
git add .
git commit -m "Auto deploy"
git push origin gh-pages

# 切换回主分支
git checkout master
