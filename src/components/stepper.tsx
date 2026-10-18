import * as React from 'react'
import { mergeClassNames } from '../lib/index.js'
import { Check } from 'lucide-react'

type StepperStatus = 'complete' | 'current' | 'error' | 'upcoming'
type StepperVariant = 'default' | 'detailed' | 'icon' | 'vertical'
type StepperIndicatorSize = 'sm' | 'md' | 'lg'

export interface StepperProps extends React.ComponentProps<'ol'> {
  variant?: StepperVariant
}

const Stepper = React.forwardRef<HTMLOListElement, StepperProps>(
  ({ className, variant = 'default', ...props }, ref) => (
    <ol ref={ref} className={mergeClassNames('brux-stepper', `brux-stepper--${variant}`, className)} {...props} />
  ),
)

Stepper.displayName = 'Stepper'

export interface StepperItemProps extends React.ComponentProps<'li'> {
  status?: StepperStatus
  variant?: StepperVariant
}

const StepperItem = React.forwardRef<HTMLLIElement, StepperItemProps>(
  ({ className, variant = 'default', status = 'upcoming', ...props }, ref) => (
    <li
      ref={ref}
      data-status={status}
      aria-current={status === 'current' ? 'step' : undefined}
      className={mergeClassNames('brux-stepper-item', `brux-stepper-item--${variant}`, className)}
      {...props}
    />
  ),
)

StepperItem.displayName = 'StepperItem'

export interface StepperIndicatorProps extends React.ComponentProps<'span'> {
  size?: StepperIndicatorSize
  status?: StepperStatus
}

const StepperIndicator = React.forwardRef<HTMLSpanElement, StepperIndicatorProps>(
  ({ className, size = 'md', status = 'upcoming', children, ...props }, ref) => (
    <span
      ref={ref}
      data-status={status}
      className={mergeClassNames('brux-stepper-indicator', `brux-stepper-indicator--${size}`, className)}
      {...props}
    >
      {children ?? (status === 'complete' ? <Check aria-hidden="true" /> : null)}
    </span>
  ),
)

StepperIndicator.displayName = 'StepperIndicator'

export interface StepperContentProps extends React.ComponentProps<'span'> {}

const StepperContent = React.forwardRef<HTMLSpanElement, StepperContentProps>(
  ({ className, ...props }, ref) => (
    <span ref={ref} className={mergeClassNames('brux-stepper-content', className)} {...props} />
  ),
)

StepperContent.displayName = 'StepperContent'

export interface StepperTitleProps extends React.ComponentProps<'span'> {}

const StepperTitle = React.forwardRef<HTMLSpanElement, StepperTitleProps>(
  ({ className, ...props }, ref) => (
    <span ref={ref} className={mergeClassNames('brux-stepper-title', className)} {...props} />
  ),
)

StepperTitle.displayName = 'StepperTitle'

export interface StepperDescriptionProps extends React.ComponentProps<'span'> {}

const StepperDescription = React.forwardRef<HTMLSpanElement, StepperDescriptionProps>(
  ({ className, ...props }, ref) => (
    <span ref={ref} className={mergeClassNames('brux-stepper-description', className)} {...props} />
  ),
)

StepperDescription.displayName = 'StepperDescription'

export { Stepper, StepperContent, StepperDescription, StepperIndicator, StepperItem, StepperTitle }
