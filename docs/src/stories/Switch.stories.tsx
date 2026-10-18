import type { Meta, StoryObj } from '@storybook/react-vite'
import { Label, Switch } from '../../../src'

const meta = {
  title: 'Forms/Switch',
  component: Switch,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'On/off toggle built on the Radix switch primitive. Pair it with `Label` through matching `id` and `htmlFor`. `size` supports `sm`, `md`, and `lg`.',
      },
    },
  },
} satisfies Meta<typeof Switch>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { defaultChecked: true },
  render: (args) => (
    <div className="brux-doc-row">
      <Switch id="switch-default" {...args} />
      <Label htmlFor="switch-default">Email notifications</Label>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="brux-doc-row">
      <div className="brux-doc-row">
        <Switch id="switch-size-sm" size="sm" defaultChecked />
        <Label htmlFor="switch-size-sm">Small</Label>
      </div>
      <div className="brux-doc-row">
        <Switch id="switch-size-md" size="md" defaultChecked />
        <Label htmlFor="switch-size-md">Medium</Label>
      </div>
      <div className="brux-doc-row">
        <Switch id="switch-size-lg" size="lg" defaultChecked />
        <Label htmlFor="switch-size-lg">Large</Label>
      </div>
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div className="brux-doc-stack">
      <div className="brux-doc-row">
        <Switch id="switch-on" defaultChecked />
        <Label htmlFor="switch-on">On</Label>
      </div>
      <div className="brux-doc-row">
        <Switch id="switch-off" />
        <Label htmlFor="switch-off">Off</Label>
      </div>
      <div className="brux-doc-row">
        <Switch id="switch-disabled" disabled />
        <Label htmlFor="switch-disabled">Disabled</Label>
      </div>
      <div className="brux-doc-row">
        <Switch id="switch-disabled-checked" disabled defaultChecked />
        <Label htmlFor="switch-disabled-checked">Disabled and checked</Label>
      </div>
    </div>
  ),
}

export const WithDescription: Story = {
  render: () => (
    <div className="brux-doc-option-list">
      <Label htmlFor="switch-newsletter" className="brux-doc-option">
        <span className="brux-doc-option-copy">
          <span className="brux-doc-option-title">Weekly summary</span>
          <span className="brux-doc-hint">One digest of activity every Monday.</span>
        </span>
        <Switch id="switch-newsletter" defaultChecked />
      </Label>
      <Label htmlFor="switch-credentials" className="brux-doc-option">
        <span className="brux-doc-option-copy">
          <span className="brux-doc-option-title">Save credentials</span>
          <span className="brux-doc-hint">Keep this device signed in.</span>
        </span>
        <Switch id="switch-credentials" />
      </Label>
    </div>
  ),
}
