'use client'

import * as React from 'react'
import { mergeClassNames } from '../lib/index.js'
import { Search } from 'lucide-react'
import { Button, type ButtonProps } from './button.js'
import { InputGroup, InputGroupInput, type InputGroupInputProps, InputGroupText } from './input-group.js'
import { Label } from './label.js'

export interface SearchInputProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'children'> {
  buttonLabel?: React.ReactNode
  buttonProps?: ButtonProps
  inputProps?: Omit<InputGroupInputProps, 'placeholder' | 'type'>
  label?: React.ReactNode
  placeholder?: string
  showLabel?: boolean
}

const SearchInput = React.forwardRef<HTMLFormElement, SearchInputProps>(
  (
    {
      buttonLabel = 'Search',
      buttonProps,
      className,
      inputProps,
      label = 'Search',
      placeholder = 'Search',
      showLabel = false,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId()
    const id = inputProps?.id ?? generatedId
    const { className: buttonClassName, ...actionProps } = buttonProps ?? {}

    return (
      <form ref={ref} className={mergeClassNames('brux-search-input', className)} {...props}>
        <Label htmlFor={id} className={mergeClassNames(!showLabel && 'brux-visually-hidden')}>
          {label}
        </Label>
        <InputGroup>
          <InputGroupText>
            <Search aria-hidden="true" />
          </InputGroupText>
          <InputGroupInput id={id} type="search" placeholder={placeholder} required {...inputProps} />
          <Button
            type="submit"
            size="sm"
            className={mergeClassNames('brux-search-input-action', buttonClassName)}
            {...actionProps}
          >
            {buttonLabel}
          </Button>
        </InputGroup>
      </form>
    )
  },
)

SearchInput.displayName = 'SearchInput'

export { SearchInput }
