import * as React from 'react'
import { mergeClassNames } from '../lib/index.js'

type ButtonGroupOrientation = 'horizontal' | 'vertical'

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: ButtonGroupOrientation
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation = 'horizontal', ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      className={mergeClassNames('brux-button-group', `brux-button-group--${orientation}`, className)}
      {...props}
    />
  ),
)

ButtonGroup.displayName = 'ButtonGroup'

export { ButtonGroup }
