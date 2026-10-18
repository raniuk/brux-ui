import type { Meta, StoryObj } from '@storybook/react-vite'
import { Blockquote } from '../../../src'

const meta = {
  title: 'Typography/Blockquote',
  component: Blockquote,
  parameters: {
    docs: {
      description: {
        component:
          'Quoted passage with an optional attribution rendered as a `cite` inside a footer. The left border uses the primary token.',
      },
    },
  },
} satisfies Meta<typeof Blockquote>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Requests are resolved in the order they are received, not by priority.',
    attribution: 'Citizen services handbook',
  },
}

export const WithoutAttribution: Story = {
  render: () => <Blockquote>Incomplete submissions restart the review counter.</Blockquote>,
}
