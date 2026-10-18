import * as React from 'react'
import { mergeClassNames } from '../lib/index.js'

export interface FieldsetProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {}

const Fieldset = React.forwardRef<HTMLFieldSetElement, FieldsetProps>(({ className, ...props }, ref) => (
  <fieldset ref={ref} className={mergeClassNames('brux-fieldset', className)} {...props} />
))

Fieldset.displayName = 'Fieldset'

export interface FieldsetLegendProps extends React.HTMLAttributes<HTMLLegendElement> {}

const FieldsetLegend = React.forwardRef<HTMLLegendElement, FieldsetLegendProps>(
  ({ className, ...props }, ref) => (
    <legend ref={ref} className={mergeClassNames('brux-fieldset-legend', className)} {...props} />
  ),
)

FieldsetLegend.displayName = 'FieldsetLegend'

export interface FieldsetDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const FieldsetDescription = React.forwardRef<HTMLParagraphElement, FieldsetDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={mergeClassNames('brux-fieldset-description', className)} {...props} />
  ),
)

FieldsetDescription.displayName = 'FieldsetDescription'

export { Fieldset, FieldsetDescription, FieldsetLegend }
