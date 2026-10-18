'use client'

import * as React from 'react'
import { Collapsible, Dialog as DialogPrimitive, Slot } from 'radix-ui'
import { mergeClassNames } from '../lib/index.js'
import { ChevronDown, Menu, X } from 'lucide-react'
import { Button } from './button.js'

const MOBILE_BREAKPOINT = 640

interface SidebarContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  toggle: () => void
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)

  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }

  return context
}

function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const query = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => setIsMobile(query.matches)

    onChange()
    query.addEventListener('change', onChange)

    return () => query.removeEventListener('change', onChange)
  }, [])

  return isMobile
}

export interface SidebarProviderProps {
  children?: React.ReactNode
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  open?: boolean
}

const SidebarProvider = ({ children, open: openProp, defaultOpen = false, onOpenChange }: SidebarProviderProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const open = openProp ?? uncontrolledOpen

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (openProp === undefined) {
        setUncontrolledOpen(next)
      }

      onOpenChange?.(next)
    },
    [openProp, onOpenChange],
  )

  const toggle = React.useCallback(() => setOpen(!open), [open, setOpen])
  const value = React.useMemo(() => ({ open, setOpen, toggle }), [open, setOpen, toggle])

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}

SidebarProvider.displayName = 'SidebarProvider'

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  label?: string
}

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ className, children, label = 'Sidebar', ...props }, ref) => {
    const { open, setOpen } = useSidebar()
    const isMobile = useIsMobile()

    React.useEffect(() => {
      if (!isMobile && open) {
        setOpen(false)
      }
    }, [isMobile, open, setOpen])

    return (
      <>
        <aside ref={ref} aria-label={label} className={mergeClassNames('brux-sidebar', className)} {...props}>
          {children}
        </aside>
        <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
          <DialogPrimitive.Portal>
            <DialogPrimitive.Overlay className="brux-sidebar-overlay" />
            <DialogPrimitive.Content className="brux-sidebar-mobile">
              <DialogPrimitive.Title className="brux-visually-hidden">{label}</DialogPrimitive.Title>
              <DialogPrimitive.Description className="brux-visually-hidden">
                {label} navigation
              </DialogPrimitive.Description>
              {children}
              <DialogPrimitive.Close className="brux-sidebar-close">
                <X aria-hidden="true" />
                <span className="brux-visually-hidden">Close</span>
              </DialogPrimitive.Close>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
      </>
    )
  },
)

Sidebar.displayName = 'Sidebar'

const SidebarHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={mergeClassNames('brux-sidebar-header', className)} {...props} />
  ),
)

SidebarHeader.displayName = 'SidebarHeader'

const SidebarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={mergeClassNames('brux-sidebar-content', className)} {...props} />
  ),
)

SidebarContent.displayName = 'SidebarContent'

const SidebarFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={mergeClassNames('brux-sidebar-footer', className)} {...props} />
  ),
)

SidebarFooter.displayName = 'SidebarFooter'

export interface SidebarGroupProps extends React.HTMLAttributes<HTMLLIElement> {
  badge?: React.ReactNode
  defaultOpen?: boolean
  disabled?: boolean
  icon?: React.ElementType
  label: string
  onOpenChange?: (open: boolean) => void
  open?: boolean
}

interface SidebarCollapsibleGroupProps extends SidebarGroupProps {
  nested?: boolean
}

const SidebarCollapsibleGroup = React.forwardRef<HTMLLIElement, SidebarCollapsibleGroupProps>(
  (
    {
      className,
      label,
      icon: Icon,
      badge,
      nested = false,
      children,
      defaultOpen,
      open,
      onOpenChange,
      disabled,
      ...props
    },
    ref,
  ) => (
    <li ref={ref} className={mergeClassNames('brux-sidebar-group', className)} {...props}>
      <Collapsible.Root defaultOpen={defaultOpen} open={open} onOpenChange={onOpenChange} disabled={disabled}>
        <Collapsible.Trigger
          className={mergeClassNames('brux-sidebar-group-trigger', nested && 'brux-sidebar-group-trigger--nested')}
        >
          {Icon ? <Icon aria-hidden="true" /> : null}
          <span className="brux-sidebar-group-label">{label}</span>
          {badge}
          <ChevronDown aria-hidden="true" className="brux-sidebar-group-indicator" />
        </Collapsible.Trigger>
        <Collapsible.Content className="brux-sidebar-group-content">
          <ul className="brux-sidebar-group-list">{children}</ul>
        </Collapsible.Content>
      </Collapsible.Root>
    </li>
  ),
)

SidebarCollapsibleGroup.displayName = 'SidebarCollapsibleGroup'

