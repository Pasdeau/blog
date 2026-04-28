---
title: 用 Hexo 搭建个人博客
date: 2026-03-29
comments: true
lang: zh
mathjax: false
toc: true
categories:
  - Technical Share
  - Misc
tags:
  - Hexo
  - GitHub
  - Vercel
  - GoDaddy
  - 建站
description: 一篇从零开始的 Hexo 建站教程，涵盖本地环境搭建、GitHub 托管、Vercel 自动部署，以及通过 GoDaddy 购买域名的过程。
---
Hexo 是一款基于 Node.js 的静态博客框架，作者在本地用 Markdown 写文章，Hexo 负责把它们变成可以部署的静态网页。本文介绍从零开始搭建 Hexo 博客的完整流程，提供两条路线：

- **免费方案**：Hexo + GitHub + GitHub Pages，得到 `username.github.io` 的地址
- **自定义域名方案**：在此基础上加入 Vercel 部署 + GoDaddy 购买域名

---

## 1. 整体架构

各组件职责如下：

|              组件              |                  职责                  |
| :-----------------------------: | :------------------------------------: |
|         **Hexo**         | 将 Markdown 文章编译成静态 HTML/CSS/JS |
|        **GitHub**        |  存放博客源码，版本管理，触发自动部署  |
| **GitHub Pages / Vercel** |       将生成的静态页面发布到公网       |
|        **GoDaddy**        |          购买并管理自定义域名          |

整条链路：

```
本地 Markdown 写作
      ↓ hexo generate
静态文件（public/）
      ↓ git push
GitHub 仓库
      ↓ 自动构建
GitHub Pages 或 Vercel 发布
      ↓（可选）自定义域名访问
```

---

## 2. 环境准备

安装以下工具：

- [Node.js](https://nodejs.org/)（建议 LTS 版本）
- [Git](https://git-scm.com/)
- GitHub 账号

然后全局安装 Hexo CLI：

```bash
npm install -g hexo-cli
```

---

## 3. 初始化博客项目

```bash
hexo init my-blog
cd my-blog
npm install
```

启动本地预览服务器：

```bash
hexo server
```

浏览器打开 `http://localhost:4000` 即可看到默认主题的效果。

---

## 4. 写文章

新建一篇文章：

```bash
hexo new "文章标题"
```

文件会生成在 `source/_posts/` 目录下，用 Markdown 编辑即可。每篇文章默认包含 front matter 头部：

```yaml
---
title: 文章标题
date: 2026-01-01
tags:
---
```

写完后生成静态文件：

```bash
hexo clean        # 清除缓存
hexo generate     # 生成 public/ 目录
```

---

## 5. 方案一：GitHub Pages 免费发布

这是最简单的路线，完全免费，适合起步。

### 5.1 创建 GitHub 仓库

在 GitHub 上新建一个仓库，命名为：

```
yourusername.github.io
```

该仓库会被 GitHub 识别为个人主页站点，访问地址为 `https://yourusername.github.io`。

### 5.2 上传源码到 GitHub

将整个 Hexo 项目（源码，不是 `public/`）推送到仓库：

```bash
git init
git remote add origin https://github.com/yourusername/yourusername.github.io.git
git add .
git commit -m "init blog"
git push -u origin main
```

### 5.3 配置 GitHub Actions 自动部署

在项目根目录创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy Hexo

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm install -g hexo-cli
      - run: hexo generate
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```

推送后，GitHub Actions 会自动构建并将 `public/` 内容发布到 `gh-pages` 分支。进入仓库的 `Settings → Pages`，将 Source 设为 `gh-pages` 分支，稍等片刻即可通过 `https://yourusername.github.io` 访问博客。

---

## 6. 方案二：Vercel 部署 + 自定义域名

如需绑定自定义域名（如从 GoDaddy 购买的 `yourname.com`），用 Vercel 来做部署更为方便。

### 6.1 把项目导入 Vercel

在 [vercel.com](https://vercel.com/) 注册并导入 GitHub 仓库，构建配置如下：

```
Framework Preset:  Other
Build Command:     hexo generate
Output Directory:  public
```

保存后，每次向 GitHub 推送代码，Vercel 都会自动触发部署，并分配一个临时域名：

```
https://your-repo-name.vercel.app
```

### 6.2 在 GoDaddy 购买域名

在 [godaddy.com](https://www.godaddy.com/) 选购域名，常见后缀参考：

- 个人博客：`.com`、`.me`
- 技术向：`.dev`、`.io`
- 学术/实验室：`.eu`、`.fr`

### 6.3 在 Vercel 中添加域名

进入 Vercel 项目：

```
Settings → Domains → Add Domain
```

填入购买的域名，Vercel 会给出对应的 DNS 配置要求。

### 6.4 在 GoDaddy 中修改 DNS 记录

根据 Vercel 的提示，在 GoDaddy DNS 管理页面添加：

- **CNAME 记录**（`www` 子域名）：指向 `cname.vercel-dns.com`
- **A 记录**（裸域 `yourname.com`）：指向 Vercel 提供的 IP 地址

DNS 生效时间从几分钟到几小时不等。

### 6.5 更新 Hexo 站点配置

绑定新域名后，`_config.yml` 里的 `url` 需要同步修改，否则资源路径、RSS、sitemap 都会出错：

```yaml
url: https://yourname.com
```

---

## 7. 常见问题

**DNS 修改后访问不了？**
DNS 传播本身有延迟，不是配置错误，等待即可。可用 [dnschecker.org](https://dnschecker.org/) 查看传播状态。

**裸域和 www 要分别处理**
`yourname.com` 和 `www.yourname.com` 是两条独立的 DNS 记录，分别配置 A 记录和 CNAME 记录，并在 Vercel 中两个都添加，让其中一个自动重定向到另一个。

**为什么不只推 `public/` 到 GitHub？**
保留完整 Hexo 源码，换主题、改配置、迁移平台都有版本记录可回退。构建交给 CI/CD，无需在本地手动维护生成结果。

---

## 总结

|          | 免费方案（GitHub Pages） | 自定义域名方案（Vercel） |
| :------: | :----------------------: | :----------------------: |
|   费用   |           免费           |         域名费用         |
| 访问地址 |  `username.github.io`  |        自定义域名        |
| 部署方式 |      GitHub Actions      |     Vercel 自动部署     |
|  HTTPS  |           支持           |     支持（自动签发）     |
| 上手难度 |            低            |     中（需要配 DNS）     |

两条路线各有适用场景，可先用 GitHub Pages 跑起来，后续有需要再迁移到自定义域名。
