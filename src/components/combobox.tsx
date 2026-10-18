'use client'

import * as React from 'react'
import { Check, ChevronDown, Search } from 'lucide-react'
import { mergeClassNames } from '../lib/index.js'
import { Popover, PopoverContent, PopoverTrigger } from './popover.js'

type ComboboxSize = 'sm' | 'md' | 'lg'

export interface ComboboxOption {
  disabled?: boolean
  label: string
  value: string
}

export interface ComboboxProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'value'> {
  emptyMessage?: string
  onValueChange?: (value: string) => void
  options: ComboboxOption[]
  placeholder?: string
  searchPlaceholder?: string
  size?: ComboboxSize
  value?: string
}

const Combobox = React.forwardRef<HTMLButtonElement, ComboboxProps>(
  (
    {
      className,
      disabled,
      emptyMessage = 'No results found.',
      onValueChange,
      options,
      placeholder = 'Select an option',
      searchPlaceholder = 'Search...',
      size = 'md',
      value,
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false)
    const [search, setSearch] = React.useState('')
    const selectedOption = options.find((option) => option.value === value)
    const normalizedSearch = search.trim().toLowerCase()
    const filteredOptions = normalizedSearch
      ? options.filter((option) => option.label.toLowerCase().includes(normalizedSearch))
      : options

    function selectOption(nextValue: string) {
      onValueChange?.(nextValue)
      setOpen(false)
      setSearch('')
    }

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            ref={ref}
            type="button"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className={mergeClassNames(
              'brux-combobox-trigger',
              `brux-combobox-trigger--${size}`,
              className,
            )}
            {...props}
          >
            <span
              className={mergeClassNames(
                'brux-combobox-value',
                !selectedOption && 'brux-combobox-value--placeholder',
              )}
            >
              {selectedOption?.label ?? placeholder}
            </span>
            <ChevronDown className="brux-combobox-icon" aria-hidden="true" />
          </button>
        </PopoverTrigger>
        <PopoverContent align="start" className="brux-combobox-content">
          <div className="brux-combobox-search">
            <Search className="brux-combobox-search-icon" aria-hidden="true" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={searchPlaceholder}
              aria-label="Search"
              className="brux-combobox-input"
            />
          </div>
          <div role="listbox" className="brux-combobox-listbox">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={option.value === value}
                  disabled={option.disabled}
                  onClick={() => selectOption(option.value)}
                  className="brux-combobox-option"
                >
                  {option.value === value ? (
                    <span className="brux-combobox-option-indicator">
                      <Check aria-hidden="true" />
                    </span>
                  ) : null}
                  {option.label}
                </button>
              ))
            ) : (
              <div className="brux-combobox-empty">{emptyMessage}</div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    )
  },
)

Combobox.displayName = 'Combobox'

export { Combobox }
