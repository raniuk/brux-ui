import type { Meta, StoryObj } from '@storybook/react-vite'
import { List, ListItem } from '../../../src'

const meta = {
  title: 'Components/List',
  component: List,
  argTypes: {
    variant: { control: 'select', options: ['divided', 'disc', 'decimal'] },
    as: { control: 'select', options: ['ul', 'ol'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Semantic list with three presentations: `divided` for record rows, `disc` for unordered items, and `decimal` for ordered steps. Markers use the muted text token.',
      },
    },
  },
} satisfies Meta<typeof List>

export default meta

type Story = StoryObj<typeof meta>

export const Divided: Story = {
  render: () => (
    <List className="brux-doc-field">
      <ListItem>
        <span>Certificate of residence</span>
        <span className="brux-doc-hint">Approved</span>
      </ListItem>
      <ListItem>
        <span>Income statement</span>
        <span className="brux-doc-hint">In review</span>
      </ListItem>
      <ListItem>
        <span>Identification copy</span>
        <span className="brux-doc-hint">Missing</span>
      </ListItem>
    </List>
  ),
}

export const Disc: Story = {
  argTypes: { as: { control: false } },
  render: () => (
    <List variant="disc">
      <ListItem variant="prose">Identity document</ListItem>
      <ListItem variant="prose">Proof of address issued within three months</ListItem>
      <ListItem variant="prose">Completed application form</ListItem>
    </List>
  ),
}

export const Decimal: Story = {
  argTypes: { as: { control: false } },
  render: () => (
    <List as="ol" variant="decimal">
      <ListItem>Complete the application form.</ListItem>
      <ListItem>Attach the supporting documents.</ListItem>
      <ListItem>Confirm the contact details.</ListItem>
    </List>
  ),
}
