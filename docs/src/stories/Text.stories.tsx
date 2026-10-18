import type { Meta, StoryObj } from '@storybook/react-vite'
import { Text } from '../../../src'

const meta = {
  title: 'Typography/Text',
  component: Text,
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg'] },
    tone: { control: 'select', options: ['primary', 'secondary', 'muted', 'success', 'danger'] },
    as: { control: 'select', options: ['p', 'span', 'div'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Body copy with size and tone variants. Renders a `p` by default; use `as="span"` for inline text. Tones map to semantic color tokens, so they adapt to the active theme.',
      },
    },
  },
} satisfies Meta<typeof Text>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'Review each section before submitting the request.' },
}

export const Sizes: Story = {
  render: () => (
    <div className="brux-doc-stack">
      <Text size="xs">Extra small text for metadata.</Text>
      <Text size="sm">Small text for supporting copy.</Text>
      <Text size="md">Medium text is the default body size.</Text>
      <Text size="lg">Large text for introductory paragraphs.</Text>
    </div>
  ),
}

export const Tones: Story = {
  render: () => (
    <div className="brux-doc-stack">
      <Text>Primary text</Text>
      <Text tone="secondary">Secondary text</Text>
      <Text tone="muted">Muted text</Text>
      <Text tone="success">The request was approved.</Text>
      <Text tone="danger">The identification number is invalid.</Text>
    </div>
  ),
}
