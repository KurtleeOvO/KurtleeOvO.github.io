# Fuwari

基于 Astro 的博客主题，支持 Svelte 交互组件、Tailwind CSS 样式和丰富的 Markdown 扩展。

## Tech Stack

- **框架**: Astro 5.x + Svelte 5.x
- **样式**: Tailwind CSS 3.x + PostCSS (nesting, import)
- **语言**: TypeScript (strict mode)
- **格式化/检查**: Biome 2.x
- **包管理**: pnpm 9.x
- **部署**: Vercel
- **搜索**: Pagefind

## Project Structure

```
src/
├── assets/          # 静态资源（图片等）
├── components/      # 组件
│   ├── control/     # 控制类组件（返回顶部、分页等）
│   ├── misc/        # 通用组件（图片、许可证等）
│   └── widget/      # 侧边栏组件（分类、标签、目录等）
├── config.ts        # 站点配置（标题、导航、头像等）
├── constants/       # 常量定义
├── content/
│   ├── posts/       # 博客文章（Markdown）
│   └── spec/        # 规范文档
├── i18n/            # 国际化
├── layouts/         # 页面布局
│   ├── Layout.astro
│   └── MainGridLayout.astro
├── pages/           # 路由页面
├── plugins/         # Markdown/remark/rehype 插件
├── styles/          # 全局样式
├── types/           # TypeScript 类型定义
└── utils/           # 工具函数
```

## Development

### Prerequisites

- Node.js >= 18
- pnpm 9.x (packageManager 字段已锁定)

### Commands

```bash
pnpm dev          # 启动开发服务器
pnpm build        # 构建生产版本（含 Pagefind 索引）
pnpm preview      # 预览构建结果
pnpm check        # Astro 类型检查
pnpm type-check   # TypeScript 类型检查（strict）
pnpm format       # Biome 格式化
pnpm lint         # Biome 代码检查
pnpm new-post     # 创建新文章（交互式）
```

## Architecture

### 配置系统

站点配置集中在 `src/config.ts`，包含：
- `siteConfig` - 站点标题、副标题、语言、主题色、Banner、目录、Favicon
- `navBarConfig` - 导航栏链接
- `profileConfig` - 侧边栏个人资料
- `licenseConfig` - 文章许可证
- `expressiveCodeConfig` - 代码块主题

### 路由

- `[...page].astro` - 分页文章列表
- `posts/` - 文章详情页
- `archive.astro` - 归档页
- `about.astro` - 关于页
- `rss.xml.ts` - RSS 订阅

### Markdown 扩展

文章支持多种自定义组件（通过 rehype-components）：
- `::github[owner/repo]` - GitHub 仓库卡片
- `:::note/tip/important/caution/warning` - 提示框
- `:::collapsible` - 可折叠区域
- 数学公式：`$...$` 行内，`$$...$$` 块级

### 动画

使用 Swup 实现页面过渡，配置在 `astro.config.mjs`。

## Coding Conventions

- 使用 Biome 格式化，缩进为 **Tab**
- 双引号 (JavaScript/TypeScript)
- 组件命名：Astro 组件 PascalCase `.astro`，Svelte 组件 `.svelte`
- 路径别名：`@components/`, `@assets/`, `@utils/`, `@layouts/` 等
- 文章放在 `src/content/posts/`，使用 Markdown 格式

## Testing

暂无测试框架配置。

## Important Notes

- 代码块主题仅支持深色背景（见 `expressiveCodeConfig` 注释）
- Biome 忽略 CSS 文件和 `src/public/` 目录
- 构建时会自动运行 Pagefind 生成搜索索引
- 使用 `sharp` 处理图片优化
- 使用 `@swup/astro` 实现 SPA 式页面过渡
