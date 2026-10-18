import * as React from 'react'
import { mergeClassNames } from '../lib/index.js'

type TableVariant = 'default' | 'divided'

export interface TableContainerProps extends React.ComponentProps<'div'> {}

const TableContainer = React.forwardRef<HTMLDivElement, TableContainerProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={mergeClassNames('brux-table-container', className)} {...props} />
))

TableContainer.displayName = 'TableContainer'

export interface TableProps extends React.ComponentProps<'table'> {
  striped?: boolean
  variant?: TableVariant
}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, variant = 'default', striped = false, ...props }, ref) => (
    <table
      ref={ref}
      className={mergeClassNames(
        'brux-table',
        `brux-table--${variant}`,
        striped && 'brux-table--striped',
        className,
      )}
      {...props}
    />
  ),
)

Table.displayName = 'Table'

export interface TableHeaderProps extends React.ComponentProps<'thead'> {}

const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={mergeClassNames('brux-table-header', className)} {...props} />
  ),
)

TableHeader.displayName = 'TableHeader'

export interface TableBodyProps extends React.ComponentProps<'tbody'> {}

const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={mergeClassNames('brux-table-body', className)} {...props} />
))

TableBody.displayName = 'TableBody'

export interface TableFooterProps extends React.ComponentProps<'tfoot'> {}

const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className, ...props }, ref) => (
    <tfoot ref={ref} className={mergeClassNames('brux-table-footer', className)} {...props} />
  ),
)

TableFooter.displayName = 'TableFooter'

export interface TableRowProps extends React.ComponentProps<'tr'> {}

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(({ className, ...props }, ref) => (
  <tr ref={ref} className={mergeClassNames('brux-table-row', className)} {...props} />
))

TableRow.displayName = 'TableRow'

export interface TableHeadProps extends React.ComponentProps<'th'> {}

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, scope = 'col', ...props }, ref) => (
    <th ref={ref} scope={scope} className={mergeClassNames('brux-table-head', className)} {...props} />
  ),
)

TableHead.displayName = 'TableHead'

export interface TableCellProps extends React.ComponentProps<'td'> {}

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(({ className, ...props }, ref) => (
  <td ref={ref} className={mergeClassNames('brux-table-cell', className)} {...props} />
))

TableCell.displayName = 'TableCell'

export interface TableCaptionProps extends React.ComponentProps<'caption'> {}

const TableCaption = React.forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  ({ className, ...props }, ref) => (
    <caption ref={ref} className={mergeClassNames('brux-table-caption', className)} {...props} />
  ),
)

TableCaption.displayName = 'TableCaption'

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
}
