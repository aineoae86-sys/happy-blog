# Happy Blog

一个基于 Astro 的轻量内容博客。文章使用 Markdown 管理，支持首页、文章列表、标签页、RSS 和基础 SEO。

## 常用命令

```bash
npm install
npm run dev
npm run build
npm run preview
```

## 写文章

在 `src/content/blog` 新增 Markdown 文件即可。每篇文章需要包含 frontmatter：

```md
---
title: "文章标题"
description: "文章摘要"
pubDate: 2026-04-28
tags: ["AI", "效率"]
heroImage: "/images/workspace.jpg"
---
```

上线前可在部署平台设置 `SITE_URL` 环境变量为你的真实域名；如果部署在 Vercel 且还没绑定域名，项目会自动使用 Vercel 提供的域名。

默认封面图使用 Wikimedia Commons 上的 CC0 图片。要换成本地图片时，把图片放到 `public/images`，再把 `heroImage` 改成 `/images/你的图片名.jpg`。

## 部署

Vercel 已有配置文件 `vercel.json`：

- Build Command: `npm run build`
- Output Directory: `dist`
- Node.js: `22`

## 网页后台

后台入口是 `/admin/`，由 Decap CMS 提供。

生产环境使用 GitHub 作为内容仓库，配置在 `public/admin/config.yml`。当前配置的仓库是 `aineoae86-sys/happy-blog`，需要把本项目推送到这个 GitHub 仓库，并配置 GitHub OAuth 代理后，才能在线登录并发布文章。

本地测试后台：

```bash
npm run cms
npm run dev
```

然后打开 `http://127.0.0.1:4321/admin/`。
