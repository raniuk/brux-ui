# Brux UI architecture

Brux UI is a design system distributed as a **single package**. One artifact keeps the design contract (tokens, themes) and the React components on the same version and the same resolution surface.

## Package

| Package | Responsibility | Runtime dependencies |
| --- | --- | --- |
| `@brux-ui/react` | Design tokens, themes, and accessible React components | `radix-ui`, `lucide-react` |

Inside the package, the source is organized by layer:

```text
src/
├── components/           # one module and one stylesheet per component
├── lib/                  # class-name helpers, date utilities, hooks
├── tokens/               # token contracts
├── styles.css            # the single stylesheet entry point
└── index.ts              # public barrel
tsup.config.ts
package.json
```

The repository root is the package: there is no workspace package to resolve, and the documentation site imports the source through a relative path.

Dependency flow is one way: `styles.css` declares the token layers, then components consume tokens only. Components must not define raw visual values — no literal colors, font sizes, durations, radii, or shadows.

React and React DOM are peer dependencies, preventing consumers from bundling a second React runtime. `radix-ui` is a regular dependency: it installs automatically and its modules are never re-exported, so consumers use the branded Brux UI components instead.

Components that use hooks or Radix primitives are marked `'use client'` in the source. The build ships two entries: `src/index.ts` carries `'use client'` and re-exports the full surface, while `src/server.ts` re-exports only directive-free components and pure helpers. A `react-server` export condition routes Server Components to the server entry, so presentational components render on the server and interactive ones stay client-only.

## Icons

Icons come from a single source: [lucide-react](https://lucide.dev), declared once as a dependency and imported directly by the components that need them.

Icon sizing is a styling concern, not an icon concern: components size their `svg` descendants with component-level CSS (`height`/`width`), so every icon renders at the size its slot expects.

## Token model

1. **Primitive tokens** hold raw values: the color scale, the type scale (`--brux-font-size-*`, `--brux-font-weight-*`, `--brux-line-height-*`, `--brux-letter-spacing-*`), the typefaces (`--brux-font-display` Fraunces, `--brux-font-sans` Inter), the spacing scale (`--brux-space-*`), the radius scale (`--brux-radius-*`), the motion scale (`--brux-duration-*`, `--brux-ease-*`), the elevation scale (`--brux-elevation-*`), the brand gradient (`--brux-gradient-brand`), and the z-index scale (`--brux-z-*`).
2. **Semantic tokens** name intent: `--brux-color-canvas`, `--brux-color-surface`, `--brux-color-text-muted`, `--brux-color-danger`. Themes override these.
3. **Component tokens** specialize a semantic role for one component: `--brux-button-background`, `--brux-button-focus-ring`, `--brux-size-sidebar`.

Every component stylesheet consumes tokens only — no raw colors, sizes, durations, or shadows. Themes override the semantic layer (colors) and the shadow color (`--brux-shadow-color`), so changing theme never changes a component API.

`src/tokens/index.ts` is the typed JavaScript bridge (`colors`, `radii`, `spacing`, `fontSizes`, `fontWeights`, `lineHeights`, `letterSpacings`, `durations`, `easings`, `elevations`, `zIndex`) for the cases where a token must travel through JS.

## Public entry points

| Import | Resolves to |
| --- | --- |
| `@brux-ui/react` | Components, helpers, and utilities |
| `@brux-ui/react/styles.css` | Tokens + light/dark themes + component CSS, in cascade order |

The `react-server` export condition serves a server-safe subset (presentational components, `mergeClassNames`, date utilities, and the token bridge) when `@brux-ui/react` is imported from a Server Component; interactive components resolve to the full client entry instead.

## Consumer setup

```ts
import '@brux-ui/react/styles.css'
```

Switch to dark mode by adding `data-brux-theme="dark"` to an ancestor. `styles.css` already ships the dark theme overrides.

Styles are never injected by the JavaScript bundle: if the stylesheet import is missing, components render unstyled.

## Development gates

Run `pnpm typecheck` for the TypeScript contract and `pnpm build` to produce `dist/`.
