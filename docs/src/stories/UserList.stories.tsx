import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Avatar,
  AvatarFallback,
  UserList,
  UserListItem,
  UserListItemContent,
  UserListItemDescription,
  UserListItemTitle,
  UserListItemValue,
} from '../../../src'

const meta = {
  title: 'Components/UserList',
  component: UserList,
  parameters: {
    docs: {
      description: {
        component:
          'Directory-style list of people or accounts. Compose each row with an `Avatar`, a title, an optional description, and a trailing value such as a count or role.',
      },
    },
  },
} satisfies Meta<typeof UserList>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <UserList className="brux-doc-field">
      <UserListItem>
        <Avatar>
          <AvatarFallback>MT</AvatarFallback>
        </Avatar>
        <UserListItemContent>
          <UserListItemTitle>Mariana Torres</UserListItemTitle>
          <UserListItemDescription>Services coordinator</UserListItemDescription>
        </UserListItemContent>
        <UserListItemValue>12</UserListItemValue>
      </UserListItem>
      <UserListItem>
        <Avatar>
          <AvatarFallback>JR</AvatarFallback>
        </Avatar>
        <UserListItemContent>
          <UserListItemTitle>Julián Ríos</UserListItemTitle>
          <UserListItemDescription>Legal affairs</UserListItemDescription>
        </UserListItemContent>
        <UserListItemValue>7</UserListItemValue>
      </UserListItem>
      <UserListItem>
        <Avatar>
          <AvatarFallback>LC</AvatarFallback>
        </Avatar>
        <UserListItemContent>
          <UserListItemTitle>Lucía Castro</UserListItemTitle>
          <UserListItemDescription>Finance desk</UserListItemDescription>
        </UserListItemContent>
        <UserListItemValue>3</UserListItemValue>
      </UserListItem>
    </UserList>
  ),
}
