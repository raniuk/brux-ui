'use client'

import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { Accordion as AccordionPrimitive } from 'radix-ui'
import { mergeClassNames } from '../lib/index.js'

type AccordionVariant = 'grouped' | 'plain'

export type AccordionProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> & {
  variant?: AccordionVariant
}

const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  AccordionProps
>(({ className, variant = 'grouped', ...props }, ref) => (
  <AccordionPrimitive.Root
    ref={ref}
    className={mergeClassNames('brux-accordion', `brux-accordion--${variant}`, className)}
    {...props}
  />
))

Accordion.displayName = 'Accordion'

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={mergeClassNames('brux-accordion-item', className)} {...props} />
))

AccordionItem.displayName = 'AccordionItem'

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="brux-accordion-header">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={mergeClassNames('brux-accordion-trigger', className)}
      {...props}
    >
      {children}
      <span aria-hidden="true" className="brux-accordion-indicator">
        <ChevronDown aria-hidden="true" />
      </span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))

AccordionTrigger.displayName = 'AccordionTrigger'

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content ref={ref} className="brux-accordion-content" {...props}>
    <div className={mergeClassNames('brux-accordion-content-inner', className)}>{children}</div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = 'AccordionContent'

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
