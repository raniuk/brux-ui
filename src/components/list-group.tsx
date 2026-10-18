import * as React from 'react'
import { mergeClassNames } from '../lib/index.js'

type ListGroupVariant = 'default' | 'flush'

export interface ListGroupProps extends React.HTMLAttributes<HTMLUListElement> {
  variant?: ListGroupVariant
}

const ListGroup = React.forwardRef<HTMLUListElement, ListGroupProps>(
  ({ className, variant = 'default', ...props }, ref) => (
    <ul ref={ref} className={mergeClassNames('brux-list-group', `brux-list-group--${variant}`, className)} {...props} />
  ),
)

ListGroup.displayName = 'ListGroup'

export interface ListGroupItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  interactive?: boolean
}

const ListGroupItem = React.forwardRef<HTMLLIElement, ListGroupItemProps>(
  ({ className, interactive = false, ...props }, ref) => (
    <li
      ref={ref}
      className={mergeClassNames('brux-list-group-item', interactive && 'brux-list-group-item--interactive', className)}
      {...props}
    />
  ),
)

ListGroupItem.displayName = 'ListGroupItem'

export interface ListGroupIconProps extends React.HTMLAttributes<HTMLDivElement> {}

const ListGroupIcon = React.forwardRef<HTMLDivElement, ListGroupIconProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={mergeClassNames('brux-list-group-icon', className)} {...props} />
))

ListGroupIcon.displayName = 'ListGroupIcon'

export interface ListGroupContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const ListGroupContent = React.forwardRef<HTMLDivElement, ListGroupContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={mergeClassNames('brux-list-group-content', className)} {...props} />
  ),
)

ListGroupContent.displayName = 'ListGroupContent'

export interface ListGroupTitleProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const ListGroupTitle = React.forwardRef<HTMLParagraphElement, ListGroupTitleProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={mergeClassNames('brux-list-group-title', className)} {...props} />
  ),
)

ListGroupTitle.displayName = 'ListGroupTitle'

export interface ListGroupDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const ListGroupDescription = React.forwardRef<HTMLParagraphElement, ListGroupDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={mergeClassNames('brux-list-group-description', className)} {...props} />
  ),
)

ListGroupDescription.displayName = 'ListGroupDescription'

export interface ListGroupActionProps extends React.HTMLAttributes<HTMLDivElement> {}

const ListGroupAction = React.forwardRef<HTMLDivElement, ListGroupActionProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={mergeClassNames('brux-list-group-action', className)} {...props} />
  ),
)

ListGroupAction.displayName = 'ListGroupAction'

export {
  ListGroup,
  ListGroupAction,
  ListGroupContent,
  ListGroupDescription,
  ListGroupIcon,
  ListGroupItem,
  ListGroupTitle,
}
