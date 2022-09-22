# NxShell
一款跨平台的SSH新终端工具,就像当下流行的PuTTY终端一样.但NxShell随着后期功能的迭代完善,会生长出自己独有的终端工具超能力.

## 软件界面截图

<div align="center">
  <div style="display: flex;justify-content: space-between;">
    <img src="https://raw.githubusercontent.com/nxshell/nxshell/main/screenshots/mac.png" />
  </div>
</div>

欢迎访问界面截图集 [截图](https://github.com/nxshell/nxshell/tree/main/screenshots).

## 基于源代码开发新功能
> open an terminal
```
git clone https://github.com/nxshell/shell.git
cd shell
git clone https://github.com/nxshell/core.git
cd core && npm i
cd .. && npm i
npm run serve
```

> open other terminal
```
node devtools/rundev.js
```

## 功能

- 支持SSH/Sftp/ftp/Serial/VNC协议
- 支持linux/windows/macos多端平台
- 支持中文和英文两种语言
- 支持ssh隧道socksv5，当前开启后默认监听在localhost:10080
- 支持会话管理,导入和导出功能等
- 支持ssh rz/sz命令文件上传下载
- 支持终端主题配置
- 支持终端日志管理
- 支持分组分屏展示
- 支持全屏模式
- 支持同时发送命令到多个打开的ssh会话中
- 支持会话锁定
- 支持快捷键操作
- 支持sftp在线编辑器

## 待开发的功能(TODO)

- [ ] NxShell 2.0

## 提交Bug

欢迎提交bug到github的issue列表 [提交](https://github.com/nxshell/nxshell/issues)

## 安装NxShell
* 微软应用商店下载. [link](https://www.microsoft.com/store/apps/9N0NP4JJ192W)
* Ubuntu官方商店snap下载. [link](https://snapcraft.io/nxshell)
* Github官方release下载. [link](https://github.com/nxshell/nxshell/releases)
* 安卓Alpha应用下载.[link](https://github.com/nxshell/nxshell-mobile/releases)
* 安卓应用商店下载.[GP link](https://play.google.com/store/apps/details?id=com.nxshell.nxshell)
* 从daily build 仓库下载安装. [link](http://106.15.238.81:52080/)
> 由于DMG的Mac包没有签名, 需要右键菜单中的打开运行

## 使用说明
- NxShell社区二进制分发版本提供基础的SSH/SFTP功能供大家免费使用，支持作者继续提供好用的开发工具，欢迎捐献NxShell社区继续成长！
- 如有公司/团队需要定制功能以及应用到私有软件仓库，请联系作者提供技术支持！

## 捐献社区
<div align="center">
  <div style="display: flex;justify-content: space-between;">
    <img src="https://raw.githubusercontent.com/nxshell/nxshell/main/screenshots/wpay.jpg" width = "300" height = "300"/>
  </div>
</div>


## 联系我们

微信号: yuniot8

QQ群： 199234440

邮箱: 82828068 At qq.com

## 支持NxShell
当前NxShell仅支持中文和英语两种语言，如果您有其它语言优势，欢迎加入我们一起翻译更多的语言包(日语、德语、法语、英语等)

## 用户案例
欢迎提交用户案例到这里 [here](https://github.com/nxshell/nxshell/pulls), 不论是团队或公司.
 - NxShell team
 - ...

<!--
**nxshell/nxshell** is a ✨ _special_ ✨ repository because its `README.md` (this file) appears on your GitHub profile.

Here are some ideas to get you started:

- 🔭 I’m currently working on ...
- 🌱 I’m currently learning ...
- 👯 I’m looking to collaborate on ...
- 🤔 I’m looking for help with ...
- 💬 Ask me about ...
- 📫 How to reach me: ...
- 😄 Pronouns: ...
- ⚡ Fun fact: ...
-->

