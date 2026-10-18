import * as React from 'react'
import { mergeClassNames } from '../lib/index.js'

export interface SpinnerProps extends React.SVGProps<SVGSVGElement> {}

const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(({ className, ...props }, ref) => (
  <svg
    ref={ref}
    aria-hidden="true"
    className={mergeClassNames('brux-spinner', className)}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <circle className="brux-spinner__track" cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" />
    <path className="brux-spinner__indicator" d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeLinecap="round" strokeWidth="3" />
  </svg>
))

Spinner.displayName = 'Spinner'

export { Spinner }
