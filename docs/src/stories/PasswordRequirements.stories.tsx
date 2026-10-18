import type { Meta, StoryObj } from '@storybook/react-vite'
import { PasswordRequirements } from '../../../src'

const meta = {
  title: 'Forms/PasswordRequirements',
  component: PasswordRequirements,
  parameters: {
    docs: {
      description: {
        component:
          'Checklist describing password rules. Without `showStatus` it renders a plain bulleted list; with `showStatus` each rule shows a check indicator that turns into the success token when `met` is true.',
      },
    },
  },
} satisfies Meta<typeof PasswordRequirements>

export default meta

type Story = StoryObj<typeof meta>

const requirements = [
  { id: 'length', label: 'At least 12 characters', met: true },
  { id: 'number', label: 'One number', met: true },
  { id: 'symbol', label: 'One special character', met: false },
  { id: 'case', label: 'Upper and lower case letters', met: true },
]

export const WithStatus: Story = {
  args: { title: 'Password requirements', requirements, showStatus: true },
  render: (args) => <PasswordRequirements {...args} />,
}

export const Bulleted: Story = {
  args: { title: 'Password requirements', requirements },
  render: (args) => <PasswordRequirements {...args} />,
}
