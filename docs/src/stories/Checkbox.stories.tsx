import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox, Label } from '../../../src'

const meta = {
  title: 'Forms/Checkbox',
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component:
          'Boolean control built on the Radix checkbox primitive. Pair it with `Label` through matching `id` and `htmlFor`. Checked state is exposed through `data-state="checked"`, so containers can react with `:has([data-state=checked])`.',
      },
    },
  },
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { defaultChecked: true },
  render: (args) => (
    <div className="brux-doc-row">
      <Checkbox id="checkbox-default" {...args} />
      <Label htmlFor="checkbox-default">Accept terms and conditions</Label>
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div className="brux-doc-stack">
      <div className="brux-doc-row">
        <Checkbox id="checkbox-unchecked" />
        <Label htmlFor="checkbox-unchecked">Unchecked</Label>
      </div>
      <div className="brux-doc-row">
        <Checkbox id="checkbox-checked" defaultChecked />
        <Label htmlFor="checkbox-checked">Checked</Label>
      </div>
      <div className="brux-doc-row">
        <Checkbox id="checkbox-disabled" disabled />
        <Label htmlFor="checkbox-disabled">Disabled</Label>
      </div>
      <div className="brux-doc-row">
        <Checkbox id="checkbox-disabled-checked" disabled defaultChecked />
        <Label htmlFor="checkbox-disabled-checked">Disabled and checked</Label>
      </div>
    </div>
  ),
}

export const WithHelperText: Story = {
  render: () => (
    <div className="brux-doc-checkbox-field">
      <Checkbox id="checkbox-helper" aria-describedby="checkbox-helper-text" />
      <div className="brux-doc-checkbox-copy">
        <Label htmlFor="checkbox-helper">Email notifications</Label>
        <p id="checkbox-helper-text" className="brux-doc-hint">
          Receive an email whenever a request changes status.
        </p>
      </div>
    </div>
  ),
}

export const OptionCards: Story = {
  render: () => (
    <div className="brux-doc-option-list">
      <Label htmlFor="option-standard" className="brux-doc-option">
        <Checkbox id="option-standard" name="service-level" />
        <span className="brux-doc-option-copy">
          <span className="brux-doc-option-title">Standard review</span>
          <span className="brux-doc-hint">Resolved within ten business days.</span>
        </span>
      </Label>
      <Label htmlFor="option-priority" className="brux-doc-option">
        <Checkbox id="option-priority" name="service-level" defaultChecked />
        <span className="brux-doc-option-copy">
          <span className="brux-doc-option-title">Priority review</span>
          <span className="brux-doc-hint">Resolved within two business days.</span>
        </span>
      </Label>
    </div>
  ),
}
