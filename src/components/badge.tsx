import * as React from 'react'
import { mergeClassNames } from '../lib/index.js'

type BadgeVariant = 'neutral' | 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'accent' | 'danger' | 'outline'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: 'default' | 'icon'
  variant?: BadgeVariant
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, size = 'default', variant = 'neutral', ...props }, ref) => (
    <span ref={ref} className={mergeClassNames('brux-badge', `brux-badge--${variant}`, `brux-badge--${size}`, className)} {...props} />
  ),
)

Badge.displayName = 'Badge'

export { Badge }
