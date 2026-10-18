import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, Navbar, NavbarBrand, NavbarContent } from '../../../src'

const meta = {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: {
    docs: {
      description: {
        component:
          'Top application bar with a sticky position and a brand accent border. `NavbarContent` aligns its children to the start or end of the row, and `NavbarBrand` supports `asChild` for router links.',
      },
    },
  },
} satisfies Meta<typeof Navbar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Navbar>
      <NavbarContent>
        <NavbarBrand href="#home">Brux UI</NavbarBrand>
      </NavbarContent>
      <NavbarContent side="end">
        <Button variant="ghost" size="sm">
          Documentation
        </Button>
        <Button size="sm">Sign in</Button>
      </NavbarContent>
    </Navbar>
  ),
}
