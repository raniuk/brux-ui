import * as React from 'react'
import { mergeClassNames } from '../lib/index.js'

type CardPadding = 'none' | 'sm' | 'md'
type CardVariant = 'surface' | 'muted' | 'interactive' | 'brand'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: CardPadding
  variant?: CardVariant
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'surface', padding = 'md', ...props }, ref) => (
    <div
      ref={ref}
      className={mergeClassNames('brux-card', `brux-card--${variant}`, `brux-card--padding-${padding}`, className)}
      {...props}
    />
  ),
)

Card.displayName = 'Card'

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={mergeClassNames('brux-card-header', className)} {...props} />
))

CardHeader.displayName = 'CardHeader'

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={mergeClassNames('brux-card-title', className)} {...props} />
))

CardTitle.displayName = 'CardTitle'

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={mergeClassNames('brux-card-description', className)} {...props} />
  ),
)

CardDescription.displayName = 'CardDescription'

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={mergeClassNames('brux-card-content', className)} {...props} />
))

CardContent.displayName = 'CardContent'

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={mergeClassNames('brux-card-footer', className)} {...props} />
))

CardFooter.displayName = 'CardFooter'

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
