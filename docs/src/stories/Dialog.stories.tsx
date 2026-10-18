import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../src'

const meta = {
  title: 'Components/Dialog',
  component: DialogContent,
  parameters: {
    docs: {
      description: {
        component:
          'Modal dialog built on the Radix dialog primitive. Opening moves focus into the dialog, the overlay closes it on click, and focus returns to the trigger on close. Every dialog requires a `DialogTitle`; add `DialogDescription` for screen-reader context. Sizes: `sm`, `md`, `lg`, `xl`, and `full`.',
      },
    },
  },
} satisfies Meta<typeof DialogContent>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request submitted</DialogTitle>
          <DialogDescription>
            The request entered the review queue. You will receive an update when the status changes.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
          <Button>View request</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="brux-doc-row">
      {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Dialog key={size}>
          <DialogTrigger asChild>
            <Button variant="secondary">{size}</Button>
          </DialogTrigger>
          <DialogContent size={size}>
            <DialogHeader>
              <DialogTitle>Size {size}</DialogTitle>
              <DialogDescription>Maximum width for this dialog variant.</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  ),
}
