'use client'

import * as React from 'react'
import { type Hex, hexToNumber } from 'viem'

const COLOR_OPTIONS = [
  ['#fca5a5', '#b91c1c'],
  ['#fdba74', '#c2410c'],
  ['#fcd34d', '#b45309'],
  ['#fde047', '#a16207'],
  ['#a3e635', '#4d7c0f'],
  ['#86efac', '#15803d'],
  ['#67e8f9', '#0e7490'],
  ['#7dd3fc', '#0369a1'],
  ['#93c5fd', '#1d4ed8'],
  ['#a5b4fc', '#4338ca'],
  ['#c4b5fd', '#6d28d9'],
  ['#d8b4fe', '#7e22ce'],
  ['#f0abfc', '#a21caf'],
  ['#f9a8d4', '#be185d'],
  ['#fda4af', '#be123c'],
]

export function WalletAvatar({
  address,
  size,
  ensImage,
}: {
  address: string
  size: number
  ensImage?: string | null
}) {
  const id = React.useId()

  const colors = React.useMemo(
    () =>
      COLOR_OPTIONS[
        Number(hexToNumber(BigInt(address)?.toString()?.slice(2, 4) as Hex)) %
          COLOR_OPTIONS.length
      ] as [string, string],
    [address],
  )

  return ensImage ? (
    <img
      src={ensImage}
      width={size}
      height={size}
      style={{ borderRadius: 9999 }}
    />
  ) : (
    <div
      id={id}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundImage: `radial-gradient(ellipse at left bottom, ${colors[0]}, ${colors[1]})`,
        borderRadius: 9999,
      }}
    />
  )
}
