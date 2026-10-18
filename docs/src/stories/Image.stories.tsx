import type { Meta, StoryObj } from '@storybook/react-vite'
import { Figure, FigureCaption, Image } from '../../../src'

const meta = {
  title: 'Components/Image',
  component: Image,
  argTypes: {
    rounded: { control: 'select', options: ['none', 'sm', 'md', 'lg', 'full'] },
    fit: { control: 'select', options: ['cover', 'contain', 'fill', 'none'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Image with a themed border and object-fit control. `alt` is required by the type, so decorative images must be wrapped by the consumer with an explicit empty string. Use `Figure` and `FigureCaption` for captioned media.',
      },
    },
  },
} satisfies Meta<typeof Image>

export default meta

type Story = StoryObj<typeof meta>

const source = 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=640&q=60'

export const Default: Story = {
  args: { alt: 'Portrait of a person outdoors', src: source, width: 320, height: 200 },
}

export const Rounded: Story = {
  args: { alt: 'Square corners', src: source },
  render: () => (
    <div className="brux-doc-row">
      <Image alt="Square corners" src={source} rounded="none" width={140} height={100} />
      <Image alt="Small radius" src={source} rounded="sm" width={140} height={100} />
      <Image alt="Medium radius" src={source} rounded="md" width={140} height={100} />
      <Image alt="Circle" src={source} rounded="full" width={100} height={100} />
    </div>
  ),
}

export const WithCaption: Story = {
  args: { alt: 'Portrait of a person outdoors', src: source },
  render: () => (
    <Figure className="brux-doc-field">
      <Image alt="Portrait of a person outdoors" src={source} width={480} height={280} />
      <FigureCaption>Public domain photograph used in the documentation.</FigureCaption>
    </Figure>
  ),
}
