import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Foundation/Overview',
  parameters: {
    docs: {
      description: {
        component:
          'Brux UI is a token-first React design system. A serif display signature over a Swiss sans body, one semantic palette, and five elevation levels. Use the toolbar to verify light and dark.',
      },
    },
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

const colors = [
  ['Primary', 'var(--brux-color-primary)'],
  ['Secondary', 'var(--brux-color-secondary)'],
  ['Accent', 'var(--brux-color-accent)'],
  ['Success', 'var(--brux-color-success)'],
  ['Warning', 'var(--brux-color-warning)'],
  ['Danger', 'var(--brux-color-danger)'],
  ['Info', 'var(--brux-color-info)'],
] as const

export const Palette: Story = {
  render: () => (
    <section className="brux-doc-stack">
      <header className="brux-doc-hero">
        <h1 className="brux-doc-hero-title">
          Brux <em>UI</em>
        </h1>
        <p className="brux-doc-hero-subtitle">
          One semantic palette, a serif display voice, and five elevation levels — so every
          component reads as the same system, in light and dark.
        </p>
      </header>

      <div className="brux-doc-grid">
        {colors.map(([name, color]) => (
          <article className="brux-doc-card" key={name}>
            <div className="brux-doc-swatch" style={{ background: color }} />
            <h2>{name}</h2>
            <p>{color}</p>
          </article>
        ))}
      </div>

      <article className="brux-doc-card">
        <h2>Typography</h2>
        <div className="brux-doc-type-row">
          <span className="brux-doc-type-sample--display">Display serif</span>
          <span className="brux-doc-type-label">Fraunces · display</span>
        </div>
        <div className="brux-doc-type-row">
          <span>Body sans</span>
          <span className="brux-doc-type-label">Inter · body</span>
        </div>
      </article>

      <article className="brux-doc-card">
        <h2>Surface hierarchy</h2>
        <div className="brux-doc-row" style={{ marginTop: 'var(--brux-space-3)' }}>
          <div className="brux-doc-card">Surface</div>
          <div className="brux-doc-card" style={{ background: 'var(--brux-color-surface-alt)' }}>
            Surface alt
          </div>
        </div>
      </article>
    </section>
  ),
}
