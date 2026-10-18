import type { Meta, StoryObj } from '@storybook/react-vite'
import { ScrollArea } from '../../../src'

const meta = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
  parameters: {
    docs: {
      description: {
        component:
          'Scroll container built on the Radix scroll area primitive. It keeps the viewport keyboard-focusable and renders a styled `ScrollBar` instead of the native scrollbar. Give the root an explicit height so the viewport can overflow.',
      },
    },
  },
} satisfies Meta<typeof ScrollArea>

export default meta

type Story = StoryObj<typeof meta>

const items = Array.from({ length: 24 }, (_, index) => `Request ${String(index + 1).padStart(3, '0')}`)

export const Vertical: Story = {
  render: () => (
    <ScrollArea className="brux-doc-scroll">
      <div className="brux-doc-scroll-content">
        {items.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </ScrollArea>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="brux-doc-scroll brux-doc-scroll--horizontal" scrollbars="horizontal">
      <div className="brux-doc-scroll-track">
        {items.map((item) => (
          <div key={item} className="brux-doc-scroll-card">
            {item}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}
