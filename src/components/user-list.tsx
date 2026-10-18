import * as React from 'react'
import { mergeClassNames } from '../lib/index.js'

export interface UserListProps extends React.ComponentProps<'ul'> {}

const UserList = React.forwardRef<HTMLUListElement, UserListProps>(({ className, ...props }, ref) => (
  <ul ref={ref} className={mergeClassNames('brux-user-list', className)} {...props} />
))

UserList.displayName = 'UserList'

export interface UserListItemProps extends React.ComponentProps<'li'> {}

const UserListItem = React.forwardRef<HTMLLIElement, UserListItemProps>(({ className, ...props }, ref) => (
  <li ref={ref} className={mergeClassNames('brux-user-list-item', className)} {...props} />
))

UserListItem.displayName = 'UserListItem'

export interface UserListItemContentProps extends React.ComponentProps<'div'> {}

const UserListItemContent = React.forwardRef<HTMLDivElement, UserListItemContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={mergeClassNames('brux-user-list-item-content', className)} {...props} />
  ),
)

UserListItemContent.displayName = 'UserListItemContent'

export interface UserListItemTitleProps extends React.ComponentProps<'p'> {}

const UserListItemTitle = React.forwardRef<HTMLParagraphElement, UserListItemTitleProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={mergeClassNames('brux-user-list-item-title', className)} {...props} />
  ),
)

UserListItemTitle.displayName = 'UserListItemTitle'

export interface UserListItemDescriptionProps extends React.ComponentProps<'p'> {}

const UserListItemDescription = React.forwardRef<HTMLParagraphElement, UserListItemDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={mergeClassNames('brux-user-list-item-description', className)} {...props} />
  ),
)

UserListItemDescription.displayName = 'UserListItemDescription'

export interface UserListItemValueProps extends React.ComponentProps<'div'> {}

const UserListItemValue = React.forwardRef<HTMLDivElement, UserListItemValueProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={mergeClassNames('brux-user-list-item-value', className)} {...props} />
  ),
)

UserListItemValue.displayName = 'UserListItemValue'

export {
  UserList,
  UserListItem,
  UserListItemContent,
  UserListItemDescription,
  UserListItemTitle,
  UserListItemValue,
}
