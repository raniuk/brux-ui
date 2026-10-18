# RULES.md

How to build and change components in `@brux-ui/react`. This is the contributor contract — read it before opening a PR.

For repository layout, commands, and the short list of hard rules, see `AGENTS.md`. For what each component does, see the Storybook autodocs (`pnpm storybook`).

## The stack

The library is built on one stack. Do not add a second option for any concern.

| Concern | Choice |
| --- | --- |
| Behavior and accessibility | Radix Primitives, through the unified `radix-ui` package |
| Styling | Plain CSS — one stylesheet per component, `brux-` prefixed classes |
| Design tokens | CSS custom properties `--brux-*` |
| Class merging | `mergeClassNames()` from `src/lib/index.ts` |
| Icons | `lucide-react` |
| Build | tsup |
| Docs | Storybook |
| Type gate | `tsc --noEmit` (`pnpm typecheck`) |

Consequences: no utility-class framework, no PostCSS config, no CSS-in-JS, no variant library (`cva`), no class-merge library, no scoped `@radix-ui/react-*` package, no hex or `rgb()` literals inside a component, and no second icon library.

There is no test runner and no linter. `pnpm typecheck` is the only automated gate, and it must pass before a change is considered done.

## Radix vs native HTML

Radix is for **non-trivial behavior**: focus management, focus traps, keyboard navigation, portals, ARIA for complex patterns. If a component is presentational, or it wraps a native control that already carries the semantics, build it with plain HTML.

Component files that use hooks, Radix primitives, or `Slot` carry `'use client'`; the rest are native and directive-free.

Rule of thumb:

- The behavior is documented as a WAI-ARIA pattern with custom keyboard handling → Radix.
- The platform already gives you the behavior (`<input>`, `<textarea>`, `<fieldset>`, `<nav>`, a `<span>`) → native HTML.
- You only need `asChild` → import `Slot` from `radix-ui`, not a full primitive.

Do not pull in Radix just to render a `<span>`. There is no Radix `TextField`, `Badge`, `Card`, or `Spinner` — those are native by design.

## Component anatomy

Every component file follows the same shape:

```tsx
import * as React from 'react'
import { mergeClassNames } from '../lib/index.js'

type MessageVariant = 'neutral' | 'success' | 'danger'

export interface MessageProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: MessageVariant
}

const Message = React.forwardRef<HTMLSpanElement, MessageProps>(
  ({ className, variant = 'neutral', ...props }, ref) => (
    <span
      ref={ref}
      className={mergeClassNames('brux-message', `brux-message--${variant}`, className)}
      {...props}
    />
  ),
)

Message.displayName = 'Message'

export { Message }
```

Non-negotiables in that shape:

1. `'use client'` at the top when the file uses hooks or Radix primitives. `src/index.ts` is the client entry (it carries `'use client'` and re-exports everything); `src/server.ts` is the server-safe entry (directive-free components and pure helpers only). Keep the directive on the files that need it.
2. `React.forwardRef` and a matching `displayName` on every component that renders a DOM node.
3. Variants are string-union props destructured with a default, mapped to `brux-<name>--<value>` modifier classes. There is no variant library.
4. Props extend the correct native attribute interface (`React.HTMLAttributes<...>`, `React.ButtonHTMLAttributes<...>`, and so on).
5. Named exports only. No default exports.
6. Add the export to `src/index.ts` (and to `src/server.ts` if the component is presentational). A component that is not exported does not exist.
7. Pass `className` last into `mergeClassNames` so the consumer's classes win.
8. Import sibling modules with the `.js` extension (`'../lib/index.js'`, `'./spinner.js'`) — the package is ESM-first.

## Stylesheet anatomy

Every component has exactly one stylesheet, `src/components/<name>.css`, imported from `src/styles.css`. Selectors are flat, prefixed, and ordered:

```css
.brux-message {
  align-items: center;
  border: 1px solid var(--brux-color-border);
  border-radius: var(--brux-radius-sm);
  display: inline-flex;
  gap: var(--brux-space-1);
  padding: var(--brux-space-1) var(--brux-space-2);
  white-space: nowrap;
}

.brux-message--danger { border-color: var(--brux-color-danger); color: var(--brux-color-danger); }
.brux-message--success { border-color: var(--brux-color-success); color: var(--brux-color-success); }

.brux-message:focus-visible {
  outline: 2px solid var(--brux-message-focus-ring);
  outline-offset: 2px;
}
```

