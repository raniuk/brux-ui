'use client'

import * as React from 'react'
import { Slot } from 'radix-ui'
import { mergeClassNames } from '../lib/index.js'

type LinkVariant = 'default' | 'subtle' | 'muted'

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean
  variant?: LinkVariant
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant = 'default', asChild = false, ...props }, ref) => {
    const classNames = mergeClassNames('brux-link', `brux-link--${variant}`, className)

    if (asChild) {
      return <Slot.Slot ref={ref} className={classNames} {...props} />
    }

    return <a ref={ref} className={classNames} {...props} />
  },
)

Link.displayName = 'Link'

export { Link }
