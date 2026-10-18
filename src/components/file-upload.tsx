import * as React from 'react'
import { mergeClassNames } from '../lib/index.js'
import { Upload } from 'lucide-react'

export interface FileUploadProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'children' | 'title' | 'type'> {
  action?: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  title?: React.ReactNode
}

const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      action = 'Choose file',
      className,
      description = 'PDF, PNG, or JPG up to 10 MB.',
      disabled,
      icon,
      title = 'Upload supporting document',
      'aria-invalid': ariaInvalid,
      ...props
    },
    ref,
  ) => {
    const isInvalid = ariaInvalid === true || ariaInvalid === 'true'

    return (
      <label
        data-disabled={disabled || undefined}
        data-invalid={isInvalid || undefined}
        className={mergeClassNames('brux-file-upload', className)}
      >
        <span className="brux-file-upload-icon">{icon ?? <Upload aria-hidden="true" />}</span>
        <span className="brux-file-upload-copy">
          <span className="brux-file-upload-title">{title}</span>
          <span className="brux-file-upload-description">{description}</span>
          {action ? <span className="brux-file-upload-action">{action}</span> : null}
        </span>
        <input ref={ref} type="file" className="brux-visually-hidden" disabled={disabled} aria-invalid={ariaInvalid} {...props} />
      </label>
    )
  },
)

FileUpload.displayName = 'FileUpload'

export { FileUpload }
