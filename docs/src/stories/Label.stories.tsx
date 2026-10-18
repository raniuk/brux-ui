import type { Meta, StoryObj } from '@storybook/react-vite'
import { Label } from '../../../src'

const meta = {
  title: 'Components/Label',
  component: Label,
  parameters: { docs: { description: { component: 'Radix-backed label, linked to a form control through `htmlFor`.' } } },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { render: () => <div className="brux-doc-stack"><Label htmlFor="email">Email address</Label><input id="email" type="email" /></div> }
