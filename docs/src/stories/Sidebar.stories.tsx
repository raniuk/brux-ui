import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarItem,
  SidebarNav,
  SidebarProvider,
  SidebarSubGroup,
  SidebarTrigger,
} from '../../../src'

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    docs: {
      description: {
        component:
          'Persistent navigation column. Below 640px the sidebar becomes a modal drawer built on the Radix dialog primitive, opened with `SidebarTrigger`. Groups collapse through Radix Collapsible, and `SidebarItem` exposes the current page with `aria-current="page"`.',
      },
    },
  },
} satisfies Meta<typeof Sidebar>

export default meta

type Story = StoryObj<typeof meta>

const navItems = [
  { id: 'dashboard', label: 'Dashboard', href: '#dashboard', active: true },
  {
    id: 'requests',
    label: 'Requests',
    items: [
      { id: 'open', label: 'Open', href: '#open' },
      { id: 'closed', label: 'Closed', href: '#closed' },
      { id: 'archived', label: 'Archived', href: '#archived', disabled: true },
    ],
  },
  { id: 'documents', label: 'Documents', href: '#documents' },
  { id: 'settings', label: 'Settings', href: '#settings' },
]

export const Default: Story = {
  render: () => (
    <SidebarProvider>
      <div className="brux-doc-sidebar-demo">
        <Sidebar>
          <SidebarHeader>
            <strong>Brux UI</strong>
          </SidebarHeader>
          <SidebarContent>
            <SidebarNav items={navItems} defaultOpenIds={['requests']} />
          </SidebarContent>
          <SidebarFooter>
            <span className="brux-doc-hint">Signed in as M. Torres</span>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <div className="brux-doc-sidebar-main">
            <SidebarTrigger />
            <p className="brux-doc-hint">The drawer trigger is visible only below 640px.</p>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  ),
}

export const ManualGroups: Story = {
  render: () => (
    <SidebarProvider>
      <div className="brux-doc-sidebar-demo">
        <Sidebar>
          <SidebarHeader>
            <strong>Brux UI</strong>
          </SidebarHeader>
          <SidebarContent>
            <nav aria-label="Navigation">
              <ul className="brux-sidebar-nav-list">
                <SidebarItem href="#dashboard" active>
                  Dashboard
                </SidebarItem>
                <SidebarGroup label="Requests" defaultOpen>
                  <SidebarSubGroup label="Department" defaultOpen>
                    <SidebarItem href="#legal">Legal affairs</SidebarItem>
                    <SidebarItem href="#finance">Finance</SidebarItem>
                  </SidebarSubGroup>
                  <SidebarItem href="#archived" disabled>
                    Archived
                  </SidebarItem>
                </SidebarGroup>
                <SidebarItem href="#settings">Settings</SidebarItem>
              </ul>
            </nav>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <div className="brux-doc-sidebar-main">
            <SidebarTrigger />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  ),
}
