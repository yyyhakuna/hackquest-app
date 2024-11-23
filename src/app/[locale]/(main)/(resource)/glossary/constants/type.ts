import type { Glossary } from '@/graphql/generated/hooks'

export interface GlossaryListType {
  letter: string
  list: Glossary[]
}

export interface OffsetTopsType {
  letter: string
  offsetTop: number
}
