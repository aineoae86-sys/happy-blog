const env = import.meta.env as Record<string, string | undefined>;
const vercelUrl = env.VERCEL_PROJECT_PRODUCTION_URL ?? env.VERCEL_URL;
const siteUrl = env.SITE_URL ?? (vercelUrl ? `https://${vercelUrl}` : "http://127.0.0.1:4321");

export const siteConfig = {
  title: "Happy Blog",
  description: "记录 AI 工具、内容运营和个人效率的实用笔记。",
  author: "Happy",
  url: siteUrl,
  defaultImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Laptop_on_a_desk_%28Unsplash%29.jpg/1280px-Laptop_on_a_desk_%28Unsplash%29.jpg",
  nav: [
    { label: "首页", href: "/" },
    { label: "文章", href: "/blog/" },
    { label: "关于", href: "/about/" },
    { label: "RSS", href: "/rss.xml" },
  ],
};
