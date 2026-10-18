import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { DatePicker, Label, Text } from '../../../src'

const meta = {
  title: 'Forms/DatePicker',
  component: DatePicker,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Date field with a masked `yyyy-mm-dd` value and a calendar popover. Typing is validated on blur, an unparseable value sets `aria-invalid`, and choosing a day writes the wire value and closes the popover.',
      },
    },
  },
} satisfies Meta<typeof DatePicker>

export default meta

type Story = StoryObj<typeof meta>

function ControlledDatePicker() {
  const [value, setValue] = React.useState<string | undefined>(undefined)

  return (
    <div className="brux-doc-stack brux-doc-field">
      <Label htmlFor="date-picker-controlled">Submission date</Label>
      <DatePicker id="date-picker-controlled" value={value} onValueChange={setValue} />
      <Text size="sm" tone="secondary">
        Wire value: {value ?? 'none'}
      </Text>
    </div>
  )
}

export const Default: Story = {
  render: () => <ControlledDatePicker />,
}

export const WithDefaultValue: Story = {
  render: () => (
    <div className="brux-doc-stack brux-doc-field">
      <Label htmlFor="date-picker-default">Submission date</Label>
      <DatePicker id="date-picker-default" defaultValue="2026-09-12" />
    </div>
  ),
}

export const InvalidAndDisabled: Story = {
  render: () => (
    <div className="brux-doc-stack brux-doc-field">
      <DatePicker aria-label="Invalid date" defaultValue="not-a-date" aria-invalid="true" />
      <DatePicker aria-label="Disabled date" disabled defaultValue="2026-09-12" />
    </div>
  ),
}
