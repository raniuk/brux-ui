import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../../src'

const meta = {
  title: 'Components/Tooltip',
  component: TooltipContent,
  parameters: {
    docs: {
      description: {
        component:
          'Short contextual hint built on the Radix tooltip primitive. Wrap the tree in `TooltipProvider` once; every `TooltipTrigger` needs a focusable child, and the content is exposed on hover and keyboard focus.',
      },
    },
  },
} satisfies Meta<typeof TooltipContent>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="secondary">Hover for help</Button>
        </TooltipTrigger>
        <TooltipContent>The report is generated once per day.</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}

export const Sides: Story = {
  render: () => (
    <TooltipProvider>
      <div className="brux-doc-row">
        {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
          <Tooltip key={side}>
            <TooltipTrigger asChild>
              <Button variant="ghost">{side}</Button>
            </TooltipTrigger>
            <TooltipContent side={side}>Placement: {side}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  ),
}
