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
        soft: '0 12px 28px rgba(23, 23, 23, 0.05)',
        whisper: '0 4px 14px rgba(23, 23, 23, 0.04)',
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
