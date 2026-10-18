'use client'

import * as React from 'react'
import {
  type CivilDate,
  WEEKDAYS_LONG,
  WEEKDAYS_SHORT,
  addDays,
  addMonths,
  buildMonthGrid,
  daysInMonth,
  endOfWeek,
  formatLong,
  formatMonthLabel,
  parseWire,
  sameCivil,
  startOfWeek,
  toWire,
  today,
} from '../lib/index.js'
import { mergeClassNames } from '../lib/index.js'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export interface CalendarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  defaultMonth?: string
  disabled?: boolean
  month?: string
  onMonthChange?: (month: string) => void
  onSelect?: (value: string) => void
  selected?: string
}

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  ({ className, defaultMonth, disabled, month, onMonthChange, onSelect, selected, ...props }, ref) => {
    const selectedDate = parseWire(selected)
    const controlledMonth = parseWire(month)

    const [cursor, setCursor] = React.useState(() => {
      const seed = controlledMonth ?? selectedDate ?? parseWire(defaultMonth) ?? today()

      return { year: seed.year, month: seed.month }
    })
    const [focused, setFocused] = React.useState<CivilDate>(() => selectedDate ?? today())
    const shouldFocusRef = React.useRef(false)
    const gridRef = React.useRef<HTMLDivElement>(null)

    const setGridRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        gridRef.current = node

        if (typeof ref === 'function') {
          ref(node)
        } else if (ref) {
          ref.current = node
        }
      },
      [ref],
    )

    React.useEffect(() => {
      if (!controlledMonth) {
        return
      }

      setCursor({ year: controlledMonth.year, month: controlledMonth.month })
    }, [month])

    React.useEffect(() => {
      if (!shouldFocusRef.current) {
        return
      }

      shouldFocusRef.current = false
      gridRef.current?.querySelector<HTMLButtonElement>(`[data-date="${toWire(focused)}"]`)?.focus()
    }, [focused])

    function updateCursor(next: { month: number; year: number }) {
      setCursor(next)
      onMonthChange?.(toWire({ ...next, day: 1 }))
    }

    function moveFocus(next: CivilDate) {
      shouldFocusRef.current = true
      setFocused(next)

      if (next.year !== cursor.year || next.month !== cursor.month) {
        updateCursor({ year: next.year, month: next.month })
      }
    }

    function moveMonth(amount: number) {
      const next = addMonths(cursor.year, cursor.month, amount)

      updateCursor(next)
      setFocused({
        year: next.year,
        month: next.month,
        day: Math.min(focused.day, daysInMonth(next.year, next.month)),
      })
    }

    function selectDate(date: CivilDate) {
      if (disabled) {
        return
      }

      setFocused(date)
      onSelect?.(toWire(date))

      if (date.year !== cursor.year || date.month !== cursor.month) {
        updateCursor({ year: date.year, month: date.month })
      }
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
      if (disabled) {
        return
      }

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault()
          moveFocus(addDays(focused, -1))
          break
        case 'ArrowRight':
          event.preventDefault()
          moveFocus(addDays(focused, 1))
          break
        case 'ArrowUp':
          event.preventDefault()
          moveFocus(addDays(focused, -7))
          break
        case 'ArrowDown':
          event.preventDefault()
          moveFocus(addDays(focused, 7))
          break
        case 'Home':
          event.preventDefault()
          moveFocus(startOfWeek(focused))
          break
        case 'End':
          event.preventDefault()
          moveFocus(endOfWeek(focused))
          break
        case 'Enter':
        case ' ':
          event.preventDefault()
          selectDate(focused)
          break
        default:
          break
      }
    }

    const todayDate = today()
    const days = buildMonthGrid(cursor.year, cursor.month)
    const weeks = Array.from({ length: 6 }, (_, index) => days.slice(index * 7, index * 7 + 7))

    return (
      <div ref={setGridRef} className={mergeClassNames('brux-calendar', className)} {...props}>
        <div className="brux-calendar-header">
          <button
            type="button"
            aria-label="Previous month"
            disabled={disabled}
            className="brux-calendar-nav"
            onClick={() => moveMonth(-1)}
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <span className="brux-calendar-label">{formatMonthLabel(cursor.year, cursor.month)}</span>
          <button
            type="button"
            aria-label="Next month"
            disabled={disabled}
            className="brux-calendar-nav"
            onClick={() => moveMonth(1)}
          >
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
        <div role="grid" aria-label="Calendar" onKeyDown={handleKeyDown}>
          <div role="row" className="brux-calendar-week">
            {WEEKDAYS_SHORT.map((label, index) => (
              <span key={label} role="columnheader" aria-label={WEEKDAYS_LONG[index]} className="brux-calendar-weekday">
                {label}
              </span>
            ))}
          </div>
          {weeks.map((week) => (
            <div key={toWire(week[0])} role="row" className="brux-calendar-week">
              {week.map((date) => {
                const isOutside = date.month !== cursor.month
                const isSelected = sameCivil(date, selectedDate)
                const isFocused = sameCivil(date, focused)
                const isToday = sameCivil(date, todayDate)

                return (
                  <div key={toWire(date)} role="gridcell" aria-selected={isSelected ? true : undefined} className="brux-calendar-cell">
                    <button
                      type="button"
                      data-date={toWire(date)}
                      tabIndex={isFocused ? 0 : -1}
                      aria-label={formatLong(date)}
                      aria-current={isToday ? 'date' : undefined}
                      disabled={disabled}
                      className={mergeClassNames(
                        'brux-calendar-day',
                        isOutside && 'brux-calendar-day--outside',
                      )}
                      onClick={() => selectDate(date)}
                    >
                      {date.day}
                    </button>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    )
  },
)

Calendar.displayName = 'Calendar'

export { Calendar }
