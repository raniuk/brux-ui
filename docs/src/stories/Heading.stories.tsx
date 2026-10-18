import type { Meta, StoryObj } from '@storybook/react-vite'
import { Heading, Text } from '../../../src'

const meta = {
  title: 'Typography/Heading',
  component: Heading,
  argTypes: {
    as: { control: 'select', options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Section heading. `as` sets the document outline level and `size` sets the visual scale independently, so hierarchy stays semantic.',
      },
    },
  },
} satisfies Meta<typeof Heading>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'Service request' },
}

export const Scale: Story = {
  render: () => (
    <div className="brux-doc-stack">
      <Heading as="h1" size="xl">
        Extra large
      </Heading>
      <Heading as="h2" size="lg">
        Large
      </Heading>
      <Heading as="h3" size="md">
        Medium
      </Heading>
      <Heading as="h4" size="sm">
        Small
      </Heading>
    </div>
  ),
}

export const WithBodyCopy: Story = {
  render: () => (
    <div className="brux-doc-stack brux-doc-prose">
      <Heading as="h2">Before you submit</Heading>
      <Text tone="secondary">
        Attach the supporting documents and confirm that the contact details match the institutional directory.
      </Text>
    </div>
  ),
}
