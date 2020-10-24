#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd src/.vuepress/dist

# deploy to github
if [ -z "$ACCESS_TOKEN" ]; then
  msg='deploy'
  githubUrl=git@github.com:baryon/MasterBitcoinSV.git
else
  msg='来自github action的自动部署'
  githubUrl=https://baryon:${ACCESS_TOKEN}@github.com/baryon/MasterBitcoinSV.git
  git config --global user.name "baryon"
  git config --global user.email "lilong@gmail.com"
fi
git init
git add -A
git commit -m "${msg}"
git push -f $githubUrl master:gh-pages # 推送到github

cd - # 退回开始所在目录
rm -rf src/.vuepress/dist 