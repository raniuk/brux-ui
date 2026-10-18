import type { Meta, StoryObj } from '@storybook/react-vite'
import { SearchInput } from '../../../src'

const meta = {
  title: 'Forms/SearchInput',
  component: SearchInput,
  parameters: {
    docs: {
      description: {
        component:
          'Search form with a magnifier adornment, a submit button, and a label that is visually hidden unless `showLabel` is set. The input is `type="search"` and required.',
      },
    },
  },
} satisfies Meta<typeof SearchInput>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div className="brux-doc-field">
      <SearchInput placeholder="Search requests" {...args} />
    </div>
  ),
}

export const WithVisibleLabel: Story = {
  render: () => (
    <div className="brux-doc-field">
      <SearchInput showLabel label="Find a request" placeholder="Reference or department" buttonLabel="Find" />
    </div>
  ),
}
