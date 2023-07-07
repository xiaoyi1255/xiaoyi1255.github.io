#!/bin/bash

# yarn 
# 构建 Vitepress 项目
git ch -b temp

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