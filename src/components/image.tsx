import * as React from 'react'
import { mergeClassNames } from '../lib/index.js'

type ImageFit = 'contain' | 'cover' | 'fill' | 'none'
type ImageRounded = 'full' | 'lg' | 'md' | 'none' | 'sm'

export interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'alt'> {
  alt: string
  fit?: ImageFit
  rounded?: ImageRounded
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, alt, fit = 'cover', rounded = 'md', ...props }, ref) => (
    <img
      ref={ref}
      alt={alt}
      className={mergeClassNames('brux-image', `brux-image--rounded-${rounded}`, `brux-image--fit-${fit}`, className)}
      {...props}
    />
  ),
)

Image.displayName = 'Image'

export interface FigureProps extends React.HTMLAttributes<HTMLElement> {}

const Figure = React.forwardRef<HTMLElement, FigureProps>(({ className, ...props }, ref) => (
  <figure ref={ref} className={mergeClassNames('brux-figure', className)} {...props} />
))

Figure.displayName = 'Figure'

export interface FigureCaptionProps extends React.HTMLAttributes<HTMLElement> {}

const FigureCaption = React.forwardRef<HTMLElement, FigureCaptionProps>(({ className, ...props }, ref) => (
  <figcaption ref={ref} className={mergeClassNames('brux-figure-caption', className)} {...props} />
))

FigureCaption.displayName = 'FigureCaption'

export { Figure, FigureCaption, Image }
