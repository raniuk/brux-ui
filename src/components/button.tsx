'use client'

import * as React from 'react'
import { Slot } from 'radix-ui'
import { mergeClassNames } from '../lib/index.js'
import { Spinner } from './spinner.js'

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'success' | 'warning' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  loading?: boolean
  size?: ButtonSize
  variant?: ButtonVariant
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, children, className, disabled, loading = false, size = 'md', variant = 'primary', ...props }, ref) => {
    const isDisabled = disabled || loading
    const content = loading ? <><Spinner />{children}</> : children
    const classNames = mergeClassNames('brux-button', `brux-button--${variant}`, `brux-button--${size}`, loading && 'brux-button--loading', className)

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{ children?: React.ReactNode }>
      return (
        <Slot.Slot
          ref={ref}
          aria-busy={loading || undefined}
          aria-disabled={isDisabled || undefined}
          className={classNames}
          data-loading={loading || undefined}
          {...props}
        >
          {React.cloneElement(child, undefined, loading ? <><Spinner />{child.props.children}</> : child.props.children)}
        </Slot.Slot>
      )
    }

    return (
      <button
        ref={ref}
        aria-busy={loading || undefined}
        className={classNames}
        data-loading={loading || undefined}
        disabled={isDisabled}
        {...props}
      >
        {content}
      </button>
    )
  },
)

Button.displayName = 'Button'

export { Button }
