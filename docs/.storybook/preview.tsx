import type { Preview } from '@storybook/react-vite'
import type { ReactNode } from 'react'
import { useEffect } from 'react'
import '../../src/styles.css'
import '../src/styles.css'

function ThemeFrame({ children, theme }: { children: ReactNode; theme: 'light' | 'dark' }) {
  useEffect(() => {
    document.documentElement.dataset.bruxTheme = theme

    return () => {
      document.documentElement.dataset.bruxTheme = 'light'
    }
  }, [theme])

  return (
    <div className="brux-doc-theme" data-brux-theme={theme}>
      <main className="brux-doc-canvas">{children}</main>
    </div>
  )
}

const preview: Preview = {
  tags: ['autodocs'],
  globalTypes: {
    theme: {
      description: 'Color theme',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme === 'dark' ? 'dark' : 'light'

      return (
        <ThemeFrame theme={theme}>
          <Story />
        </ThemeFrame>
      )
    },
  ],
}

export default preview
