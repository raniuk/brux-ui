'use client'

import * as React from 'react'
import { Tooltip as TooltipPrimitive } from 'radix-ui'
import { mergeClassNames } from '../lib/index.js'

const TooltipProvider = TooltipPrimitive.Provider
const Tooltip = TooltipPrimitive.Root
const TooltipTrigger = TooltipPrimitive.Trigger
const TooltipPortal = TooltipPrimitive.Portal

export interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {}

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, sideOffset = 6, children, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={mergeClassNames('brux-tooltip-content', className)}
      {...props}
    >
      {children}
      <TooltipPrimitive.Arrow className="brux-tooltip-arrow" />
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
))

TooltipContent.displayName = TooltipPrimitive.Content.displayName

const TooltipArrow = TooltipPrimitive.Arrow

export { Tooltip, TooltipArrow, TooltipContent, TooltipPortal, TooltipProvider, TooltipTrigger }
