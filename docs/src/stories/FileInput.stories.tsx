import type { Meta, StoryObj } from '@storybook/react-vite'
import { FileInput, FileUpload } from '../../../src'

const meta = {
  title: 'Forms/FileInput',
  component: FileInput,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Native file picker rendered as a single bordered control with a segmented button. `FileUpload` is the drop-zone presentation with title, description, and action copy.',
      },
    },
  },
} satisfies Meta<typeof FileInput>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <FileInput aria-label="Supporting document" className="brux-doc-field" {...args} />,
}

export const Sizes: Story = {
  render: () => (
    <div className="brux-doc-stack brux-doc-field">
      <FileInput size="sm" aria-label="Small file input" />
      <FileInput size="md" aria-label="Medium file input" />
      <FileInput size="lg" aria-label="Large file input" />
    </div>
  ),
}

export const UploadZone: Story = {
  render: () => (
    <FileUpload className="brux-doc-field" accept=".pdf,.png,.jpg" aria-label="Supporting document" />
  ),
}

export const UploadZoneInvalid: Story = {
  render: () => (
    <FileUpload
      className="brux-doc-field"
      aria-invalid="true"
      title="Upload rejected"
      description="The file exceeds the 10 MB limit."
      action="Choose another file"
    />
  ),
}
