import type { Meta, StoryObj } from '@storybook/react-vite'
import { Label, Textarea } from '../../../src'

const meta = {
  title: 'Forms/Textarea',
  component: Textarea,
  args: { placeholder: 'Describe the request' },
  parameters: {
    docs: {
      description: {
        component:
          'Multi-line text field with an optional character counter. The counter tracks controlled and uncontrolled values and appends the `maxLength` limit when provided.',
      },
    },
  },
} satisfies Meta<typeof Textarea>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <Textarea aria-label="Request description" className="brux-doc-field" {...args} />,
}

export const WithCount: Story = {
  render: () => (
    <div className="brux-doc-stack brux-doc-field">
      <Label htmlFor="textarea-summary">Summary</Label>
      <Textarea id="textarea-summary" maxLength={200} showCount placeholder="Summarize the request" />
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div className="brux-doc-stack brux-doc-field">
      <Textarea placeholder="Enabled" aria-label="Enabled textarea" />
      <Textarea placeholder="Disabled" disabled aria-label="Disabled textarea" />
      <Textarea defaultValue="Description is too short" aria-invalid="true" aria-label="Invalid textarea" />
    </div>
  ),
}
