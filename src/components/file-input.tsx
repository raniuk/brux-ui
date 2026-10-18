import * as React from 'react'
import { mergeClassNames } from '../lib/index.js'

type FileInputSize = 'sm' | 'md' | 'lg'

export interface FileInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  size?: FileInputSize
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(({ className, size = 'md', ...props }, ref) => (
  <input
    ref={ref}
    type="file"
    className={mergeClassNames('brux-file-input', `brux-file-input--${size}`, className)}
    {...props}
  />
))

FileInput.displayName = 'FileInput'

export { FileInput }
