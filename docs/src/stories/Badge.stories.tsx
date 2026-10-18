import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from '../../../src'

const meta = {
  title: 'Components/Badge',
  component: Badge,
  args: { children: 'In review' },
  argTypes: {
    variant: { control: 'select', options: ['neutral', 'primary', 'secondary', 'success', 'warning', 'info', 'accent', 'danger', 'outline'] },
    size: { control: 'select', options: ['default', 'icon'] },
  },
  parameters: { docs: { description: { component: 'Compact, semantic status label.' } } },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Variants: Story = {
  render: () => <div className="brux-doc-row">
    <Badge>Draft</Badge><Badge variant="primary">Submitted</Badge><Badge variant="secondary">Internal</Badge><Badge variant="success">Approved</Badge><Badge variant="warning">Pending</Badge><Badge variant="info">New</Badge><Badge variant="accent">Featured</Badge><Badge variant="danger">Rejected</Badge><Badge variant="outline">Archived</Badge>
  </div>,
}
