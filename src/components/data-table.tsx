'use client'

import * as React from 'react'
import { mergeClassNames } from '../lib/index.js'
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { Checkbox } from './checkbox.js'
import { InputGroup, InputGroupInput, InputGroupText } from './input-group.js'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from './pagination.js'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select.js'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow } from './table.js'
import { type DataTableColumn, useDataTable } from '../lib/use-data-table.js'

export interface DataTableColumnDef<TData> extends DataTableColumn<TData> {
  cell?: (row: TData) => React.ReactNode
  emphasis?: boolean
  header: React.ReactNode
}

export interface DataTableProps<TData> extends Omit<React.ComponentProps<'div'>, 'children'> {
  columns: DataTableColumnDef<TData>[]
  data: TData[]
  emptyMessage?: string
  getRowId?: (row: TData, index: number) => string
  initialPage?: number
  manualPagination?: boolean
  onPageChange?: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
  onSelectionChange?: (ids: string[]) => void
  pageSize?: number
  pageSizeOptions?: number[]
  rowCount?: number
  searchable?: boolean
  searchPlaceholder?: string
  selectable?: boolean | 'multiple' | 'single'
  striped?: boolean
  variant?: 'default' | 'divided'
}

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 25, 50, 100]

function renderCell<TData>(column: DataTableColumnDef<TData>, row: TData): React.ReactNode {
  if (column.cell) {
    return column.cell(row)
  }

  const value = column.accessor?.(row)

  return value == null ? null : String(value)
}

function isNumericCell<TData>(column: DataTableColumnDef<TData>, row: TData): boolean {
  return typeof column.accessor?.(row) === 'number'
}

function getPageRange(page: number, pageCount: number): Array<number | 'ellipsis'> {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, index) => index + 1)
  }

  const items: Array<number | 'ellipsis'> = [1]
  const start = Math.max(2, page - 1)
  const end = Math.min(pageCount - 1, page + 1)

  if (start > 2) {
    items.push('ellipsis')
  }

  for (let index = start; index <= end; index += 1) {
    items.push(index)
  }

  if (end < pageCount - 1) {
    items.push('ellipsis')
  }

  items.push(pageCount)

  return items
}

