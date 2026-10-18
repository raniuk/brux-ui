import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input, Label } from '../../../src'

const meta = {
  title: 'Forms/Input',
  component: Input,
  args: { placeholder: 'name@institution.org', type: 'email' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Single-line text field. Sizes are `sm`, `md`, and `lg`; `aria-invalid="true"` switches the border to the danger token. Pair it with `Label` through matching `id` and `htmlFor`.',
      },
    },
  },
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <Input aria-label="Email address" className="brux-doc-field" {...args} />,
}

export const Sizes: Story = {
  render: () => (
    <div className="brux-doc-stack brux-doc-field">
      <Input size="sm" placeholder="Small" aria-label="Small input" />
      <Input size="md" placeholder="Medium" aria-label="Medium input" />
      <Input size="lg" placeholder="Large" aria-label="Large input" />
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div className="brux-doc-stack brux-doc-field">
      <Input placeholder="Enabled" aria-label="Enabled input" />
      <Input defaultValue="Read only" readOnly aria-label="Read only input" />
      <Input placeholder="Disabled" disabled aria-label="Disabled input" />
      <Input defaultValue="Invalid value" aria-invalid="true" aria-label="Invalid input" />
    </div>
  ),
}

export const WithLabel: Story = {
  render: () => (
    <div className="brux-doc-stack brux-doc-field">
      <Label htmlFor="input-email">Email address</Label>
      <Input id="input-email" type="email" placeholder="name@institution.org" />
      <p className="brux-doc-hint">Use the address registered in the institutional directory.</p>
    </div>
  ),
}
