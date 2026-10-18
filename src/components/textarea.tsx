'use client'

import * as React from 'react'
import { mergeClassNames } from '../lib/index.js'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  containerClassName?: string
  showCount?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className, containerClassName, showCount = false, maxLength, rows = 3, value, defaultValue, onChange, ...props },
    ref,
  ) => {
    const isControlled = value !== undefined
    const [uncontrolledCount, setUncontrolledCount] = React.useState(() => String(defaultValue ?? '').length)
    const count = isControlled ? String(value ?? '').length : uncontrolledCount

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled && showCount) {
        setUncontrolledCount(event.target.value.length)
      }

      onChange?.(event)
    }

    const textarea = (
      <textarea
        ref={ref}
        maxLength={maxLength}
        rows={rows}
        {...(isControlled ? { value } : { defaultValue })}
        onChange={handleChange}
        className={mergeClassNames('brux-textarea', className)}
        {...props}
      />
    )

    if (!showCount) {
      return textarea
    }

    return (
      <div className={mergeClassNames('brux-textarea-container', containerClassName)}>
        {textarea}
        <span className="brux-textarea-count">
          {count}
          {maxLength != null ? `/${maxLength}` : null}
        </span>
      </div>
    )
  },
)

Textarea.displayName = 'Textarea'

export { Textarea }
