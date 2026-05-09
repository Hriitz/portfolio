import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        panel: 'var(--panel)',
        'panel-2': 'var(--panel-2)',
        border: 'var(--border)',
        'border-strong': 'var(--border-strong)',
        text: 'var(--text)',
        muted: 'var(--muted)',
        'muted-2': 'var(--muted-2)',
        up: 'var(--up)',
        down: 'var(--down)',
        accent: 'var(--accent)',
        // legacy aliases so the existing components don't break mid-migration
        background: 'var(--bg)',
        foreground: 'var(--text)',
        card: 'var(--panel)',
        'card-foreground': 'var(--text)',
        'muted-foreground': 'var(--muted)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      keyframes: {
        blink: {
          '0%, 55%': { opacity: '1' },
          '60%, 100%': { opacity: '0.35' },
        },
        caret: {
          '0%, 50%': { opacity: '1' },
          '50.01%, 100%': { opacity: '0' },
        },
        tickerScroll: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        bootIn: {
          '0%':   { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        sparklineDraw: {
          '0%':   { strokeDashoffset: '500' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      animation: {
        blink: 'blink 2.4s ease-in-out infinite',
        caret: 'caret 1.2s steps(2) infinite',
        ticker: 'tickerScroll 110s linear infinite',
        'boot-in': 'bootIn 0.4s ease-out both',
      },
    },
  },
  plugins: [],
}
export default config
