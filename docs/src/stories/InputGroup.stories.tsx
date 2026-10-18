import type { Meta, StoryObj } from '@storybook/react-vite'
import { InputGroup, InputGroupInput, InputGroupText } from '../../../src'
import { AtSign } from 'lucide-react'

const meta = {
  title: 'Forms/InputGroup',
  component: InputGroup,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Input wrapper that joins a leading or trailing adornment to a borderless field. The group owns the border and focus ring, so nested inputs keep a single visual edge. Invalid and disabled states are inherited from the nested control.',
      },
    },
  },
} satisfies Meta<typeof InputGroup>

export default meta

type Story = StoryObj<typeof meta>

export const LeadingAdornment: Story = {
  render: () => (
    <InputGroup className="brux-doc-field">
      <InputGroupText>
        <AtSign aria-hidden="true" />
      </InputGroupText>
      <InputGroupInput type="email" placeholder="name@institution.org" aria-label="Email address" />
    </InputGroup>
  ),
}

export const TrailingText: Story = {
  render: () => (
    <InputGroup className="brux-doc-field">
      <InputGroupInput placeholder="username" aria-label="Username" />
      <InputGroupText>@institution.org</InputGroupText>
    </InputGroup>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="brux-doc-stack brux-doc-field">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <InputGroup key={size} size={size}>
          <InputGroupText>$</InputGroupText>
          <InputGroupInput placeholder="Amount" aria-label={`Amount ${size}`} />
        </InputGroup>
      ))}
    </div>
  ),
}

export const Invalid: Story = {
  render: () => (
    <InputGroup className="brux-doc-field">
      <InputGroupText>ID</InputGroupText>
      <InputGroupInput defaultValue="12" aria-invalid="true" aria-label="Identification number" />
    </InputGroup>
  ),
}
