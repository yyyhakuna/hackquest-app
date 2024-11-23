import dynamic from 'next/dynamic'
import type * as React from 'react'

const ClientOnly = ({ children }: { children: React.ReactNode }) => children

export default dynamic(() => Promise.resolve(ClientOnly), { ssr: false })
