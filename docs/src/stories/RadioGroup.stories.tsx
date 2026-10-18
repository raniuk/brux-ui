import type { Meta, StoryObj } from '@storybook/react-vite'
import { Label, RadioGroup, RadioGroupItem } from '../../../src'

const meta = {
  title: 'Forms/RadioGroup',
  component: RadioGroup,
  parameters: {
    docs: {
      description: {
        component:
          'Single-choice group built on the Radix radio group primitive. Arrow keys move between items and only one option can be selected. Pair every `RadioGroupItem` with a `Label` through matching `id` and `htmlFor`.',
      },
    },
  },
} satisfies Meta<typeof RadioGroup>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="standard" aria-label="Service level">
      <div className="brux-doc-row">
        <RadioGroupItem id="radio-standard" value="standard" />
        <Label htmlFor="radio-standard">Standard review</Label>
      </div>
      <div className="brux-doc-row">
        <RadioGroupItem id="radio-priority" value="priority" />
        <Label htmlFor="radio-priority">Priority review</Label>
      </div>
      <div className="brux-doc-row">
        <RadioGroupItem id="radio-express" value="express" />
        <Label htmlFor="radio-express">Express review</Label>
      </div>
    </RadioGroup>
  ),
}

export const WithDescriptions: Story = {
  render: () => (
    <RadioGroup defaultValue="email" aria-label="Notification channel" className="brux-doc-option-list">
      <Label htmlFor="radio-email" className="brux-doc-option">
        <RadioGroupItem id="radio-email" value="email" />
        <span className="brux-doc-option-copy">
          <span className="brux-doc-option-title">Email</span>
          <span className="brux-doc-hint">Sent to the address on file.</span>
        </span>
      </Label>
      <Label htmlFor="radio-sms" className="brux-doc-option">
        <RadioGroupItem id="radio-sms" value="sms" />
        <span className="brux-doc-option-copy">
          <span className="brux-doc-option-title">SMS</span>
          <span className="brux-doc-hint">Sent to the registered phone number.</span>
        </span>
      </Label>
    </RadioGroup>
  ),
}

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="office" aria-label="Delivery method">
      <div className="brux-doc-row">
        <RadioGroupItem id="radio-office-disabled" value="office" disabled />
        <Label htmlFor="radio-office-disabled">In person</Label>
      </div>
      <div className="brux-doc-row">
        <RadioGroupItem id="radio-courier-disabled" value="courier" disabled />
        <Label htmlFor="radio-courier-disabled">Courier</Label>
      </div>
    </RadioGroup>
  ),
}
