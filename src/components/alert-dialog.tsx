'use client'

import * as React from 'react'
import { AlertDialog as AlertDialogPrimitive } from 'radix-ui'
import { mergeClassNames } from '../lib/index.js'
import { Button } from './button.js'

type AlertDialogSize = 'sm' | 'md' | 'lg'
type AlertDialogActionVariant = 'primary' | 'secondary' | 'warning' | 'danger'

const AlertDialog = AlertDialogPrimitive.Root
const AlertDialogTrigger = AlertDialogPrimitive.Trigger
const AlertDialogPortal = AlertDialogPrimitive.Portal

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay ref={ref} className={mergeClassNames('brux-alert-dialog-overlay', className)} {...props} />
))

AlertDialogOverlay.displayName = 'AlertDialogOverlay'

export interface AlertDialogContentProps extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content> {
  size?: AlertDialogSize
}

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  AlertDialogContentProps
>(({ className, size = 'md', onEscapeKeyDown, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={mergeClassNames('brux-alert-dialog-content', `brux-alert-dialog-content--${size}`, className)}
      onEscapeKeyDown={(event) => {
        onEscapeKeyDown?.(event)
        event.preventDefault()
      }}
      {...props}
    />
  </AlertDialogPortal>
))

AlertDialogContent.displayName = 'AlertDialogContent'

const AlertDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={mergeClassNames('brux-alert-dialog-header', className)} {...props} />
)

const AlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={mergeClassNames('brux-alert-dialog-footer', className)} {...props} />
)

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title ref={ref} className={mergeClassNames('brux-alert-dialog-title', className)} {...props} />
))

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description ref={ref} className={mergeClassNames('brux-alert-dialog-description', className)} {...props} />
))

export interface AlertDialogActionProps extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action> {
  variant?: AlertDialogActionVariant
}

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  AlertDialogActionProps
>(({ className, variant = 'primary', children, ...props }, ref) => (
  <Button asChild ref={ref} className={className} variant={variant}>
    <AlertDialogPrimitive.Action {...props}>{children}</AlertDialogPrimitive.Action>
  </Button>
))

export interface AlertDialogCancelProps extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel> {}

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  AlertDialogCancelProps
>(({ className, children, ...props }, ref) => (
  <Button asChild ref={ref} className={className} variant="secondary">
    <AlertDialogPrimitive.Cancel {...props}>{children}</AlertDialogPrimitive.Cancel>
  </Button>
))

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
}
