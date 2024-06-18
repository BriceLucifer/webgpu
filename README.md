# WEBGPU Tutorial
## JS环境配置
1. 安装nvm和nodejs
[nodejs](https://nodejs.cn/download/current/)
[nvm](https://github.com/coreybutler/nvm-windows/releases/download/1.1.12/nvm-setup.exe)
2. 输入一下内容 确认安装环境正常
```bash
node -v
nvm -v
npm -v
```
3. 自己创建一个文件夹然后在空文件夹 使用
```bash
npm init -y
```
然后会发现会出现一个文件名 package.json 作为类似makefile的json
## TS环境配置
1. 参考JS环境配置安装好nvm和nodejs
2. 然后开始安装TS在你的机器
```bash
npm i typescript ts-loader
```
3. 安装完成之后 如果需要项目初始化
```bash
tsc -init
```
输入命令之后就会出现 一个tsconfig.json
