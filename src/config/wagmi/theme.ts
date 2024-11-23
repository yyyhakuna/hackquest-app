import { type Theme, lightTheme } from '@rainbow-me/rainbowkit'
import merge from 'lodash-es/merge'

export const theme = merge(lightTheme(), {
  blurs: {
    modalOverlay: 'blur(0px)',
  },
  colors: {
    accentColor: 'hsl(var(--blue-500))',
    error: 'hsl(var(--destructive-500))',
    menuItemBackground: 'hsl(var(--neutral-100))',
    modalBackdrop: 'rgba(0, 0, 0, 0.5)',
    connectionIndicator: 'hsl(var(--success-500))',
    closeButtonBackground: 'hsl(var(--neutral-100))',
    actionButtonBorder: 'transparent',
  },
  fonts: {
    body: 'var(--font-next-book)',
  },
  radii: {
    actionButton: '6px',
    connectButton: '12px',
    menuButton: '8px',
    modal: '16px',
    modalMobile: '16px',
  },
  shadows: {
    selectedOption: 'none',
    dialog: 'none',
  },
} as Theme)