const SidebarGroup = React.forwardRef<HTMLLIElement, SidebarGroupProps>((props, ref) => (
  <SidebarCollapsibleGroup ref={ref} {...props} />
))

SidebarGroup.displayName = 'SidebarGroup'

const SidebarSubGroup = React.forwardRef<HTMLLIElement, SidebarGroupProps>((props, ref) => (
  <SidebarCollapsibleGroup ref={ref} nested {...props} />
))

SidebarSubGroup.displayName = 'SidebarSubGroup'

export interface SidebarItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean
  asChild?: boolean
  badge?: React.ReactNode
  disabled?: boolean
  icon?: React.ElementType
  linkComponent?: React.ElementType
}

const SidebarItem = React.forwardRef<HTMLLIElement, SidebarItemProps>(
  (
    {
      className,
      children,
      icon: Icon,
      badge,
      active = false,
      disabled = false,
      asChild = false,
      linkComponent,
      href,
      ...props
    },
    ref,
  ) => {
    const Component = asChild ? Slot.Slot : (linkComponent ?? 'a')

    return (
      <li ref={ref} className="brux-sidebar-item-wrapper">
        <Component
          href={href}
          aria-current={active ? 'page' : undefined}
          aria-disabled={disabled || undefined}
          className={mergeClassNames('brux-sidebar-item', disabled && 'brux-sidebar-item--disabled', className)}
          {...props}
        >
          {asChild ? (
            children
          ) : (
            <>
              {Icon ? <Icon aria-hidden="true" /> : null}
              <span className="brux-sidebar-item-label">{children}</span>
              {badge}
            </>
          )}
        </Component>
      </li>
    )
  },
)

SidebarItem.displayName = 'SidebarItem'

export interface SidebarNavItem {
  active?: boolean
  badge?: React.ReactNode
  disabled?: boolean
  href?: string
  icon?: React.ElementType
  id: string | number
  items?: SidebarNavItem[]
  label: string
}

export interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  defaultOpenIds?: Array<string | number>
  items: SidebarNavItem[]
  label?: string
  linkComponent?: React.ElementType
}

function renderNavItems(
  items: SidebarNavItem[],
  depth: number,
  defaultOpenIds: Array<string | number>,
  linkComponent: React.ElementType | undefined,
): React.ReactNode {
  return items.map((item) => {
    if (item.items && item.items.length > 0) {
      const Group = depth === 0 ? SidebarGroup : SidebarSubGroup

      return (
        <Group
          key={item.id}
          label={item.label}
          icon={item.icon}
          badge={item.badge}
          defaultOpen={defaultOpenIds.includes(item.id)}
        >
          {renderNavItems(item.items, depth + 1, defaultOpenIds, linkComponent)}
        </Group>
      )
    }

    return (
      <SidebarItem
        key={item.id}
        href={item.href}
        icon={item.icon}
        badge={item.badge}
        active={item.active}
        disabled={item.disabled}
        linkComponent={linkComponent}
      >
        {item.label}
      </SidebarItem>
    )
  })
}

const SidebarNav = React.forwardRef<HTMLElement, SidebarNavProps>(
  ({ className, items, linkComponent, defaultOpenIds = [], label = 'Navigation', ...props }, ref) => (
    <nav ref={ref} aria-label={label} className={className} {...props}>
      <ul className="brux-sidebar-nav-list">{renderNavItems(items, 0, defaultOpenIds, linkComponent)}</ul>
    </nav>
  ),
)

SidebarNav.displayName = 'SidebarNav'

export interface SidebarTriggerProps extends React.ComponentPropsWithoutRef<typeof Button> {}

const SidebarTrigger = React.forwardRef<HTMLButtonElement, SidebarTriggerProps>(
  ({ className, onClick, ...props }, ref) => {
    const { open, setOpen } = useSidebar()

    return (
      <Button
        ref={ref}
        variant="ghost"
        size="icon"
        aria-label="Open navigation"
        aria-expanded={open}
        className={mergeClassNames('brux-sidebar-trigger', className)}
        onClick={(event) => {
          onClick?.(event)
          setOpen(true)
        }}
        {...props}
      >
        <Menu aria-hidden="true" />
      </Button>
    )
  },
)

SidebarTrigger.displayName = 'SidebarTrigger'

const SidebarInset = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={mergeClassNames('brux-sidebar-inset', className)} {...props} />
  ),
)

SidebarInset.displayName = 'SidebarInset'

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarItem,
  SidebarNav,
  SidebarProvider,
  SidebarSubGroup,
  SidebarTrigger,
  useSidebar,
}
