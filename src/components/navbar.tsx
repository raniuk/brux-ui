'use client'

import * as React from 'react'
import { Slot } from 'radix-ui'
import { mergeClassNames } from '../lib/index.js'

const Navbar = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => (
    <header ref={ref} className={mergeClassNames('brux-navbar', className)} {...props}>
      <nav className="brux-navbar-inner">{children}</nav>
    </header>
  ),
)

Navbar.displayName = 'Navbar'

export interface NavbarContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: 'start' | 'end'
}

const NavbarContent = React.forwardRef<HTMLDivElement, NavbarContentProps>(
  ({ className, side = 'start', ...props }, ref) => (
    <div
      ref={ref}
      className={mergeClassNames('brux-navbar-content', `brux-navbar-content--${side}`, className)}
      {...props}
    />
  ),
)

NavbarContent.displayName = 'NavbarContent'

export interface NavbarBrandProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean
}

const NavbarBrand = React.forwardRef<HTMLAnchorElement, NavbarBrandProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot.Slot : 'a'

    return <Component ref={ref} className={mergeClassNames('brux-navbar-brand', className)} {...props} />
  },
)

NavbarBrand.displayName = 'NavbarBrand'

export { Navbar, NavbarBrand, NavbarContent }
