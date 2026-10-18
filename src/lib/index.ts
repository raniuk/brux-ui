export type ClassValue = string | false | null | undefined

export function mergeClassNames(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ')
}

export * from './date.js'
export * from './use-data-table.js'
