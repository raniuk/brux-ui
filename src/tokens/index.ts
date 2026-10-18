/**
 * Token bridge.
 *
 * Typed references to the CSS custom properties declared in `styles.css`. Use
 * them when a token has to travel through JavaScript — inline styles, chart
 * configuration, canvas, or any API that expects a color or length value.
 */
export const colors = {
  canvas: 'var(--brux-color-canvas)',
  surface: 'var(--brux-color-surface)',
  surfaceAlt: 'var(--brux-color-surface-alt)',
  text: 'var(--brux-color-text)',
  textMuted: 'var(--brux-color-text-muted)',
  border: 'var(--brux-color-border)',
  primary: 'var(--brux-color-primary)',
  secondary: 'var(--brux-color-secondary)',
  accent: 'var(--brux-color-accent)',
  success: 'var(--brux-color-success)',
  warning: 'var(--brux-color-warning)',
  danger: 'var(--brux-color-danger)',
  info: 'var(--brux-color-info)',
} as const

export const radii = {
  sm: 'var(--brux-radius-sm)',
  md: 'var(--brux-radius-md)',
  lg: 'var(--brux-radius-lg)',
  xl: 'var(--brux-radius-xl)',
  full: 'var(--brux-radius-full)',
  circle: 'var(--brux-radius-circle)',
} as const

export const spacing = {
  0.5: 'var(--brux-space-0-5)',
  1: 'var(--brux-space-1)',
  2: 'var(--brux-space-2)',
  3: 'var(--brux-space-3)',
  4: 'var(--brux-space-4)',
  5: 'var(--brux-space-5)',
  6: 'var(--brux-space-6)',
  8: 'var(--brux-space-8)',
  10: 'var(--brux-space-10)',
  12: 'var(--brux-space-12)',
  16: 'var(--brux-space-16)',
} as const

export const fonts = {
  sans: 'var(--brux-font-sans)',
  display: 'var(--brux-font-display)',
} as const

export const fontSizes = {
  xs: 'var(--brux-font-size-xs)',
  sm: 'var(--brux-font-size-sm)',
  md: 'var(--brux-font-size-md)',
  lg: 'var(--brux-font-size-lg)',
  xl: 'var(--brux-font-size-xl)',
  '2xl': 'var(--brux-font-size-2xl)',
  '3xl': 'var(--brux-font-size-3xl)',
  '4xl': 'var(--brux-font-size-4xl)',
  '5xl': 'var(--brux-font-size-5xl)',
  '6xl': 'var(--brux-font-size-6xl)',
} as const

export const fontWeights = {
  regular: 'var(--brux-font-weight-regular)',
  medium: 'var(--brux-font-weight-medium)',
  semibold: 'var(--brux-font-weight-semibold)',
  bold: 'var(--brux-font-weight-bold)',
} as const

export const lineHeights = {
  none: 'var(--brux-line-height-none)',
  tight: 'var(--brux-line-height-tight)',
  snug: 'var(--brux-line-height-snug)',
  comfortable: 'var(--brux-line-height-comfortable)',
  normal: 'var(--brux-line-height-normal)',
  relaxed: 'var(--brux-line-height-relaxed)',
} as const

export const letterSpacings = {
  tighter: 'var(--brux-letter-spacing-tighter)',
  tight: 'var(--brux-letter-spacing-tight)',
  wide: 'var(--brux-letter-spacing-wide)',
  wider: 'var(--brux-letter-spacing-wider)',
} as const

export const gradients = {
  brand: 'var(--brux-gradient-brand)',
  brandHover: 'var(--brux-gradient-brand-hover)',
} as const

export const durations = {
  fast: 'var(--brux-duration-fast)',
  base: 'var(--brux-duration-base)',
  slow: 'var(--brux-duration-slow)',
  slower: 'var(--brux-duration-slower)',
} as const

export const easings = {
  standard: 'var(--brux-ease-standard)',
  out: 'var(--brux-ease-out)',
  emphasized: 'var(--brux-ease-emphasized)',
} as const

export const elevations = {
  0: 'var(--brux-elevation-0)',
  1: 'var(--brux-elevation-1)',
  2: 'var(--brux-elevation-2)',
  3: 'var(--brux-elevation-3)',
  4: 'var(--brux-elevation-4)',
  5: 'var(--brux-elevation-5)',
} as const

export const zIndex = {
  base: 'var(--brux-z-base)',
  raised: 'var(--brux-z-raised)',
  sticky: 'var(--brux-z-sticky)',
  sidebar: 'var(--brux-z-sidebar)',
  sidebarOverlay: 'var(--brux-z-sidebar-overlay)',
  overlay: 'var(--brux-z-overlay)',
  overlayContent: 'var(--brux-z-overlay-content)',
  popover: 'var(--brux-z-popover)',
  toast: 'var(--brux-z-toast)',
} as const
