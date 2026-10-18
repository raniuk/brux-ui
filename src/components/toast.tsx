'use client'

import * as React from 'react'
import { Toast as ToastPrimitive } from 'radix-ui'
import { mergeClassNames } from '../lib/index.js'
import { Bell, CircleCheck, CircleX, Info, TriangleAlert, X } from 'lucide-react'

type ToastVariant = 'neutral' | 'success' | 'warning' | 'info' | 'danger'

const ToastVariantContext = React.createContext<ToastVariant>('neutral')

const ToastProvider = ToastPrimitive.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport ref={ref} className={mergeClassNames('brux-toast-viewport', className)} {...props} />
))

ToastViewport.displayName = ToastPrimitive.Viewport.displayName

export interface ToastProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root> {
  variant?: ToastVariant
}

const Toast = React.forwardRef<React.ElementRef<typeof ToastPrimitive.Root>, ToastProps>(
  ({ className, variant = 'neutral', ...props }, ref) => (
    <ToastVariantContext.Provider value={variant}>
      <ToastPrimitive.Root
        ref={ref}
        className={mergeClassNames('brux-toast', `brux-toast--${variant}`, className)}
        {...props}
      />
    </ToastVariantContext.Provider>
  ),
)

Toast.displayName = ToastPrimitive.Root.displayName

interface StatusIconProps {
  variant: ToastVariant
}

const STATUS_ICONS = {
  neutral: Bell,
  success: CircleCheck,
  warning: TriangleAlert,
  info: Info,
  danger: CircleX,
} as const

function StatusIcon({ variant }: StatusIconProps) {
  const Icon = STATUS_ICONS[variant]

  return <Icon aria-hidden="true" />
}

export interface ToastIconProps extends React.HTMLAttributes<HTMLDivElement> {}

const ToastIcon = React.forwardRef<HTMLDivElement, ToastIconProps>(({ className, children, ...props }, ref) => {
  const variant = React.useContext(ToastVariantContext)

  return (
    <span ref={ref} className={mergeClassNames('brux-toast-icon', `brux-toast-icon--${variant}`, className)} {...props}>
      {children ?? <StatusIcon variant={variant} />}
    </span>
  )
})

ToastIcon.displayName = 'ToastIcon'

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Title ref={ref} className={mergeClassNames('brux-toast-title', className)} {...props} />
))

ToastTitle.displayName = ToastPrimitive.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Description
    ref={ref}
    className={mergeClassNames('brux-toast-description', className)}
    {...props}
  />
))

ToastDescription.displayName = ToastPrimitive.Description.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Action ref={ref} className={mergeClassNames('brux-toast-action', className)} {...props} />
))

ToastAction.displayName = ToastPrimitive.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close>
>(({ className, children, ...props }, ref) => (
  <ToastPrimitive.Close ref={ref} className={mergeClassNames('brux-toast-close', className)} {...props}>
    {children ?? <X aria-hidden="true" />}
  </ToastPrimitive.Close>
))

ToastClose.displayName = ToastPrimitive.Close.displayName

export interface ToastOptions {
  action?: React.ReactNode
  description?: React.ReactNode
  duration?: number
  title?: React.ReactNode
  variant?: ToastVariant
}

type ToastRecord = ToastOptions & { id: string }
type ToastInput = string | ToastOptions

const TOAST_LIMIT = 4
const EMPTY_TOASTS: ToastRecord[] = []

let toastState: ToastRecord[] = []
let toastCounter = 0
const toastListeners = new Set<() => void>()

function emitToastChange() {
  toastListeners.forEach((listener) => listener())
}

function subscribeToToasts(listener: () => void) {
  toastListeners.add(listener)

  return () => {
    toastListeners.delete(listener)
  }
}

function getToastSnapshot() {
  return toastState
}

function getEmptyToastSnapshot() {
  return EMPTY_TOASTS
}

function showToast(options: ToastOptions) {
  const id = `toast-${++toastCounter}`
  toastState = [...toastState, { id, ...options }].slice(-TOAST_LIMIT)
  emitToastChange()

  return id
}

function hideToast(id: string) {
  toastState = toastState.filter((item) => item.id !== id)
  emitToastChange()
}

function normalizeToastInput(input: ToastInput): ToastOptions {
  return typeof input === 'string' ? { title: input } : input
}

const toast = Object.assign((input: ToastInput) => showToast(normalizeToastInput(input)), {
  success: (input: ToastInput) => showToast({ ...normalizeToastInput(input), variant: 'success' }),
  danger: (input: ToastInput) => showToast({ ...normalizeToastInput(input), variant: 'danger' }),
  warning: (input: ToastInput) => showToast({ ...normalizeToastInput(input), variant: 'warning' }),
  info: (input: ToastInput) => showToast({ ...normalizeToastInput(input), variant: 'info' }),
  dismiss: (id: string) => hideToast(id),
})

export interface ToasterProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport> {}

const Toaster = React.forwardRef<React.ElementRef<typeof ToastPrimitive.Viewport>, ToasterProps>(
  ({ className, ...props }, ref) => {
    const toasts = React.useSyncExternalStore(subscribeToToasts, getToastSnapshot, getEmptyToastSnapshot)

    return (
      <ToastProvider swipeDirection="right">
        {toasts.map(({ id, title, description, variant, duration, action }) => (
          <Toast
            key={id}
            variant={variant}
            duration={duration}
            onOpenChange={(open) => {
              if (!open) {
                hideToast(id)
              }
            }}
          >
            <ToastIcon />
            <div className="brux-toast-body">
              {title ? <ToastTitle>{title}</ToastTitle> : null}
              {description ? <ToastDescription>{description}</ToastDescription> : null}
            </div>
            {action}
            <ToastClose />
          </Toast>
        ))}
        <ToastViewport ref={ref} className={className} {...props} />
      </ToastProvider>
    )
  },
)

Toaster.displayName = 'Toaster'

export {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastIcon,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  Toaster,
  toast,
}
