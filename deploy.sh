#!/bin/bash

# yarn 
# 构建 Vitepress 项目
git ch -b temp
echo "🎸创建新分支： temp"

yarn

echo "🎸 开始打包----->>>>>>"
yarn build
echo "🎸 打包完成----->>>>>>"

# 创建一个临时目录用于保存构建生成的静态文件
echo "🎸 创建空目录 temp_deploy"
mkdir temp_deploy

# 将构建生成的静态文件复制到临时目录
echo "🎸 将打包的文件复制到 temp_deploy"
cp -r docs/.vitepress/dist/* temp_deploy

echo "🎸 删除多余文件 仅保留 .git .gitignore temp_deploy"
find . -mindepth 1 -maxdepth 1 ! -name '.git' ! -name '.gitignore' ! -name 'temp_deploy' -exec rm -rf {} \;
git add .
git commit -m "deploy"

echo "🎸 切换到部署分支 gh-pages"
git ch gh-pages

echo "🎸 先拉一下 远程最新代码"
git pull

echo "🎸 删除多余文件 仅保留 .git .gitignore"
find . -mindepth 1 -maxdepth 1 ! -name '.git' ! -name '.gitignore' -exec rm -rf {} \;

git add .
git commit -m "deploy"

echo "🎸 merge temp"
git merge temp

echo "🎸 删除多余文件 仅保留 .git .gitignore temp_deploy"
find . -mindepth 1 -maxdepth 1 ! -name '.git' ! -name '.gitignore' ! -name 'temp_deploy' -exec rm -rf {} \;

mv temp_deploy/* .

echo "🎸 删除多余文件 temp_deploy"
rm -rf temp_deploy

git add .
git commit -m 'deploy'

echo "🎸 git add ."
echo "🎸 git cpmmit -m deploy"

echo "🎸 删除 temp 分支"
git branch -D temp

echo "🎸 push 到 gh-pages"
git push

echo "🎸 切回 master分支"
git ch master

yarn