import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Calendar, Text } from '../../../src'

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    docs: {
      description: {
        component:
          'Month grid with full keyboard support: arrows move by day or week, Home and End jump to the week edges, and Enter or Space selects. Dates use the `yyyy-mm-dd` wire format and weekdays start on Monday. The current day is marked with `aria-current="date"`.',
      },
    },
  },
} satisfies Meta<typeof Calendar>

export default meta

type Story = StoryObj<typeof meta>

function SelectedCalendar() {
  const [selected, setSelected] = React.useState<string | undefined>('2026-09-12')

  return (
    <div className="brux-doc-stack brux-doc-calendar">
      <Calendar selected={selected} onSelect={setSelected} />
      <Text size="sm" tone="secondary">
        Selected: {selected ?? 'none'}
      </Text>
    </div>
  )
}

export const Default: Story = {
  render: () => <SelectedCalendar />,
}

export const Disabled: Story = {
  render: () => (
    <div className="brux-doc-calendar">
      <Calendar disabled defaultMonth="2026-09-01" />
    </div>
  ),
}

export const FixedMonth: Story = {
  render: () => (
    <div className="brux-doc-calendar">
      <Calendar month="2026-12-01" />
    </div>
  ),
}
