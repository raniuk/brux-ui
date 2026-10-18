import type { Meta, StoryObj } from '@storybook/react-vite'
import { FormControl, FormDescription, FormField, FormLabel, FormMessage, Input } from '../../../src'

const meta = {
  title: 'Forms/FormField',
  component: FormField,
  parameters: {
    docs: {
      description: {
        component:
          'Form field wrapper that wires label, control, description, and error message to the same generated id. `FormControl` clones its single child through Radix Slot, so any input component works. Set `invalid` to mark the control and turn the message into an alert.',
      },
    },
  },
} satisfies Meta<typeof FormField>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <FormField className="brux-doc-form">
      <FormLabel>Email address</FormLabel>
      <FormControl>
        <Input type="email" placeholder="name@institution.org" />
      </FormControl>
      <FormDescription>Use the institutional address registered in the system.</FormDescription>
    </FormField>
  ),
}

export const Invalid: Story = {
  render: () => (
    <FormField className="brux-doc-form" invalid>
      <FormLabel>Tax identification number</FormLabel>
      <FormControl>
        <Input defaultValue="12" />
      </FormControl>
      <FormDescription>Nine digits without separators.</FormDescription>
      <FormMessage>The identification number must contain nine digits.</FormMessage>
    </FormField>
  ),
}
