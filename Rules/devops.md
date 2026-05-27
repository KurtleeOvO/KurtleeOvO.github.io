# DevOps Rules - Fuwari Blog Theme

适用于构建、部署和开发工具的规范。

## 构建

- 命令：`pnpm build`
- 输出目录：`dist/`
- 构建后自动运行 Pagefind 生成搜索索引
- 使用 `sharp` 处理图片优化

## 部署

- 平台：Vercel
- 配置文件：`vercel.json`
- 环境变量：无特殊要求

## 开发服务器

- 命令：`pnpm dev`
- 端口：默认 4321（Astro）
- 支持热更新

## 格式化与检查

- 工具：Biome 2.x
- 格式化：`pnpm format`（Tab 缩进，双引号）
- 检查：`pnpm lint`
- 配置文件：`biome.json`

## Git 规范

- 分支命名：遵循 Conventional Commits
- 提交信息：使用语义化版本前缀（feat, fix, chore 等）
- PR 模板：无特殊配置

## 依赖管理

- 包管理器：pnpm 9.x（锁定版本）
- 更新策略：Renovate Bot 自动更新依赖
- 安装钩子：`preinstall` 脚本强制使用 pnpm

## 性能优化

- 图片优化：sharp + Astro Image
- 代码分割：Astro 自动处理
- 页面过渡：Swup 缓存和预加载
- 字体：使用 @fontsource 变量字体

## 监控

- 暂无监控配置
- 可考虑添加 Vercel Analytics
