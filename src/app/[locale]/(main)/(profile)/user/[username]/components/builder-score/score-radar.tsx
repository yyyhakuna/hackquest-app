import type { UserWeb3Score } from '@/graphql/generated/graphql'
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts'

export function ScoreRadar({
  web3Score = [],
}: {
  web3Score?: UserWeb3Score[]
}) {
  return (
    <ResponsiveContainer width="100%" height={440} className="max-sm:hidden">
      <RadarChart data={web3Score}>
        <PolarGrid
          radialLines={false}
          stroke="hsl(var(--neutral-200))"
          strokeWidth={2}
        />
        <PolarAngleAxis
          dataKey="latitude"
          tick={{ fill: 'hsl(var(--neutral-800))', fontSize: 12 }}
        />
        <PolarRadiusAxis tick={false} axisLine={false} />
        <Radar
          dataKey="score"
          stroke="hsl(var(--primary-600))"
          strokeWidth={2}
          fill="hsl(var(--primary-500))"
          fillOpacity={0.2}
          dot={{
            r: 4,
            fillOpacity: 1,
            fill: 'hsl(var(--primary-600))',
          }}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}
