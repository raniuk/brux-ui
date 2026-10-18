'use client'

import * as React from 'react'
import { Separator as SeparatorPrimitive } from 'radix-ui'
import { mergeClassNames } from '../lib/index.js'

export interface SeparatorProps extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {}

const Separator = React.forwardRef<React.ElementRef<typeof SeparatorPrimitive.Root>, SeparatorProps>(
  ({ className, decorative = true, orientation = 'horizontal', ...props }, ref) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={mergeClassNames('brux-separator', `brux-separator--${orientation}`, className)}
      {...props}
    />
  ),
)

Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
