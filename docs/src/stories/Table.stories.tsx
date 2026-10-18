import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Badge,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../src'

const meta = {
  title: 'Components/Table',
  component: Table,
  argTypes: {
    variant: { control: 'select', options: ['default', 'divided'] },
    striped: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Data table with a scrollable container. `TableHead` defaults to `scope="col"`; rows expose `data-state="selected"` for the selected background. Variants: `default` and `divided`, plus an optional `striped` pattern.',
      },
    },
  },
} satisfies Meta<typeof Table>

export default meta

type Story = StoryObj<typeof meta>

const rows = [
  { reference: 'REQ-0418', department: 'Citizen services', status: 'In review', variant: 'warning' as const },
  { reference: 'REQ-0417', department: 'Finance', status: 'Approved', variant: 'success' as const },
  { reference: 'REQ-0416', department: 'Legal affairs', status: 'Rejected', variant: 'danger' as const },
]

export const Default: Story = {
  render: (args) => (
    <TableContainer>
      <Table {...args}>
        <TableCaption>Requests submitted during the current fiscal year.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Reference</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.reference}>
              <TableCell>{row.reference}</TableCell>
              <TableCell>{row.department}</TableCell>
              <TableCell>
                <Badge variant={row.variant}>{row.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ),
}

export const DividedAndStriped: Story = {
  args: { striped: true, variant: 'divided' },
  render: (args) => (
    <TableContainer>
      <Table {...args}>
        <TableHeader>
          <TableRow>
            <TableHead>Reference</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.reference} data-state={row.reference === 'REQ-0417' ? 'selected' : undefined}>
              <TableCell>{row.reference}</TableCell>
              <TableCell>{row.department}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ),
}
