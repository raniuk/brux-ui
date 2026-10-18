# Brux UI

A design system for React, distributed as a single Git-installed package (not npm): design tokens, themes, and accessible components on the same version and the same resolution surface.

## Installation

```bash
pnpm add git+https://github.com/raniuk/brux-ui.git#v0.1.0
```

Use Git tags for reproducible installs. Avoid installing from `main` in production applications.

React and React DOM are peer dependencies (React 18 or newer), so install them in the app if they are not there already:

```bash
pnpm add react react-dom
```

## Usage

Import the stylesheet once in your app entry point, then import components from the package root:

```tsx
import '@brux-ui/react/styles.css'
import { Button, Dialog, DialogContent, DialogTitle } from '@brux-ui/react'
```

See [docs/architecture.md](docs/architecture.md) for the token model, theming, and the full public surface.

Brux UI supports React Server Components. Presentational components (`Text`, `Heading`, `Badge`, `Card`, and the other directive-free components) are server-safe; interactive components (`Button`, `Dialog`, `Select`, and the rest) are client components. Both resolve from the same import path — the `react-server` export condition picks the correct entry automatically.

## Fonts

The type system ships with two faces: **Fraunces** for display/headings (`--brux-font-display`) and **Inter** for body and UI (`--brux-font-sans`). The library does not inject either font: loading them is the app's job, so no remote request is made from your bundle. Load both once in your app (a Google Fonts `@import` or `<link>`, or self-hosted `@font-face`). Without them, the stack falls back to `ui-serif`/`ui-sans-serif` and `system-ui` with no layout breakage.

```css
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..700&family=Inter:wght@400;500;600;700&display=swap');
```

## Repository layout

```text
src/components/                 # one module and one stylesheet per component
src/lib/                        # helpers, date utilities, hooks
src/tokens/                     # token contracts
src/styles.css                  # the single stylesheet entry point
src/index.ts                    # public barrel
docs/                           # Storybook documentation site
tsup.config.ts
```

## Commands

```bash
pnpm install
pnpm typecheck
pnpm build
pnpm storybook
```

## Component documentation

Run `pnpm storybook` and open `http://localhost:6006` to browse every component in light and dark themes. Use `pnpm build:storybook` to create a static documentation site in `storybook-static/`.
