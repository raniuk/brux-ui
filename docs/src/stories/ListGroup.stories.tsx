import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Badge,
  ListGroup,
  ListGroupAction,
  ListGroupContent,
  ListGroupDescription,
  ListGroupIcon,
  ListGroupItem,
  ListGroupTitle,
} from '../../../src'
import { FileText } from 'lucide-react'

const meta = {
  title: 'Components/ListGroup',
  component: ListGroup,
  argTypes: {
    variant: { control: 'select', options: ['default', 'flush'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Record list with a shared border and dividers between items. Compose `ListGroupItem` with an icon, title, description, and trailing action. Set `interactive` when the row is clickable.',
      },
    },
  },
} satisfies Meta<typeof ListGroup>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ListGroup className="brux-doc-field">
      <ListGroupItem>
        <ListGroupIcon>
          <FileText aria-hidden="true" />
        </ListGroupIcon>
        <ListGroupContent>
          <ListGroupTitle>Certificate of residence</ListGroupTitle>
          <ListGroupDescription>Issued on 12 September 2026.</ListGroupDescription>
        </ListGroupContent>
        <ListGroupAction>
          <Badge variant="success">Approved</Badge>
        </ListGroupAction>
      </ListGroupItem>
      <ListGroupItem>
        <ListGroupIcon>
          <FileText aria-hidden="true" />
        </ListGroupIcon>
        <ListGroupContent>
          <ListGroupTitle>Income statement</ListGroupTitle>
          <ListGroupDescription>Awaiting verification by the finance desk.</ListGroupDescription>
        </ListGroupContent>
        <ListGroupAction>
          <Badge variant="warning">In review</Badge>
        </ListGroupAction>
      </ListGroupItem>
    </ListGroup>
  ),
}

export const InteractiveAndFlush: Story = {
  render: () => (
    <ListGroup variant="flush" className="brux-doc-field">
      <ListGroupItem interactive>
        <ListGroupContent>
          <ListGroupTitle>Open requests</ListGroupTitle>
          <ListGroupDescription>Twelve records need attention.</ListGroupDescription>
        </ListGroupContent>
      </ListGroupItem>
      <ListGroupItem interactive>
        <ListGroupContent>
          <ListGroupTitle>Archived requests</ListGroupTitle>
          <ListGroupDescription>History from previous fiscal years.</ListGroupDescription>
        </ListGroupContent>
      </ListGroupItem>
    </ListGroup>
  ),
}
