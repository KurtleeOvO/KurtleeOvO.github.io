# Frontend Rules - Fuwari Blog Theme

适用于 Astro + Svelte 组件开发的规范。

## 组件模式

### Astro 组件 (.astro)

- 用于静态布局和内容渲染
- 使用 `---` frontmatter 传递 props
- 示例结构：
  ```astro
  ---
  interface Props {
    title: string;
  }
  const { title } = Astro.props;
  ---
  <div>{title}</div>
  ```

### Svelte 组件 (.svelte)

- 用于需要客户端交互的组件
- 使用 Svelte 5 语法（runes: `$state`, `$derived`, `$effect`）
- 示例结构：
  ```svelte
  <script lang="ts">
    let count = $state(0);
  </script>
  <button onclick={() => count++}>{count}</button>
  ```

## 样式规范

- 使用 Tailwind CSS 类名
- 避免内联样式，除非动态值
- 支持深色模式：使用 `dark:` 前缀或 `class="dark"`
- CSS 变量用于主题色（如 `var(--primary)`）
- 使用 PostCSS nesting 嵌套

## 路径别名

```typescript
@components/*  → src/components/*
@assets/*      → src/assets/*
@utils/*       → src/utils/*
@layouts/*     → src/layouts/*
@i18n/*        → src/i18n/*
@constants/*   → src/constants/*
@/*            → src/*
```

## 图片处理

- 使用 `<ImageWrapper.astro>` 组件加载图片
- 本地图片放在 `src/assets/`
- 远程图片使用 `/public/` 目录
- 支持 `sharp` 优化

## Markdown 内容

- 文章格式：`src/content/posts/*.md`
- 支持自定义组件（github 卡片、提示框等）
- frontmatter 字段参考 `src/content/config.ts`

## 状态管理

- 全局配置通过 `src/config.ts` 导出
- 组件状态使用 Svelte runes
- 无全局状态管理库

## 无障碍

- 使用语义化 HTML 标签
- 图片添加 alt 属性
- 按钮和链接添加 aria-label
