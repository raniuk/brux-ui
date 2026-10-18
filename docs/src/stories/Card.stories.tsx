import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../src'

const meta = {
  title: 'Components/Card',
  component: Card,
  argTypes: {
    variant: { control: 'select', options: ['surface', 'muted', 'interactive', 'brand'] },
    padding: { control: 'select', options: ['none', 'sm', 'md'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Surface container for grouped content. Variants: `surface` (default), `muted`, `interactive` (hover elevation), and `brand` (primary top border). Compose it with `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, and `CardFooter`.',
      },
    },
  },
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Card className="brux-doc-card-demo" {...args}>
      <CardHeader>
        <CardTitle>Service request</CardTitle>
        <CardDescription>Certificate of residence for the current fiscal year.</CardDescription>
      </CardHeader>
      <CardContent className="brux-doc-hint">Submitted on 12 September. Awaiting document verification.</CardContent>
      <CardFooter>
        <Button variant="secondary">View details</Button>
        <Button>Continue</Button>
      </CardFooter>
    </Card>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="brux-doc-grid">
      <Card variant="surface">
        <CardHeader>
          <CardTitle>Surface</CardTitle>
          <CardDescription>Default elevated surface.</CardDescription>
        </CardHeader>
      </Card>
      <Card variant="muted">
        <CardHeader>
          <CardTitle>Muted</CardTitle>
          <CardDescription>Lower emphasis background.</CardDescription>
        </CardHeader>
      </Card>
      <Card variant="interactive" tabIndex={0}>
        <CardHeader>
          <CardTitle>Interactive</CardTitle>
          <CardDescription>Hover raises the surface.</CardDescription>
        </CardHeader>
      </Card>
      <Card variant="brand">
        <CardHeader>
          <CardTitle>Brand</CardTitle>
          <CardDescription>Primary accent border.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  ),
}
