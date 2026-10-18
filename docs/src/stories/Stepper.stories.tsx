import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Stepper,
  StepperContent,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperTitle,
} from '../../../src'

const meta = {
  title: 'Components/Stepper',
  component: Stepper,
  argTypes: {
    variant: { control: 'select', options: ['default', 'icon', 'detailed', 'breadcrumb', 'vertical'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Ordered progress steps. The current step is marked with `aria-current="step"`, completed steps show a check, and each `StepperItem` exposes its status through `data-status`. Variants: `default`, `icon`, `detailed`, `breadcrumb`, and `vertical`.',
      },
    },
  },
} satisfies Meta<typeof Stepper>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Stepper aria-label="Request progress">
      <StepperItem variant="default" status="complete">
        <StepperIndicator status="complete" />
        <StepperContent className="brux-doc-stepper-label">
          <StepperTitle>Application</StepperTitle>
        </StepperContent>
      </StepperItem>
      <StepperItem variant="default" status="current">
        <StepperIndicator status="current">2</StepperIndicator>
        <StepperContent className="brux-doc-stepper-label">
          <StepperTitle>Documents</StepperTitle>
        </StepperContent>
      </StepperItem>
      <StepperItem variant="default" status="upcoming">
        <StepperIndicator status="upcoming">3</StepperIndicator>
        <StepperContent className="brux-doc-stepper-label">
          <StepperTitle>Review</StepperTitle>
        </StepperContent>
      </StepperItem>
    </Stepper>
  ),
}

export const Detailed: Story = {
  render: () => (
    <Stepper variant="detailed" aria-label="Request progress">
      <StepperItem variant="detailed" status="complete">
        <StepperIndicator status="complete" />
        <StepperContent>
          <StepperTitle>Application</StepperTitle>
          <StepperDescription>Submitted on 12 September</StepperDescription>
        </StepperContent>
      </StepperItem>
      <StepperItem variant="detailed" status="current">
        <StepperIndicator status="current">2</StepperIndicator>
        <StepperContent>
          <StepperTitle>Documents</StepperTitle>
          <StepperDescription>Two of three files attached</StepperDescription>
        </StepperContent>
      </StepperItem>
      <StepperItem variant="detailed" status="upcoming">
        <StepperIndicator status="upcoming">3</StepperIndicator>
        <StepperContent>
          <StepperTitle>Review</StepperTitle>
          <StepperDescription>Pending assignment</StepperDescription>
        </StepperContent>
      </StepperItem>
    </Stepper>
  ),
}

export const Vertical: Story = {
  render: () => (
    <Stepper variant="vertical" aria-label="Request progress">
      <StepperItem variant="vertical" status="complete">
        <StepperIndicator status="complete" />
        <StepperContent>
          <StepperTitle>Application</StepperTitle>
          <StepperDescription>Identity and contact details confirmed.</StepperDescription>
        </StepperContent>
      </StepperItem>
      <StepperItem variant="vertical" status="current">
        <StepperIndicator status="current">2</StepperIndicator>
        <StepperContent>
          <StepperTitle>Documents</StepperTitle>
          <StepperDescription>Attach the proof of address.</StepperDescription>
        </StepperContent>
      </StepperItem>
      <StepperItem variant="vertical" status="upcoming">
        <StepperIndicator status="upcoming">3</StepperIndicator>
        <StepperContent>
          <StepperTitle>Review</StepperTitle>
          <StepperDescription>Committee evaluation.</StepperDescription>
        </StepperContent>
      </StepperItem>
    </Stepper>
  ),
}

export const Breadcrumb: Story = {
  render: () => (
    <Stepper variant="breadcrumb" aria-label="Request progress">
      <StepperItem variant="breadcrumb" status="complete">
        <StepperContent>
          <StepperTitle>Application</StepperTitle>
        </StepperContent>
      </StepperItem>
      <StepperItem variant="breadcrumb" status="current">
        <StepperContent>
          <StepperTitle>Documents</StepperTitle>
        </StepperContent>
      </StepperItem>
      <StepperItem variant="breadcrumb" status="upcoming">
        <StepperContent>
          <StepperTitle>Review</StepperTitle>
        </StepperContent>
      </StepperItem>
    </Stepper>
  ),
}
