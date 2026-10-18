'use client'

import * as React from 'react'
import { Checkbox as CheckboxPrimitive } from 'radix-ui'
import { mergeClassNames } from '../lib/index.js'
import { Check } from 'lucide-react'

export interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {}

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, ...props }, ref) => (
    <CheckboxPrimitive.Root ref={ref} className={mergeClassNames('brux-checkbox', className)} {...props}>
      <CheckboxPrimitive.Indicator className="brux-checkbox-indicator">
        <Check aria-hidden="true" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  ),
)

Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
