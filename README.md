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
