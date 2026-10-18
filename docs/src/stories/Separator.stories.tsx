import type { Meta, StoryObj } from '@storybook/react-vite'
import { Separator } from '../../../src'

const meta = {
  title: 'Components/Separator',
  component: Separator,
  parameters: { docs: { description: { component: 'Radix-backed visual or semantic divider.' } } },
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = { render: () => <div className="brux-doc-stack"><span>Section one</span><Separator /><span>Section two</span></div> }
