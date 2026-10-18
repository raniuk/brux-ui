import type { Meta, StoryObj } from '@storybook/react-vite'
import { Link } from '../../../src'

const meta = {
  title: 'Components/Link',
  component: Link,
  parameters: {
    docs: {
      description: {
        component:
          'Inline navigation text with three emphasis levels. `default` underlines the link, `subtle` reveals the underline on hover, and `muted` keeps secondary navigation quiet. Use `asChild` to forward styles to a router link.',
      },
    },
  },
} satisfies Meta<typeof Link>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'Read the documentation', href: '#documentation' },
}

export const Variants: Story = {
  render: () => (
    <div className="brux-doc-stack">
      <Link href="#default">Default link</Link>
      <Link href="#subtle" variant="subtle">
        Subtle link
      </Link>
      <Link href="#muted" variant="muted">
        Muted link
      </Link>
    </div>
  ),
}

export const InlineText: Story = {
  render: () => (
    <p className="brux-doc-prose">
      Review the <Link href="#requirements">document requirements</Link> before submitting the request.
    </p>
  ),
}