const DataTableRoot = React.forwardRef(function DataTable<TData>(
  {
    className,
    columns,
    data,
    emptyMessage = 'No results.',
    getRowId,
    initialPage,
    manualPagination,
    onPageChange,
    onPageSizeChange,
    onSelectionChange,
    pageSize,
    pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
    rowCount,
    searchable = true,
    searchPlaceholder = 'Search',
    selectable = false,
    striped,
    variant,
    ...props
  }: DataTableProps<TData>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const {
    canNextPage,
    canPreviousPage,
    globalFilter,
    isAllRowsSelected,
    isRowSelected,
    isSomeRowsSelected,
    nextPage,
    page,
    pageCount,
    pageSize: currentPageSize,
    previousPage,
    rows,
    selectedRowIds,
    setGlobalFilter,
    setPage,
    setPageSize,
    toggleAllRows,
    toggleRow,
  } = useDataTable<TData>({
    columns,
    data,
    getRowId,
    initialPage,
    manualPagination,
    pageSize,
    rowCount,
    selectable,
  })

  const onSelectionChangeRef = React.useRef(onSelectionChange)
  const onPageChangeRef = React.useRef(onPageChange)
  const onPageSizeChangeRef = React.useRef(onPageSizeChange)
  const selectionInitialized = React.useRef(false)
  const pageInitialized = React.useRef(false)
  const pageSizeInitialized = React.useRef(false)

  onSelectionChangeRef.current = onSelectionChange
  onPageChangeRef.current = onPageChange
  onPageSizeChangeRef.current = onPageSizeChange

  React.useEffect(() => {
    if (!selectionInitialized.current) {
      selectionInitialized.current = true

      return
    }

    onSelectionChangeRef.current?.(selectedRowIds)
  }, [selectedRowIds])

  React.useEffect(() => {
    if (!pageInitialized.current) {
      pageInitialized.current = true

      return
    }

    onPageChangeRef.current?.(page)
  }, [page])

  React.useEffect(() => {
    if (!pageSizeInitialized.current) {
      pageSizeInitialized.current = true

      return
    }

    onPageSizeChangeRef.current?.(currentPageSize)
  }, [currentPageSize])

  const selectionEnabled = selectable !== false
  const showSelectAll = selectable === true || selectable === 'multiple'
  const isEmpty = data.length === 0
  const showSelectionColumn = selectionEnabled && !isEmpty
  const columnCount = columns.length + (showSelectionColumn ? 1 : 0)
  const pageItems = getPageRange(page, pageCount)

  const resolvedPageSizeOptions = React.useMemo(() => {
    const options = new Set([...pageSizeOptions, currentPageSize])

    return Array.from(options).sort((a, b) => a - b)
  }, [currentPageSize, pageSizeOptions])

  return (
    <div ref={ref} className={mergeClassNames('brux-data-table', className)} {...props}>
      {searchable && !isEmpty ? (
        <InputGroup className="brux-data-table-search">
          <InputGroupText>
            <Search aria-hidden="true" />
          </InputGroupText>
          <InputGroupInput
            type="search"
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
          />
        </InputGroup>
      ) : null}

      <TableContainer>
        <Table variant={variant} striped={striped}>
          <TableHeader>
            <TableRow>
              {showSelectionColumn ? (
                <TableHead className="brux-data-table-select-cell">
                  {showSelectAll ? (
                    <Checkbox
                      aria-label="Select all rows on this page"
                      checked={isAllRowsSelected ? true : isSomeRowsSelected ? 'indeterminate' : false}
                      onCheckedChange={toggleAllRows}
                    />
                  ) : null}
                </TableHead>
              ) : null}
              {columns.map((column) => (
                <TableHead key={column.id} className={column.align ? `brux-data-table-align-${column.align}` : undefined}>
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row) => (
                <TableRow key={row.id} data-state={isRowSelected(row.id) ? 'selected' : undefined}>
                  {showSelectionColumn ? (
                    <TableCell className="brux-data-table-select-cell">
                      <Checkbox
                        aria-label="Select row"
                        checked={isRowSelected(row.id)}
                        onCheckedChange={() => toggleRow(row.id)}
                      />
                    </TableCell>
                  ) : null}
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      className={mergeClassNames(
                        column.align && `brux-data-table-align-${column.align}`,
                        column.emphasis && 'brux-data-table-emphasis',
                        isNumericCell(column, row.original) && 'brux-data-table-numeric',
                      )}
                    >
                      {renderCell(column, row.original)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columnCount} className="brux-data-table-empty">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {isEmpty ? null : (
        <div className="brux-data-table-toolbar">
          <div className="brux-data-table-size">
            <span>Rows per page</span>
            <Select value={String(currentPageSize)} onValueChange={(next) => setPageSize(Number(next))}>
              <SelectTrigger size="sm" className="brux-data-table-size-trigger" aria-label="Rows per page">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {resolvedPageSizeOptions.map((option) => (
                  <SelectItem key={option} value={String(option)}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="brux-data-table-pagination">
            <p>
              Page {page} of {pageCount}
            </p>
            <Pagination className="brux-data-table-pagination-nav">
              <PaginationContent>
                <PaginationItem>
                  <PaginationLink asChild disabled={!canPreviousPage} aria-label="Go to previous page">
                    <button type="button" onClick={previousPage}>
                      <ChevronLeft aria-hidden="true" />
                      <span className="brux-visually-hidden">Previous</span>
                    </button>
                  </PaginationLink>
                </PaginationItem>
                {pageItems.map((item, index) =>
                  item === 'ellipsis' ? (
                    <PaginationItem key={`ellipsis-${index}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={item}>
                      <PaginationLink asChild isActive={item === page} aria-label={`Go to page ${item}`}>
                        <button type="button" onClick={() => setPage(item)}>
                          {item}
                        </button>
                      </PaginationLink>
                    </PaginationItem>
                  ),
                )}
                <PaginationItem>
                  <PaginationLink asChild disabled={!canNextPage} aria-label="Go to next page">
                    <button type="button" onClick={nextPage}>
                      <ChevronRight aria-hidden="true" />
                      <span className="brux-visually-hidden">Next</span>
                    </button>
                  </PaginationLink>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      )}
    </div>
  )
})

DataTableRoot.displayName = 'DataTable'

export const DataTable = DataTableRoot as <TData>(
  props: DataTableProps<TData> & React.RefAttributes<HTMLDivElement>,
) => React.ReactElement
