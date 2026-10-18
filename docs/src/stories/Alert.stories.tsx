import type { Meta, StoryObj } from '@storybook/react-vite'
import { Alert, AlertDescription, AlertTitle } from '../../../src'
import { Bell, CircleCheck, CircleX, Info, TriangleAlert } from 'lucide-react'

const meta = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    docs: {
      description: {
        component:
          'Inline message banner. Variants: `neutral`, `info`, `success`, `warning`, `danger`, and `accent`. A leading SVG icon inherits the semantic color of its variant.',
      },
    },
  },
} satisfies Meta<typeof Alert>

export default meta

type Story = StoryObj<typeof meta>

export const Variants: Story = {
  render: () => (
    <section className="brux-doc-alert-stack">
      <Alert>
        <Bell aria-hidden="true" />
        <AlertTitle>Request saved</AlertTitle>
        <AlertDescription>The draft is available for later review.</AlertDescription>
      </Alert>
      <Alert variant="info">
        <Info aria-hidden="true" />
        <AlertTitle>New policy update</AlertTitle>
        <AlertDescription>The regulation was updated for the current fiscal year.</AlertDescription>
      </Alert>
      <Alert variant="success">
        <CircleCheck aria-hidden="true" />
        <AlertTitle>Approved</AlertTitle>
        <AlertDescription>The request completed the institutional workflow.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <TriangleAlert aria-hidden="true" />
        <AlertTitle>Deadline approaching</AlertTitle>
        <AlertDescription>Submit supporting documents before the closing date.</AlertDescription>
      </Alert>
      <Alert variant="danger">
        <CircleX aria-hidden="true" />
        <AlertTitle>Action required</AlertTitle>
        <AlertDescription>Review the missing fields before continuing.</AlertDescription>
      </Alert>
    </section>
  ),
}

export const TitleOnly: Story = {
  render: () => (
    <section className="brux-doc-alert-stack">
      <Alert variant="success"><AlertTitle>Changes saved successfully.</AlertTitle></Alert>
      <Alert variant="warning"><AlertTitle>Your session expires in 5 minutes.</AlertTitle></Alert>
    </section>
  ),
}

export const WithoutIcon: Story = {
  render: () => (
    <Alert variant="info">
      <AlertTitle>Maintenance window</AlertTitle>
      <AlertDescription>The platform will be unavailable on Saturday from 22:00 to 23:00.</AlertDescription>
    </Alert>
  ),
}
