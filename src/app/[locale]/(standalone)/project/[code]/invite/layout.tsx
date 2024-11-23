import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HackQuest - Project Invite',
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
