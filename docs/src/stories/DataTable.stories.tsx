import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge, DataTable, type DataTableColumnDef, type DataTableProps } from '../../../src'

interface RequestRow {
  department: string
  reference: string
  status: 'Approved' | 'In review' | 'Rejected'
}

const rows: RequestRow[] = Array.from({ length: 18 }, (_, index) => {
  const statuses: RequestRow['status'][] = ['Approved', 'In review', 'Rejected']
  const departments = ['Citizen services', 'Finance', 'Legal affairs', 'Public works']

  return {
    reference: `REQ-${String(410 + index).padStart(4, '0')}`,
    department: departments[index % departments.length],
    status: statuses[index % statuses.length],
  }
})

const columns: DataTableColumnDef<RequestRow>[] = [
  { id: 'reference', header: 'Reference', accessor: (row) => row.reference, emphasis: true },
  { id: 'department', header: 'Department', accessor: (row) => row.department },
  {
    id: 'status',
    header: 'Status',
    align: 'center',
    accessor: (row) => row.status,
    cell: (row) => (
      <Badge variant={row.status === 'Approved' ? 'success' : row.status === 'Rejected' ? 'danger' : 'warning'}>
        {row.status}
      </Badge>
    ),
  },
]

const meta: Meta<DataTableProps<RequestRow>> = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    docs: {
      description: {
        component:
          'Table with client-side search, pagination, page-size control, and optional row selection. Columns define a header plus `accessor` and optional `cell` renderer. Selection emits the selected ids through `onSelectionChange`.',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { columns, data: rows, getRowId: (row) => row.reference, pageSize: 5 },
  render: (args) => <DataTable {...args} />,
}

export const Selectable: Story = {
  args: {
    columns,
    data: rows,
    getRowId: (row) => row.reference,
    pageSize: 5,
    selectable: 'multiple',
    onSelectionChange: (ids) => console.info('selected', ids),
  },
  render: (args) => <DataTable {...args} />,
}

export const Empty: Story = {
  args: { columns, data: [] },
  render: (args) => <DataTable {...args} />,
}
