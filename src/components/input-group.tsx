import * as React from 'react'
import { mergeClassNames } from '../lib/index.js'

type InputGroupSize = 'sm' | 'md' | 'lg'

export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: InputGroupSize
}

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(({ className, size = 'md', ...props }, ref) => (
  <div
    ref={ref}
    className={mergeClassNames('brux-input-group', `brux-input-group--${size}`, className)}
    {...props}
  />
))

InputGroup.displayName = 'InputGroup'

export interface InputGroupTextProps extends React.HTMLAttributes<HTMLSpanElement> {}

const InputGroupText = React.forwardRef<HTMLSpanElement, InputGroupTextProps>(({ className, ...props }, ref) => (
  <span ref={ref} className={mergeClassNames('brux-input-group-text', className)} {...props} />
))

InputGroupText.displayName = 'InputGroupText'

export interface InputGroupInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {}

const InputGroupInput = React.forwardRef<HTMLInputElement, InputGroupInputProps>(
  ({ className, ...props }, ref) => (
    <input ref={ref} className={mergeClassNames('brux-input-group-input', className)} {...props} />
  ),
)

InputGroupInput.displayName = 'InputGroupInput'

export { InputGroup, InputGroupInput, InputGroupText }
