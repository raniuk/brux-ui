# AGENTS.md

Operational context for AI agents working in this repository. Read this before editing anything.

## What this is

`@brux-ui/react` — a React design system shipped as **one package**: design tokens, themes, and accessible components on the same version and the same resolution surface. Styling is plain CSS; there is no utility-class framework.

The repository root **is** the package. There is no pnpm workspace, no `packages/` directory, and no second consumer of the token layer. Do not reintroduce any of them.

## The stack

The whole library is built on one stack. Do not introduce a second option for any concern.

| Concern | Choice |
| --- | --- |
| Behavior and accessibility | Radix Primitives, through the unified `radix-ui` package |
| Styling | Plain CSS — one stylesheet per component, class names prefixed `brux-` |
| Design tokens | CSS custom properties `--brux-*`, in three layers (primitive → semantic → component) |
| Class merging | `mergeClassNames()` from `src/lib/index.ts` |
| Icons | `lucide-react`, imported directly by the components that need them |
| Build | tsup (ESM + CJS + `styles.css` + types; client and server entries) |
| Docs | Storybook 10 (`@storybook/react-vite` + addon-docs + addon-a11y) |
| Type gate | `tsc --noEmit` over `src` and `docs` |

Consequences: no Tailwind or any other utility-class framework, no PostCSS config, no CSS-in-JS, no `class-variance-authority`, no `clsx` or `tailwind-merge`, no scoped `@radix-ui/react-*` package, and no second icon library.

## Hard rules

- **One Radix dependency.** `radix-ui` only. Never add an individual `@radix-ui/react-*` package; the unified package already pins all of them.
- **Plain CSS with `brux-` prefixed classes.** Every component style lives in `src/components/<name>.css` and uses `brux-<name>` plus `brux-<name>--<modifier>`. No utility classes.
- **Tokens only.** Components consume `var(--brux-*)`. Raw hex, `rgb()`, or `hsl()` literals exist exclusively in `src/styles/tokens.css`, the primitive layer.
- **Export everything.** Every component is re-exported from `src/index.ts`. A component that is not exported does not exist.
- **`'use client'` belongs where behavior lives.** Add the directive to component files that use hooks or Radix primitives. Purely presentational files stay directive-free.
- **`mergeClassNames` for class merging.** Always `mergeClassNames(...)` from `src/lib/index.ts`, and always pass the incoming `className` last so consumers can override.
- **Comments are sparse.** Each stylesheet keeps at most a short header; source files only comment non-obvious intent (see `src/tokens/index.ts`). Public behavior is documented in Storybook, not in JSDoc.

## Commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | tsup watch build |
| `pnpm build` | Build `dist/` (JS, CJS, `styles.css`, declarations) |
| `pnpm typecheck` | `tsc --noEmit` over `src` and `docs` |
| `pnpm clean` | Remove `dist/` and `storybook-static/` |
| `pnpm storybook` | Storybook on port 6006 |
| `pnpm build:storybook` | Static Storybook to `storybook-static/` |

There is no lint script and no test runner. `pnpm typecheck` is the only automated gate — run it after every change, and run `pnpm build` when you touch styles or the public surface.

## Layout

| Path | Role |
| --- | --- |
| `src/components/*.tsx` | One component per file, named exports |
| `src/components/*.css` | One stylesheet per component, plus `base.css` |
| `src/lib/index.ts` | `mergeClassNames` and the `ClassValue` type |
| `src/lib/date.ts` | Civil-date model and calendar arithmetic |
| `src/lib/use-data-table.ts` | Data-table state hook |
| `src/tokens/index.ts` | Typed JavaScript bridge to the `--brux-*` custom properties |
| `src/styles.css` | The single style entry point — `@import`s every layer |
| `src/styles/tokens.css` | Primitive values and foundation — the only file with raw colors |
| `src/styles/light.css`, `dark.css` | Semantic token overrides per theme |
| `src/index.ts` | Public API surface — the client entry (`'use client'`) |
| `src/server.ts` | Server-safe entry — presentational components, pure helpers, token bridge |
| `docs/.storybook/` | Storybook config |
| `docs/src/stories/*.stories.tsx` | Stories — they live under `docs/`, not `src/` |
| `docs/src/styles.css` | Styles for the documentation site only |
| `tsup.config.ts` | Build config |
| `dist/` | Build output, never edit |

## Gotchas

- **Storybook only loads `docs/src/**/*.stories.@(ts|tsx|mdx)`.** Markdown files anywhere in the repo do not affect Storybook.
- **Stories import the source relatively: `from '../../../src'`.** There is no `@brux-ui/react` alias and no tsconfig path mapping. Do not reintroduce one — the docs site deliberately reads the same files a consumer's bundler would.
- **Autodocs is enabled globally** in `docs/.storybook/preview.tsx` (`tags: ['autodocs']`). Do not add `tags` to individual story files.
- **Dark mode is `[data-brux-theme='dark']`** on an ancestor, with `[data-brux-theme='light']` for the explicit light theme. It is not a `.dark` class and not `data-theme`. The docs site sets it on `<html>` through `document.documentElement.dataset.bruxTheme`.
- **`@import` stays at the top of `src/styles.css`.** The bundler inlines the layers; splitting the token definitions into the file while leaving component `@import`s in place silently produces a `dist/styles.css` full of unresolved relative paths.
- **`declaration` and `declarationMap` are intentionally absent from `tsconfig.json`.** tsup generates the shipped `.d.ts` with its own dts step, and `noEmit` is already set. Re-adding them makes `pnpm typecheck` fail with TS2742 on stories whose `component` is a directly re-exported Radix primitive (`Accordion`, `Avatar`, `DropdownMenu`).
- **`pnpm-workspace.yaml` lists `packages: - .` and allows the `esbuild` build script** — esbuild's postinstall is needed by tsup.
- **State is exposed through `data-*` attributes.** The stylesheets key off `data-state`, `data-status`, `data-highlighted`, `data-swipe`, `data-disabled`, `data-met`, `data-invalid`, `data-placeholder`, and `data-position`; components additionally emit `data-loading` and `data-date` as styling hooks for consumers. Keep that contract when editing a component.
- **`Slot` comes from the unified package**: `import { Slot } from 'radix-ui'`, rendered as `<Slot.Slot>`. `Button`, `PaginationLink`, and `FormControl` rely on `asChild`; preserve that behavior.
- **Animation guards live per component.** 30 component stylesheets carry their own `@media (prefers-reduced-motion: reduce)` block. Add one when you add motion.
- **Two entries — client and server.** `src/index.ts` carries `'use client'` and re-exports the full surface; `src/server.ts` re-exports only directive-free components plus pure helpers. The `react-server` export condition in `package.json` routes Server Components to `src/server.ts`. Add a presentational component to both barrels; add a hook or Radix component to `src/index.ts` only. Never import a client-only module from `src/server.ts`.

## Where to look

- Consuming the package → `README.md`
- Building or changing components → `RULES.md`
- Token model and public surface → `docs/architecture.md`
- Component behavior reference → Storybook autodocs (`pnpm storybook`), driven by `parameters.docs.description` in each story
