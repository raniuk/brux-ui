'use client'

import * as React from 'react'

export interface DataTableColumn<TData> {
  accessor?: (row: TData) => unknown
  align?: 'center' | 'left' | 'right'
  filterFn?: (row: TData, query: string) => boolean
  id: string
}

export interface DataTableRow<TData> {
  id: string
  original: TData
}

export interface UseDataTableOptions<TData> {
  columns: DataTableColumn<TData>[]
  data: TData[]
  getRowId?: (row: TData, index: number) => string
  initialPage?: number
  manualPagination?: boolean
  pageSize?: number
  rowCount?: number
  selectable?: boolean | 'multiple' | 'single'
}

export interface UseDataTableResult<TData> {
  canNextPage: boolean
  canPreviousPage: boolean
  globalFilter: string
  isAllRowsSelected: boolean
  isRowSelected: (id: string) => boolean
  isSomeRowsSelected: boolean
  nextPage: () => void
  page: number
  pageCount: number
  pageSize: number
  previousPage: () => void
  rows: DataTableRow<TData>[]
  selectedRowIds: string[]
  setGlobalFilter: (value: string) => void
  setPage: (page: number) => void
  setPageSize: (size: number) => void
  toggleAllRows: () => void
  toggleRow: (id: string) => void
  totalRows: number
}

export function useDataTable<TData>({
  columns,
  data,
  getRowId,
  initialPage = 1,
  manualPagination = false,
  pageSize: initialPageSize = 10,
  rowCount,
  selectable = false,
}: UseDataTableOptions<TData>): UseDataTableResult<TData> {
  const [globalFilter, setGlobalFilterState] = React.useState('')
  const [page, setPageState] = React.useState(initialPage)
  const [pageSize, setPageSizeState] = React.useState(initialPageSize)
  const [selectedRowIds, setSelectedRowIds] = React.useState<string[]>([])

  const indexedRows = React.useMemo(
    () =>
      data.map((original, index) => ({
        id: getRowId ? getRowId(original, index) : String(index),
        original,
      })),
    [data, getRowId],
  )

  const filteredRows = React.useMemo(() => {
    const query = globalFilter.trim().toLowerCase()

    if (!query) {
      return indexedRows
    }

    return indexedRows.filter(({ original }) =>
      columns.some((column) => {
        if (column.filterFn) {
          return column.filterFn(original, query)
        }

        if (!column.accessor) {
          return false
        }

        const value = column.accessor(original)

        return value == null ? false : String(value).toLowerCase().includes(query)
      }),
    )
  }, [columns, globalFilter, indexedRows])

  const totalRows = manualPagination ? (rowCount ?? data.length) : filteredRows.length
  const pageCount = Math.max(1, Math.ceil(totalRows / pageSize))
  const currentPage = Math.min(Math.max(page, 1), pageCount)

  const rows = React.useMemo(() => {
    if (manualPagination) {
      return filteredRows
    }

    const start = (currentPage - 1) * pageSize

    return filteredRows.slice(start, start + pageSize)
  }, [currentPage, filteredRows, manualPagination, pageSize])

  const selectionEnabled = selectable !== false
  const multipleSelection = selectable !== 'single'
  const pageRowIds = React.useMemo(() => rows.map((row) => row.id), [rows])

  const isAllRowsSelected =
    multipleSelection && pageRowIds.length > 0 && pageRowIds.every((id) => selectedRowIds.includes(id))
  const isSomeRowsSelected =
    multipleSelection && !isAllRowsSelected && pageRowIds.some((id) => selectedRowIds.includes(id))

  const isRowSelected = React.useCallback((id: string) => selectedRowIds.includes(id), [selectedRowIds])

  const toggleRow = React.useCallback(
    (id: string) => {
      if (!selectionEnabled) {
        return
      }

      setSelectedRowIds((current) => {
        if (!multipleSelection) {
          return current.includes(id) ? [] : [id]
        }

        return current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
      })
    },
    [multipleSelection, selectionEnabled],
  )

  const toggleAllRows = React.useCallback(() => {
    if (!selectionEnabled || !multipleSelection) {
      return
    }

    setSelectedRowIds((current) => {
      const allSelected = pageRowIds.length > 0 && pageRowIds.every((id) => current.includes(id))

      if (allSelected) {
        return current.filter((id) => !pageRowIds.includes(id))
      }

      return Array.from(new Set([...current, ...pageRowIds]))
    })
  }, [multipleSelection, pageRowIds, selectionEnabled])

  const setPage = React.useCallback(
    (nextPage: number) => {
      setPageState(Math.min(Math.max(nextPage, 1), pageCount))
    },
    [pageCount],
  )

  const nextPage = React.useCallback(() => {
    setPage(currentPage + 1)
  }, [currentPage, setPage])

  const previousPage = React.useCallback(() => {
    setPage(currentPage - 1)
  }, [currentPage, setPage])

  const setPageSize = React.useCallback((size: number) => {
    setPageSizeState(size)
    setPageState(1)
  }, [])

  const setGlobalFilter = React.useCallback((value: string) => {
    setGlobalFilterState(value)
    setPageState(1)
  }, [])

  return {
    canNextPage: currentPage < pageCount,
    canPreviousPage: currentPage > 1,
    globalFilter,
    isAllRowsSelected,
    isRowSelected,
    isSomeRowsSelected,
    nextPage,
    page: currentPage,
    pageCount,
    pageSize,
    previousPage,
    rows,
    selectedRowIds,
    setGlobalFilter,
    setPage,
    setPageSize,
    toggleAllRows,
    toggleRow,
    totalRows,
  }
}
