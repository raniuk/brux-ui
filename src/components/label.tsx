'use client'

import * as React from 'react'
import { Label as LabelPrimitive } from 'radix-ui'
import { mergeClassNames } from '../lib/index.js'

export interface LabelProps extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {}

const Label = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, LabelProps>(
  ({ className, ...props }, ref) => <LabelPrimitive.Root ref={ref} className={mergeClassNames('brux-label', className)} {...props} />,
)

Label.displayName = LabelPrimitive.Root.displayName

export { Label }
