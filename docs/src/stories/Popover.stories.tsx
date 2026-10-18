import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, Popover, PopoverClose, PopoverContent, PopoverTrigger } from '../../../src'

const meta = {
  title: 'Components/Popover',
  component: PopoverContent,
  parameters: {
    docs: {
      description: {
        component:
          'Anchored overlay built on the Radix popover primitive. Unlike a tooltip it holds interactive content, traps focus while open, and closes on Escape or outside interaction.',
      },
    },
  },
} satisfies Meta<typeof PopoverContent>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Filter results</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="brux-doc-stack">
          <strong>Status</strong>
          <span className="brux-doc-hint">Choose which requests to display.</span>
          <PopoverClose asChild>
            <Button size="sm">Apply</Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

export const Aligned: Story = {
  render: () => (
    <div className="brux-doc-row">
      {(['start', 'center', 'end'] as const).map((align) => (
        <Popover key={align}>
          <PopoverTrigger asChild>
            <Button variant="ghost">{align}</Button>
          </PopoverTrigger>
          <PopoverContent align={align}>Aligned to the {align} of the trigger.</PopoverContent>
        </Popover>
      ))}
    </div>
  ),
}
