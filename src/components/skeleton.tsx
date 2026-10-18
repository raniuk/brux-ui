import * as React from 'react'
import { mergeClassNames } from '../lib/index.js'

type SkeletonVariant = 'default' | 'contrast'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = 'default', ...props }, ref) => (
    <div
      ref={ref}
      aria-hidden="true"
      className={mergeClassNames('brux-skeleton', `brux-skeleton--${variant}`, className)}
      {...props}
    />
  ),
)

Skeleton.displayName = 'Skeleton'

export { Skeleton }
