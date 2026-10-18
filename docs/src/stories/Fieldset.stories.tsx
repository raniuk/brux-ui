import type { Meta, StoryObj } from '@storybook/react-vite'
import { Fieldset, FieldsetDescription, FieldsetLegend, Input, Label } from '../../../src'

const meta = {
  title: 'Forms/Fieldset',
  component: Fieldset,
  parameters: {
    docs: {
      description: {
        component:
          'Grouping container for related controls. The native `fieldset` and `legend` pair gives assistive technology the group name, and the `disabled` attribute disables every nested control.',
      },
    },
  },
} satisfies Meta<typeof Fieldset>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Fieldset className="brux-doc-field">
      <FieldsetLegend>Applicant identity</FieldsetLegend>
      <FieldsetDescription>Information must match the supporting documents.</FieldsetDescription>
      <div className="brux-doc-stack">
        <Label htmlFor="fieldset-name">Full name</Label>
        <Input id="fieldset-name" placeholder="Mariana Torres" />
      </div>
      <div className="brux-doc-stack">
        <Label htmlFor="fieldset-id">Identification number</Label>
        <Input id="fieldset-id" placeholder="Nine digits" />
      </div>
    </Fieldset>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Fieldset className="brux-doc-field" disabled>
      <FieldsetLegend>Applicant identity</FieldsetLegend>
      <FieldsetDescription>This section is locked while the request is under review.</FieldsetDescription>
      <div className="brux-doc-stack">
        <Label htmlFor="fieldset-disabled-name">Full name</Label>
        <Input id="fieldset-disabled-name" defaultValue="Mariana Torres" />
      </div>
    </Fieldset>
  ),
}
