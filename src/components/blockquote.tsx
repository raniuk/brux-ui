import * as React from 'react'
import { mergeClassNames } from '../lib/index.js'

export interface BlockquoteProps extends React.HTMLAttributes<HTMLQuoteElement> {
  attribution?: React.ReactNode
}

const Blockquote = React.forwardRef<HTMLQuoteElement, BlockquoteProps>(
  ({ className, attribution, children, ...props }, ref) => (
    <blockquote ref={ref} className={mergeClassNames('brux-blockquote', className)} {...props}>
      {children}
      {attribution ? (
        <footer className="brux-blockquote-attribution">
          <cite>{attribution}</cite>
        </footer>
      ) : null}
    </blockquote>
  ),
)

Blockquote.displayName = 'Blockquote'

export { Blockquote }
