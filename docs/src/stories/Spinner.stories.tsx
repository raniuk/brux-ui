import type { Meta, StoryObj } from '@storybook/react-vite'
import { Spinner } from '../../../src'

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: { docs: { description: { component: 'Indeterminate loading indicator that respects reduced-motion preferences.' } } },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Colors: Story = {
  render: () => <div className="brux-doc-row">
    <Spinner /><Spinner className="brux-doc-spinner--success" /><Spinner className="brux-doc-spinner--warning" /><Spinner className="brux-doc-spinner--danger" />
  </div>,
}
