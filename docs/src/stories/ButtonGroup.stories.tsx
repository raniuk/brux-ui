import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, ButtonGroup } from '../../../src'

const meta = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Joined button set with collapsed borders and shared edges. Each group is a `role="group"`, so give it an accessible name with `aria-label` when the buttons are related.',
      },
    },
  },
} satisfies Meta<typeof ButtonGroup>

export default meta

type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  render: () => (
    <ButtonGroup aria-label="Text alignment">
      <Button variant="secondary">Left</Button>
      <Button variant="secondary">Center</Button>
      <Button variant="secondary">Right</Button>
    </ButtonGroup>
  ),
}

export const Vertical: Story = {
  render: () => (
    <ButtonGroup orientation="vertical" aria-label="Request actions">
      <Button variant="secondary">Open request</Button>
      <Button variant="secondary">Duplicate</Button>
      <Button variant="danger">Delete</Button>
    </ButtonGroup>
  ),
}
