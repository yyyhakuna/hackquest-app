import '@rainbow-me/rainbowkit/styles.css'
import '@mysten/dapp-kit/dist/index.css'
import '@solana/wallet-adapter-react-ui/styles.css'
import '@hackquest/tailwind-config/styles/globals.css'
import '@hackquest/ui/styles/globals.css'
import '@hackquest/editor/styles.css'
import './globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
