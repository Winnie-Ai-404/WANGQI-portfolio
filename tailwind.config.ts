import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx,mdx}',
    './data/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        accent: 'var(--color-accent)',
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
        },
        border: 'var(--color-border)',
      },
      borderRadius: {
        soft: '20px',
        xlsoft: '24px',
      },
      boxShadow: {
        soft: '0 20px 42px rgba(0, 0, 0, 0.36)',
        whisper: '0 8px 24px rgba(0, 0, 0, 0.28)',
      },
      maxWidth: {
        shell: '1280px',
        reading: '760px',
      },
      transitionTimingFunction: {
        calm: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}

export default config
