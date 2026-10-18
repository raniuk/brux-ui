'use client'

import * as React from 'react'
import { ScrollArea as ScrollAreaPrimitive } from 'radix-ui'
import { mergeClassNames } from '../lib/index.js'

type ScrollAreaScrollbars = 'vertical' | 'horizontal' | 'both'

export interface ScrollAreaProps
  extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  scrollbars?: ScrollAreaScrollbars
}

const ScrollArea = React.forwardRef<React.ElementRef<typeof ScrollAreaPrimitive.Root>, ScrollAreaProps>(
  ({ className, children, scrollbars = 'vertical', ...props }, ref) => (
    <ScrollAreaPrimitive.Root
      ref={ref}
      className={mergeClassNames('brux-scroll-area', className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport className="brux-scroll-area-viewport">
        {children}
      </ScrollAreaPrimitive.Viewport>
      {scrollbars !== 'horizontal' ? <ScrollBar orientation="vertical" /> : null}
      {scrollbars !== 'vertical' ? <ScrollBar orientation="horizontal" /> : null}
    </ScrollAreaPrimitive.Root>
  ),
)

ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

export interface ScrollBarProps
  extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> {}

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  ScrollBarProps
>(({ className, orientation = 'vertical', ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={mergeClassNames(
      'brux-scroll-area-bar',
      `brux-scroll-area-bar--${orientation}`,
      className,
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="brux-scroll-area-thumb" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))

ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