- **Declarations are alphabetical** within a block. Keep it that way; it removes ordering debates.
- **Two-space indentation**, one blank line between blocks.
- **Base block first**, then modifiers (`--variant`, `--size`) on single lines, then variations (`.brux-message--danger`), then state selectors.
- **State is a selector, not a class**: `:focus-visible`, `:disabled`, `[aria-disabled='true']`, `[aria-invalid='true']`, `[aria-current]`, `[data-state='...']`, `[data-status='...']`, `[data-disabled]`, `[data-met]`, `[data-invalid]`. Never add a state class by hand. Components may also emit hook attributes for consumers (`data-loading`, `data-date`) without styling them here.
- **Animations are namespaced `brux-<component>-<part>-<in|out>`** (`brux-dialog-content-in`, `brux-sidebar-overlay-out`) and declared in the same file, with a `@media (prefers-reduced-motion: reduce)` block that neutralises them. `Accordion` is the one exception, using Radix's `-down` / `-up` names.
- **`.brux-visually-hidden`** in `src/components/base.css` is the shared screen-reader-only utility. Reuse it; do not write a second one.

## Styling rules

- **There is no utility framework.** Write the CSS. Class names are `brux-<component>` and `brux-<component>--<modifier>`; the prefix is not optional.
- **Never hardcode a color.** Every component stylesheet today consumes `var(--brux-*)`. If a needed value is missing, add a token to `src/styles/tokens.css` and the theme files first, then use it. Raw hex, `rgb()`, and `hsl()` literals belong only in `src/styles/tokens.css`.
- **Tint a state with `color-mix`, not a new hex.** The established pattern is `color-mix(in srgb, var(--brux-color-<role>) 12%, var(--brux-color-surface))` for a subtle background and a 30% mix for its border (see `src/components/badge.css`).
- **Sizes come from tokens.** Spacing uses `var(--brux-space-*)`; radii use `var(--brux-radius-*)`. A literal like `1px` for a hairline border is fine; a literal colour or radius is not.
- **Type comes from tokens.** Font sizes use `var(--brux-font-size-*)`, weights use `var(--brux-font-weight-*`, line heights use `var(--brux-line-height-*`, and tracking uses `var(--brux-letter-spacing-*`. Never write a `font-size` or `font-weight` literal.
- **Motion comes from tokens.** Durations use `var(--brux-duration-*` (`fast` 120ms, `base` 150ms, `slow` 200ms, `slower` 300ms) and easing uses `var(--brux-ease-*` (`standard`, `out`, `emphasized`). Write `var(--brux-duration-base) var(--brux-ease-standard)`, never `150ms ease`.
- **Elevation comes from tokens.** Raised surfaces use `box-shadow: var(--brux-elevation-1)` through `var(--brux-elevation-5)`. Never compose a shadow with `color-mix` or raw `rgba()` in a component. The shadow color is `--brux-shadow-color`, overridden per theme.
- **Stacking comes from tokens.** Use `var(--brux-z-*` (`sticky`, `sidebar`, `overlay`, `overlay-content`, `popover`, `toast`) instead of literal `z-index` values, so the overlay order stays coherent across components.
- **Every interactive component needs a visible focus state.** Standalone controls use an offset `outline` (`2px`, `outline-offset: 2px`) driven by a focus-ring token; already-bordered fields such as `Input` also shift `border-color` to the primary token. See `src/components/button.css` and `src/components/input.css`.
- **Disabled uses `cursor: not-allowed`, `opacity: 0.55`, and `pointer-events: none`** on `:disabled` and `[aria-disabled='true']`, for controls that cannot be natively disabled. `Button` also handles a `loading` state that implies disabled.
- **Icons are sized in CSS**, not per call site: components size their `svg` descendants in the component stylesheet (`.brux-checkbox-indicator svg`, `.brux-dialog-close svg`), so every icon renders at the size its slot expects. `lucide-react` is imported directly by the components that need it — there is no icon wrapper layer, and no `Icon` component to route through.
- **Layout is the consumer's job.** Component stylesheets style the component; app-level width, height, margin, and max-size belong in the consuming app or in Storybook-only styles under `docs/src/styles.css`. Two bounded exceptions are listed in **Responsive** below.

## Responsive

Layout is the consumer's job, with two exceptions. Every component is fluid by default — it fills its container and needs no breakpoint. Only these mechanisms may add one:

| Mechanism | Use it for | Never use it for |
| --- | --- | --- |
| `@container (min-width: 40rem)` | A component whose internal layout depends on its own width: `Card`, `DataTable`, `Dialog`, `AlertDialog` | App chrome, or anything measured by the viewport |
| `@media (min-width: 40rem \| 64rem)` | App chrome that owns the frame (`Sidebar`, `Navbar`) and the fixed `Toast` viewport | A content component |
| `@media (prefers-reduced-motion: reduce)` | Any component with motion | — |

