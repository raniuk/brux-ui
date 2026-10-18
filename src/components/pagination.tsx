'use client'

import * as React from 'react'
import { Slot } from 'radix-ui'
import { mergeClassNames } from '../lib/index.js'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'

type PaginationSize = 'sm' | 'md' | 'lg'

export interface PaginationProps extends React.ComponentProps<'nav'> {}

const Pagination = React.forwardRef<HTMLElement, PaginationProps>(({ className, ...props }, ref) => (
  <nav
    ref={ref}
    aria-label="Pagination"
    className={mergeClassNames('brux-pagination', className)}
    {...props}
  />
))

Pagination.displayName = 'Pagination'

export interface PaginationContentProps extends React.ComponentProps<'ul'> {}

const PaginationContent = React.forwardRef<HTMLUListElement, PaginationContentProps>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={mergeClassNames('brux-pagination-content', className)} {...props} />
  ),
)

PaginationContent.displayName = 'PaginationContent'

export interface PaginationItemProps extends React.ComponentProps<'li'> {}

const PaginationItem = React.forwardRef<HTMLLIElement, PaginationItemProps>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={mergeClassNames('brux-pagination-item', className)} {...props} />
  ),
)

PaginationItem.displayName = 'PaginationItem'

export interface PaginationLinkProps extends React.ComponentProps<'a'> {
  asChild?: boolean
  disabled?: boolean
  isActive?: boolean
  size?: PaginationSize
}

const PaginationLink = React.forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  ({ className, isActive = false, size = 'md', disabled = false, asChild = false, tabIndex, ...props }, ref) => {
    const Component = asChild ? Slot.Slot : 'a'

    return (
      <Component
        ref={ref}
        aria-current={isActive ? 'page' : undefined}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : tabIndex}
        className={mergeClassNames(
          'brux-pagination-link',
          `brux-pagination-link--${size}`,
          isActive && 'brux-pagination-link--active',
          disabled && 'brux-pagination-link--disabled',
          className,
        )}
        {...props}
      />
    )
  },
)

PaginationLink.displayName = 'PaginationLink'

export interface PaginationPreviousProps extends PaginationLinkProps {}

const PaginationPrevious = React.forwardRef<HTMLAnchorElement, PaginationPreviousProps>(
  ({ className, size = 'sm', ...props }, ref) => (
    <PaginationLink ref={ref} size={size} aria-label="Go to previous page" className={className} {...props}>
      <ChevronLeft aria-hidden="true" />
      <span className="brux-visually-hidden">Previous</span>
    </PaginationLink>
  ),
)

PaginationPrevious.displayName = 'PaginationPrevious'

export interface PaginationNextProps extends PaginationLinkProps {}

const PaginationNext = React.forwardRef<HTMLAnchorElement, PaginationNextProps>(
  ({ className, size = 'sm', ...props }, ref) => (
    <PaginationLink ref={ref} size={size} aria-label="Go to next page" className={className} {...props}>
      <ChevronRight aria-hidden="true" />
      <span className="brux-visually-hidden">Next</span>
    </PaginationLink>
  ),
)

PaginationNext.displayName = 'PaginationNext'

export interface PaginationEllipsisProps extends React.ComponentProps<'span'> {
  size?: PaginationSize
}

const PaginationEllipsis = React.forwardRef<HTMLSpanElement, PaginationEllipsisProps>(
  ({ className, size = 'md', ...props }, ref) => (
    <span
      ref={ref}
      aria-hidden="true"
      className={mergeClassNames(
        'brux-pagination-link',
        'brux-pagination-link--ellipsis',
        `brux-pagination-link--${size}`,
        className,
      )}
      {...props}
    >
      <MoreHorizontal aria-hidden="true" />
    </span>
  ),
)

PaginationEllipsis.displayName = 'PaginationEllipsis'

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
