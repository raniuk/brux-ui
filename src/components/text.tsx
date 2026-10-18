import * as React from 'react'
import { mergeClassNames } from '../lib/index.js'

type TextElement = 'div' | 'p' | 'span'
type TextSize = 'xs' | 'sm' | 'md' | 'lg'
type TextTone = 'primary' | 'secondary' | 'muted' | 'success' | 'danger'

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: TextElement
  size?: TextSize
  tone?: TextTone
}

const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ as: Component = 'p', className, size = 'md', tone = 'primary', ...props }, ref) => {
    const Tag = Component as React.ElementType

    return (
      <Tag
        ref={ref}
        className={mergeClassNames('brux-text', `brux-text--${size}`, `brux-text--${tone}`, className)}
        {...props}
      />
    )
  },
)

Text.displayName = 'Text'

export { Text }
