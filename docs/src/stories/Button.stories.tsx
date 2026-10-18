import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../../../src'

const meta = {
  title: 'Components/Button',
  component: Button,
  args: { children: 'Save changes' },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'tertiary', 'ghost', 'success', 'warning', 'danger'] },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'icon'] },
    loading: { control: 'boolean' },
  },
  parameters: {
    docs: { description: { component: 'Action control with semantic variants, keyboard focus treatment, loading state, and `asChild` support.' } },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Variants: Story = {
  render: () => <div className="brux-doc-row">
    <Button>Primary</Button><Button variant="secondary">Secondary</Button><Button variant="tertiary">Tertiary</Button><Button variant="ghost">Ghost</Button><Button variant="success">Approve</Button><Button variant="warning">Review</Button><Button variant="danger">Delete</Button>
  </div>,
}

export const Loading: Story = { args: { loading: true, children: 'Saving changes' } }

export const AsChild: Story = {
  render: () => <Button asChild><a href="#documentation">Read documentation</a></Button>,
}
