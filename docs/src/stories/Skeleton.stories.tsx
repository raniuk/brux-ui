import type { Meta, StoryObj } from '@storybook/react-vite'
import { Skeleton } from '../../../src'

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  argTypes: {
    variant: { control: 'select', options: ['default', 'contrast'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Placeholder while content loads. It is hidden from assistive technology, so pair it with a live region or a visible loading label when the wait is meaningful.',
      },
    },
  },
} satisfies Meta<typeof Skeleton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <Skeleton className="brux-doc-skeleton-line" {...args} />,
}

export const CardPlaceholder: Story = {
  render: () => (
    <div className="brux-doc-card-demo brux-doc-skeleton-card">
      <Skeleton className="brux-doc-skeleton-avatar" />
      <div className="brux-doc-stack">
        <Skeleton className="brux-doc-skeleton-line" />
        <Skeleton className="brux-doc-skeleton-line brux-doc-skeleton-line--short" />
        <Skeleton variant="contrast" className="brux-doc-skeleton-line brux-doc-skeleton-line--shorter" />
      </div>
    </div>
  ),
}
