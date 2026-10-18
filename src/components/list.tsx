import * as React from 'react'
import { mergeClassNames } from '../lib/index.js'

type ListVariant = 'divided' | 'disc' | 'decimal'
type ListItemVariant = 'divided' | 'prose'

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  as?: 'ol' | 'ul'
  variant?: ListVariant
}

const List = React.forwardRef<HTMLUListElement, ListProps>(
  ({ as: Component = 'ul', className, variant = 'divided', ...props }, ref) => {
    const Tag = Component as React.ElementType

    return <Tag ref={ref} className={mergeClassNames('brux-list', `brux-list--${variant}`, className)} {...props} />
  },
)

List.displayName = 'List'

export interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  variant?: ListItemVariant
}

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(({ className, variant = 'divided', ...props }, ref) => (
  <li ref={ref} className={mergeClassNames('brux-list-item', `brux-list-item--${variant}`, className)} {...props} />
))

ListItem.displayName = 'ListItem'

export { List, ListItem }
