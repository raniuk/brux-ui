import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '../../../src'

const meta = {
  title: 'Forms/Select',
  component: SelectTrigger,
  parameters: {
    docs: {
      description: {
        component:
          'Single-choice menu built on the Radix select primitive. The trigger renders `SelectValue`, and the list is portalled into a popper aligned to the trigger. Supports typed characters to jump to an option, `size` on the trigger, and grouped or separated options.',
      },
    },
  },
} satisfies Meta<typeof SelectTrigger>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Select defaultValue="standard">
      <SelectTrigger aria-label="Service level" className="brux-doc-select">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="standard">Standard review</SelectItem>
        <SelectItem value="priority">Priority review</SelectItem>
        <SelectItem value="express">Express review</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const Placeholder: Story = {
  render: () => (
    <Select>
      <SelectTrigger aria-label="Department" className="brux-doc-select">
        <SelectValue placeholder="Select a department" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="citizen">Citizen services</SelectItem>
        <SelectItem value="finance">Finance</SelectItem>
        <SelectItem value="legal">Legal affairs</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const Grouped: Story = {
  render: () => (
    <Select defaultValue="md">
      <SelectTrigger aria-label="Density" className="brux-doc-select">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Spacing</SelectLabel>
          <SelectItem value="sm">Compact</SelectItem>
          <SelectItem value="md">Standard</SelectItem>
          <SelectItem value="lg">Comfortable</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Advanced</SelectLabel>
          <SelectItem value="custom">Custom</SelectItem>
          <SelectItem value="disabled" disabled>
            Unavailable
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="brux-doc-stack">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Select key={size} defaultValue="standard">
          <SelectTrigger size={size} aria-label={`Service level ${size}`} className="brux-doc-select">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="standard">Standard review</SelectItem>
            <SelectItem value="priority">Priority review</SelectItem>
          </SelectContent>
        </Select>
      ))}
    </div>
  ),
}
