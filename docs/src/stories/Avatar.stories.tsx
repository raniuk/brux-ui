import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar, AvatarFallback, AvatarImage } from '../../../src'

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: { docs: { description: { component: 'Radix-backed identity image that shows its fallback while the image is unavailable.' } } },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Avatar><AvatarImage src="https://github.com/shadcn.png" alt="User profile" /><AvatarFallback>UI</AvatarFallback></Avatar>,
}

export const Fallback: Story = { render: () => <Avatar><AvatarFallback>MT</AvatarFallback></Avatar> }
