'use client'
import {
  type FixedVote,
  QueryMode,
  type ScoreVote,
  useListOrganizerJudgeProjectQuery,
} from '@/graphql/generated/hooks'
import {
  Select,
  SelectContent,
  SelectTrigger,
} from '@hackquest/ui/shared/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@hackquest/ui/shared/table'
import { useSuspenseQuery } from '@tanstack/react-query'
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useTranslations } from 'next-intl'
import { useParams, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import { FaArrowUp } from 'react-icons/fa'
import type { JudgesOnlyPayment, JudgingPayment } from '../../constant'
import { parseOrderBy } from '../../utils'

const JudgingTable = ({
  isOnlyJudge,
  defaultTrack,
}: {
  isOnlyJudge: boolean
  defaultTrack: string
}) => {
  const t = useTranslations('HackathonOrganizer.manage')

  const query = useSearchParams()
  const params = useParams()

  const id = params.id as string
  const track = query.get('track')
  const sortBy = query.get('sortBy')
  const { data: l } = useSuspenseQuery({
    queryKey: useListOrganizerJudgeProjectQuery.getKey({
      where: {
        hackathonId: {
          equals: id,
        },
        prizeTrack: {
          contains: track || defaultTrack,
          mode: QueryMode.Insensitive,
        },
      },
      orderBy: parseOrderBy(sortBy ?? ''),
    }),
    queryFn: useListOrganizerJudgeProjectQuery.fetcher({
      where: {
        hackathonId: {
          equals: id,
        },
        prizeTrack: {
          contains: track || defaultTrack,
          mode: QueryMode.Insensitive,
        },
      },
      orderBy: parseOrderBy(sortBy ?? ''),
    }),
  })
  const list = l.listOrganizerJudgeProject!

  type Payment<T extends boolean> = T extends true
    ? JudgingPayment
    : JudgesOnlyPayment

  const commonColumns: ColumnDef<Payment<typeof isOnlyJudge>>[] = [
    {
      accessorKey: 'rank',
      header: t('rank'),
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          {row.getValue('rank')}
          <FaArrowUp className="text-success-600" />
        </div>
      ),
    },
    {
      accessorKey: 'projectName',
      header: t('projectName'),
      cell: ({ row }) => (
        <div className="flex gap-2">
          <img
            src={row.original.projectImg}
            className="h-6 w-6 rounded-[4px]"
          />
          <span>{row.getValue('projectName')}</span>
        </div>
      ),
    },
    {
      accessorKey: 'sector',
      header: t('sector'),
      cell: ({ row }) => {
        const str = (row.getValue('sector') as string[]).join(',')
        return <div>{str}</div>
      },
    },
  ]
  const onlyColumns: ColumnDef<Payment<typeof isOnlyJudge>>[] = [
    {
      accessorKey: 'everyScore',
      header: t('everyScore'),
      cell: ({ row }) => {
        const everyScore = row.getValue('everyScore') as any[]
        return (
          <div className="w-[150px]">
            <Select>
              <SelectTrigger className="">
                {everyScore.length + ' Scores'}
              </SelectTrigger>
              <SelectContent>
                <div className="flex w-[510px] flex-wrap gap-3 p-[20px_12px]">
                  {everyScore.map((obj, _i) => (
                    <div
                      key={obj.id}
                      className="flex basis-[calc(50%-6px)] items-center justify-between rounded-md border border-neutral-300 bg-neutral-100 p-[8px_12px]"
                    >
                      <div className="flex gap-2 ">
                        <img src={obj.avatar} alt="" className="h-6 w-6" />
                        <span className="body-s text-primary-neutral">
                          {obj.name}
                        </span>
                      </div>
                      <span className="headline-m text-primary-neutral">
                        {obj.score}
                      </span>
                    </div>
                  ))}
                </div>
              </SelectContent>
            </Select>
          </div>
        )
      },
    },
    {
      accessorKey: 'finalScore',
      header: t('finalScore'),
      cell: ({ row }) => <div className="">{row.getValue('finalScore')}</div>,
    },
  ]
  const bothColumns: ColumnDef<Payment<typeof isOnlyJudge>>[] = [
    {
      accessorKey: 'userVotes',
      header: t('userVotes'),
      cell: ({ row }) => <div className="">{row.getValue('userVotes')}</div>,
    },
    {
      accessorKey: 'judgeVotes',
      header: t('judgeVotes'),
      cell: ({ row }) => <div className="">{row.getValue('judgeVotes')}</div>,
    },
    {
      accessorKey: 'totalVotes',
      header: t('totalVotes'),
      cell: ({ row }) => <div className="">{row.getValue('totalVotes')}</div>,
    },
  ]

  const columns = isOnlyJudge
    ? [...commonColumns, ...onlyColumns]
    : [...commonColumns, ...bothColumns]
  const consturctData = (): Payment<typeof isOnlyJudge>[] => {
    if (isOnlyJudge) {
      return (
        list.projects?.map(p => {
          const scoreVotes = p.fixOrSocreVote as ScoreVote
          return {
            rank: scoreVotes.rank ?? undefined,
            finalScore: scoreVotes.finalScore ?? undefined,
            projectName: p.name,
            sector: p.tracks ?? [],
            everyScore:
              scoreVotes.scoresMember?.map(v => {
                return { name: v.name, score: v.score, avatar: v.avatar }
              }) ?? [],
            projectImg: p.logo ?? '',
          }
        }) ?? []
      )
    } else {
      return (
        list.projects?.map(p => {
          const fixedVotes = p.fixOrSocreVote as FixedVote
          return {
            rank: fixedVotes.rank ?? undefined,
            projectName: p.name,
            sector: p.tracks ?? [],
            userVotes: fixedVotes.userVotes ?? 0,
            judgeVotes: fixedVotes.judgeVotes ?? 0,
            totalVotes: fixedVotes.totalVotes ?? 0,
            projectImg: p.logo ?? '',
          }
        }) ?? []
      )
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const data: Payment<typeof isOnlyJudge>[] = useMemo(() => {
    return consturctData()
  }, [track])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <TableHead
                    key={header.id}
                    className="headline-m text-neutral-700"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default JudgingTable
