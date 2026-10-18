import * as React from 'react'
import { mergeClassNames } from '../lib/index.js'

type AlertVariant = 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'accent'

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'neutral', ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={mergeClassNames('brux-alert', `brux-alert--${variant}`, className)}
      {...props}
    />
  ),
)

Alert.displayName = 'Alert'

const AlertTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => <h5 ref={ref} className={mergeClassNames('brux-alert-title', className)} {...props} />,
)

AlertTitle.displayName = 'AlertTitle'

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => <p ref={ref} className={mergeClassNames('brux-alert-description', className)} {...props} />,
)

AlertDescription.displayName = 'AlertDescription'

export { Alert, AlertDescription, AlertTitle }