- **Breakpoints are the only value that cannot be a token.** A media query condition cannot read a custom property — `@media (min-width: var(--brux-x))` is invalid CSS — and `@custom-media` would require PostCSS, which the stack forbids. This is the one exception to the token rules above.
- **The allowed values are `40rem` (640px) and `64rem` (1024px).** Adding a third requires updating this section first.
- **Prefer `@container` over `@media`.** A component must measure itself, never the app: a `Card` in a narrow sidebar of a wide desktop keeps a stacked footer, and a `Dialog size="sm"` stays stacked inside its own 24rem on a wide desktop.
- **A container query needs `container-type: inline-size` on the container element** and targets that element's descendants. A container cannot style itself.
- **`Stepper` keeps a viewport query.** `.brux-stepper` and `.brux-stepper--default` are the same element, and a container cannot style itself. Give it a wrapper element before moving it to `@container`.

## Token layering

1. **Primitive tokens** hold raw values — a color scale, a spacing unit, a radius. They live in `src/styles/tokens.css`, the only file allowed to contain literal colors.
2. **Semantic tokens** name intent: `--brux-color-canvas`, `--brux-color-surface`, `--brux-color-text-muted`, `--brux-color-danger`. Themes override these.
3. **Component tokens** specialize a semantic role for one component: `--brux-button-background`, `--brux-button-focus-ring`.

Components consume semantic and component tokens only. Because themes override the semantic layer, changing theme never changes a component API.

`src/tokens/index.ts` is a typed JavaScript bridge (`colors`, `radii`, `spacing`, `fonts`) for the cases where a token must travel through JS — inline styles, chart configuration, canvas. Prefer CSS; reach for the bridge only when CSS cannot.

## Accessibility baseline

Every change must preserve:

- Correct roles and ARIA state from the underlying Radix primitive or native element.
- Keyboard operability: Tab to reach, Enter/Space to activate, arrows where the pattern requires them.
- `aria-invalid` for invalid form controls, and `aria-describedby` wiring between controls and their descriptions or messages.
- `aria-busy` on controls in a loading state, `aria-disabled` where a control cannot be natively disabled.
- Decorative icons marked `aria-hidden="true"`; icon-only buttons require an `aria-label`.
- Contrast of at least 4.5:1 for text in both light and dark themes.
- Motion behind a `prefers-reduced-motion` guard.
- The a11y addon in Storybook must report no violations for the story you touch.

## Dates and time

Dates are civil dates: a year, a month, and a day with no time and no timezone. The canonical value is always the `yyyy-MM-dd` string produced by `toWire()`, and it is the only thing that crosses a component boundary.

- Never build the canonical string with `toISOString()`. `new Date(...).toISOString()` shifts the day for any consumer outside UTC, which silently corrupts dates saved to a database.
- Use `new Date(y, m - 1, d)` only for calendar arithmetic — weekday offset, days in a month, adding days. Never read a wire value back out of a `Date`.
- Display formatting (`toDisplay()` → `dd/MM/yyyy`) is presentational and belongs to the component that renders it. Month and weekday labels are English and hardcoded in `src/lib/date.ts`; the library does not depend on a date library.
- Do not add `date-fns`, `dayjs`, `react-day-picker`, or any other date dependency. The calendar and date picker are built in-house on the WAI-ARIA grid pattern.

## Stories

- Stories live in `docs/src/stories/*.stories.tsx` and import from `../../../src`. Never place a story under `src/`.
- Autodocs is enabled globally (`tags: ['autodocs']` in `docs/.storybook/preview.tsx`). Do not add `tags` to individual story files.
- Each component gets a `Meta` with `component`, `args`, and `argTypes` controls for every variant and size. The `component` field is what feeds the autodocs props table.
- Document behavior in `parameters.docs.description.component`, not in JSDoc. It renders as markdown on the autodocs page: put variants, gotchas, and `asChild`/`aria` notes there.
- Add a story for each meaningful state: variants, sizes, disabled, loading, invalid, and any `asChild` usage.
- Every component is covered by a story today, and there is a docs-only `Overview` entry. A few components share a file with their sibling (for example `FileUpload` lives in `FileInput.stories.tsx`); a component reachable only through a shared story is still covered, but a component with no story at all is not finished.
- Storybook is the visual gate. Run `pnpm storybook` and verify the component in both the Light and Dark toolbar themes before finishing.
