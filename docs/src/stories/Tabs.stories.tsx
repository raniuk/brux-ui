import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../src'

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    docs: {
      description: {
        component:
          'Layered content sections built on the Radix tabs primitive. `TabsList` has two variants: `underline` (default) and `vertical`. `TabsTrigger` reads the variant from context, so set it once on the list. Use `orientation="vertical"` on `Tabs` for correct arrow-key navigation in the vertical layout.',
      },
    },
  },
} satisfies Meta<typeof Tabs>

export default meta

type Story = StoryObj<typeof meta>

export const Underline: Story = {
  render: () => (
    <Tabs defaultValue="dashboard" className="brux-doc-tabs">
      <TabsList>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
        <TabsTrigger value="disabled" disabled>
          Disabled
        </TabsTrigger>
      </TabsList>
      <TabsContent value="profile">Public profile and identity information.</TabsContent>
      <TabsContent value="dashboard">Overview of your pending requests.</TabsContent>
      <TabsContent value="settings">Account preferences and security.</TabsContent>
    </Tabs>
  ),
}

export const Vertical: Story = {
  render: () => (
    <Tabs defaultValue="profile" orientation="vertical" className="brux-doc-tabs brux-doc-tabs--vertical">
      <TabsList variant="vertical" className="brux-doc-tabs-list--vertical">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">Public profile and identity information.</TabsContent>
      <TabsContent value="billing">Payment methods and invoices.</TabsContent>
      <TabsContent value="security">Two-factor authentication and access keys.</TabsContent>
    </Tabs>
  ),
}
