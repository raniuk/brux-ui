import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../../../src'

const meta = {
  title: 'Components/DropdownMenu',
  component: DropdownMenuContent,
  parameters: {
    docs: {
      description: {
        component:
          'Command menu built on the Radix dropdown menu primitive. Arrow keys move through items, typeahead selects by label, and submenus open with the right arrow. Items support `variant="danger"`, checkable items, radio groups, separators, and shortcut hints.',
      },
    },
  },
} satisfies Meta<typeof DropdownMenuContent>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">Open menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Request</DropdownMenuLabel>
        <DropdownMenuItem>Open<DropdownMenuShortcut>Enter</DropdownMenuShortcut></DropdownMenuItem>
        <DropdownMenuItem>Duplicate<DropdownMenuShortcut>Ctrl D</DropdownMenuShortcut></DropdownMenuItem>
        <DropdownMenuItem>Rename</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="danger">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const WithSubmenu: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">Share</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem>Copy link</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Send to</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Legal affairs</DropdownMenuItem>
              <DropdownMenuItem>Finance</DropdownMenuItem>
              <DropdownMenuItem>Citizen services</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const CheckableItems: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">Columns</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Visible columns</DropdownMenuLabel>
        <DropdownMenuCheckboxItem checked>Reference</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked>Status</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>Assigned to</DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Density</DropdownMenuLabel>
        <DropdownMenuRadioGroup value="standard">
          <DropdownMenuRadioItem value="compact">Compact</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="standard">Standard</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="comfortable">Comfortable</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}
