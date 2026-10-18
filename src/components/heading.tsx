import * as React from 'react'
import { mergeClassNames } from '../lib/index.js'

type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
type HeadingSize = 'sm' | 'md' | 'lg' | 'xl'

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingElement
  size?: HeadingSize
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ as: Component = 'h2', className, size = 'md', ...props }, ref) => (
    <Component ref={ref} className={mergeClassNames('brux-heading', `brux-heading--${size}`, className)} {...props} />
  ),
)

Heading.displayName = 'Heading'

export { Heading }
