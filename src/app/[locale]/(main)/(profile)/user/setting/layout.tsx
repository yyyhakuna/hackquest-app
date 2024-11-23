import type { Metadata } from 'next'
import * as React from 'react'

export const metadata: Metadata = {
  title: 'Evan',
}

export default function UserSettingLayout({
  params: { username },
  children,
}: {
  params: { username: string }
  children: React.ReactNode
}) {
  return <React.Suspense>{children}</React.Suspense>
}
