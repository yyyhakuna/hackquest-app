import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import sharedConfig from '@hackquest/tailwind-config'
import { parse } from 'postcss'
import { objectify } from 'postcss-js'
import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'
import type { PluginCreator } from 'tailwindcss/types/config'

function cssPlugin(): PluginCreator {
  const filename = resolve(__dirname, './src/app/globals.css')
  const css = readFileSync(filename, 'utf8')
  const root = parse(css)
  const jss = objectify(root)

  return ({ addBase, addComponents, addUtilities }) => {
    if ('@layer base' in jss) {
      addBase(jss['@layer base'])
    }
    if ('@layer components' in jss) {
      addComponents(jss['@layer components'])
    }
    if ('@layer utilities' in jss) {
      addUtilities(jss['@layer utilities'])
    }
  }
}

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/components/**/*.{ts,tsx,js,jsx,mdx}',
    '../../packages/editor/src/**/*.{ts,tsx,js,jsx,mdx}',
  ],
  presets: [sharedConfig],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['var(--font-nunito)', ...fontFamily.sans],
        'next-book': ['var(--font-next-book)'],
        monaco: ['var(--font-monaco)'],
      },
      keyframes: {
        'grow-rotate': {
          from: {
            'stroke-dashoffset': 'var(--stroke-dasharray)',
          },
          to: {
            'stroke-dashoffset': 'var(--stroke-dashoffset)',
          },
        },
      },
      animation: {
        'grow-rotate': 'grow-rotate 1.2s ease-out forwards',
      },
    },
  },
  plugins: [cssPlugin()],
}

export default config
