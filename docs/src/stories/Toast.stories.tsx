import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, Toaster, toast } from '../../../src'

const meta = {
  title: 'Components/Toast',
  component: Toaster,
  parameters: {
    docs: {
      description: {
        component:
          'Transient notification built on the Radix toast primitive. Mount `Toaster` once near the root, then call `toast()` or its `success`, `warning`, `info`, and `danger` helpers. Toasts are announced politely, stack up to four, and can be dismissed by swipe or the close button.',
      },
    },
  },
} satisfies Meta<typeof Toaster>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <>
      <div className="brux-doc-row">
        <Button onClick={() => toast('The request was queued for review.')}>Show toast</Button>
        <Button variant="secondary" onClick={() => toast.success({ title: 'Changes saved', description: 'The record was updated.' })}>
          Success
        </Button>
        <Button variant="secondary" onClick={() => toast.warning({ title: 'Session expires soon', description: 'Two minutes remaining.' })}>
          Warning
        </Button>
        <Button variant="secondary" onClick={() => toast.info({ title: 'New version available' })}>
          Info
        </Button>
        <Button variant="danger" onClick={() => toast.danger({ title: 'Upload failed', description: 'Check the file format.' })}>
          Danger
        </Button>
      </div>
      <Toaster />
    </>
  ),
}

export const WithAction: Story = {
  render: () => (
    <>
      <Button
        variant="secondary"
        onClick={() =>
          toast.success({
            title: 'Request archived',
            description: 'The record moved out of the active queue.',
            action: (
              <Button size="sm" variant="ghost" onClick={() => toast('Archive undone.')}>
                Undo
              </Button>
            ),
          })
        }
      >
        Archive request
      </Button>
      <Toaster />
    </>
  ),
}
