import * as React from 'react'
import { mergeClassNames } from '../lib/index.js'

type InputSize = 'sm' | 'md' | 'lg'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: InputSize
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, size = 'md', ...props }, ref) => (
  <input ref={ref} className={mergeClassNames('brux-input', `brux-input--${size}`, className)} {...props} />
))

Input.displayName = 'Input'

export { Input }
