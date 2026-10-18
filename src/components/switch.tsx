'use client'

import * as React from 'react'
import { Switch as SwitchPrimitive } from 'radix-ui'
import { mergeClassNames } from '../lib/index.js'

type SwitchSize = 'sm' | 'md' | 'lg'

export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  size?: SwitchSize
}

const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitive.Root>, SwitchProps>(
  ({ className, size = 'md', ...props }, ref) => (
    <SwitchPrimitive.Root
      ref={ref}
      className={mergeClassNames('brux-switch', `brux-switch--${size}`, className)}
      {...props}
    >
      <SwitchPrimitive.Thumb className="brux-switch-thumb" />
    </SwitchPrimitive.Root>
  ),
)

Switch.displayName = SwitchPrimitive.Root.displayName

export { Switch }
