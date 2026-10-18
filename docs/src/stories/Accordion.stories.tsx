import type { Meta, StoryObj } from '@storybook/react-vite'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../../src'

const meta = {
  title: 'Components/Accordion',
  component: AccordionItem,
  parameters: {
    docs: {
      description: {
        component:
          'Vertically stacked headings that reveal a panel. Use `type="single"` with `collapsible` for one panel at a time, or `type="multiple"` for several open panels. The indicator rotates when its panel opens.',
      },
    },
  },
} satisfies Meta<typeof AccordionItem>

export default meta

type Story = StoryObj<typeof meta>

export const Single: Story = {
  args: { value: 'eligibility' },
  render: () => (
    <Accordion type="single" collapsible className="brux-doc-accordion">
      <AccordionItem value="eligibility">
        <AccordionTrigger>Who can request this service?</AccordionTrigger>
        <AccordionContent>
          Natural or legal persons registered in the institutional system, with an active tax identification number and no pending obligations.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="documents">
        <AccordionTrigger>Which documents are required?</AccordionTrigger>
        <AccordionContent>
          Identity document, proof of address issued within the last three months, and the completed application form.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="timeline">
        <AccordionTrigger>How long does the review take?</AccordionTrigger>
        <AccordionContent>
          The standard review takes up to ten business days. Incomplete submissions restart the counter from the date the missing information is received.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const Multiple: Story = {
  args: { value: 'one' },
  render: () => (
    <Accordion type="multiple" defaultValue={['one', 'two']} className="brux-doc-accordion">
      <AccordionItem value="one">
        <AccordionTrigger>Section one</AccordionTrigger>
        <AccordionContent>This section starts open.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="two">
        <AccordionTrigger>Section two</AccordionTrigger>
        <AccordionContent>Several sections can stay open at the same time.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="three">
        <AccordionTrigger>Section three</AccordionTrigger>
        <AccordionContent>This section starts closed.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const WithRichContent: Story = {
  args: { value: 'summary' },
  render: () => (
    <Accordion type="single" collapsible className="brux-doc-accordion">
      <AccordionItem value="summary">
        <AccordionTrigger>Administrative summary</AccordionTrigger>
        <AccordionContent>
          <div className="brux-doc-accordion-details">
            <span>Department: Citizen services</span>
            <span>Status: In review</span>
            <span>Updated: Today</span>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}
