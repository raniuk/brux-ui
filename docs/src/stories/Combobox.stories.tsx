import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import { Combobox } from '../../../src'

const departmentOptions = [
  { value: 'citizen', label: 'Citizen services' },
  { value: 'finance', label: 'Finance' },
  { value: 'legal', label: 'Legal affairs' },
  { value: 'planning', label: 'Urban planning' },
  { value: 'procurement', label: 'Procurement' },
  { value: 'technology', label: 'Technology' },
  { value: 'transport', label: 'Transport' },
  { value: 'records', label: 'Public records' },
]

const meta = {
  title: 'Forms/Combobox',
  component: Combobox,
  parameters: {
    docs: {
      description: {
        component:
          'Searchable single-select built on the Radix popover primitive. Pass `options` and control the selection with `value` + `onValueChange`. Options are filtered by label as the user types, and `emptyMessage` renders when nothing matches. `size` supports `sm | md | lg`, and `aria-invalid="true"` turns it destructive.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    options: departmentOptions,
  },
} satisfies Meta<typeof Combobox>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState('')

    return (
      <Combobox
        className="brux-doc-field"
        value={value}
        onValueChange={setValue}
        options={departmentOptions}
        placeholder="Select a department"
      />
    )
  },
}

export const Sizes: Story = {
  render: () => {
    const [value, setValue] = React.useState('')

    return (
      <div className="brux-doc-stack">
        <Combobox
          className="brux-doc-field"
          size="sm"
          value={value}
          onValueChange={setValue}
          options={departmentOptions}
          placeholder="Small"
        />
        <Combobox
          className="brux-doc-field"
          size="md"
          value={value}
          onValueChange={setValue}
          options={departmentOptions}
          placeholder="Medium"
        />
        <Combobox
          className="brux-doc-field"
          size="lg"
          value={value}
          onValueChange={setValue}
          options={departmentOptions}
          placeholder="Large"
        />
      </div>
    )
  },
}

export const Disabled: Story = {
  render: () => (
    <Combobox className="brux-doc-field" disabled options={departmentOptions} placeholder="Disabled" />
  ),
}

export const Invalid: Story = {
  render: () => (
    <Combobox
      className="brux-doc-field"
      aria-invalid="true"
      options={departmentOptions}
      placeholder="Select a department"
    />
  ),
}

export const EmptyState: Story = {
  render: () => (
    <Combobox
      className="brux-doc-field"
      options={[]}
      placeholder="No options"
      emptyMessage="No departments available."
    />
  ),
}
