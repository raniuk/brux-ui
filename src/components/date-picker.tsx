'use client'

import * as React from 'react'
import { applyDisplayMask, parseDisplay, parseWire, toDisplay, toWire } from '../lib/index.js'
import { mergeClassNames } from '../lib/index.js'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from './calendar.js'
import { Input, type InputProps } from './input.js'
import { Popover, PopoverContent, PopoverTrigger } from './popover.js'

export interface DatePickerProps
  extends Omit<InputProps, 'defaultValue' | 'onChange' | 'type' | 'value'> {
  defaultValue?: string
  onValueChange?: (value: string | undefined) => void
  value?: string
}

const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      'aria-invalid': ariaInvalid,
      className,
      defaultValue,
      disabled,
      id,
      onBlur,
      onValueChange,
      placeholder = 'yyyy-mm-dd',
      size,
      value,
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false)
    const [text, setText] = React.useState(() => {
      const seed = parseWire(value) ?? parseWire(defaultValue)

      return seed ? toDisplay(seed) : ''
    })
    const [blurred, setBlurred] = React.useState(false)
    const calendarRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
      if (value === undefined) {
        return
      }

      const parsedText = parseDisplay(text)
      const currentWire = parsedText ? toWire(parsedText) : undefined

      if (value === currentWire) {
        return
      }

      const next = parseWire(value)
      setText(next ? toDisplay(next) : '')
    }, [value])

    const parsed = parseDisplay(text)
    const wire = parsed ? toWire(parsed) : undefined
    const invalid = ariaInvalid ?? (blurred && text !== '' && !parsed ? true : undefined)

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      const masked = applyDisplayMask(event.target.value, text)
      setText(masked)

      const next = parseDisplay(masked)
      onValueChange?.(next ? toWire(next) : undefined)
    }

    function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
      setBlurred(true)
      onBlur?.(event)
    }

    function handleSelect(next: string) {
      const date = parseWire(next)

      if (!date) {
        return
      }

      setText(toDisplay(date))
      setBlurred(false)
      onValueChange?.(next)
      setOpen(false)
    }

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <div className="brux-date-picker">
          <Input
            ref={ref}
            id={id}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            placeholder={placeholder}
            value={text}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={disabled}
            aria-invalid={invalid}
            size={size}
            className={mergeClassNames('brux-date-picker-input', className)}
            {...props}
          />
          <PopoverTrigger asChild>
            <button type="button" aria-label="Open calendar" disabled={disabled} className="brux-date-picker-trigger">
              <CalendarIcon aria-hidden="true" />
            </button>
          </PopoverTrigger>
        </div>
        <PopoverContent
          align="start"
          className="brux-date-picker-content"
          onOpenAutoFocus={(event) => {
            event.preventDefault()
            calendarRef.current?.querySelector<HTMLButtonElement>('[tabindex="0"]')?.focus()
          }}
        >
          <Calendar ref={calendarRef} selected={wire} onSelect={handleSelect} />
        </PopoverContent>
      </Popover>
    )
  },
)

DatePicker.displayName = 'DatePicker'

export { DatePicker }
