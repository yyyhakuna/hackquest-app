'use client'
import { Checkbox } from '@hackquest/ui/shared/checkbox'

import {
  type HackathonMemberExtend,
  type ProjectExtend,
  QueryMode,
  useListOrganizerSubmissionProjectQuery,
} from '@/graphql/generated/hooks'
import dayjs from '@/lib/dayjs'
import { cn } from '@hackquest/ui/lib/utils'
import { Dialog, DialogClose, DialogTrigger } from '@hackquest/ui/shared/dialog'
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
import * as React from 'react'
import { BsPersonAdd } from 'react-icons/bs'
import { RiDownloadLine } from 'react-icons/ri'
import type { SubmissionPayment } from '../../constant'
import { exportToCsv, parseOrderBy } from '../../utils'
import { ConfirmModal } from '../confirm-modal'
import ProjectDetail from './project-detail'
import SubmissionRow from './submission-row'

export function SubmissionTable({ searchWords }: { searchWords: string }) {
  const t = useTranslations('HackathonOrganizer.manage')
  const query = useParams()
  const searchParams = useSearchParams()
  const sortBy = searchParams.get('sortBy')
  const closeRef = React.useRef<HTMLButtonElement>(null)
  const id = query.id as string

  const { data: rowData } = useSuspenseQuery({
    queryKey: useListOrganizerSubmissionProjectQuery.getKey({
      where: {
        OR: [
          {
            name: { contains: searchWords, mode: QueryMode.Insensitive },
          },
          {
            detail: {
              is: {
                oneLineIntro: {
                  contains: searchWords,
                  mode: QueryMode.Insensitive,
                },
              },
            },
          },
        ],
        AND: [
          {
            hackathonId: {
              equals: id,
            },
          },
        ],
      },
      orderBy: parseOrderBy(sortBy ?? ''),
    }),
    queryFn: useListOrganizerSubmissionProjectQuery.fetcher({
      where: {
        OR: [
          {
            name: { contains: searchWords, mode: QueryMode.Insensitive },
          },
          {
            detail: {
              is: {
                oneLineIntro: {
                  contains: searchWords,
                  mode: QueryMode.Insensitive,
                },
              },
            },
          },
        ],
        AND: [
          {
            hackathonId: {
              equals: id,
            },
          },
        ],
      },
      orderBy: parseOrderBy(sortBy ?? ''),
    }),
    staleTime: 0,
  })

  const iniData = rowData.listOrganizerSubmissionProject?.data
  const data = React.useMemo(() => {
    return (
      iniData?.map(obj => {
        return {
          id: obj.id,
          projectName: obj.name,
          oneLineIntro: obj.detail?.oneLineIntro ?? '',
          video: obj.demoVideo || obj.pitchVideo ? 'uploaded' : 'not',
          sector: obj.tracks || [],
          date: obj.createdAt,
          project: obj as ProjectExtend,
          team: obj.team?.members?.length ?? 0,
          members: (obj.team?.members as HackathonMemberExtend[]) ?? [],
        }
      }) || []
    )
  }, [iniData])

  const columns: ColumnDef<SubmissionPayment>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          onClick={e => e.stopPropagation()}
          aria-label="Select row"
          className="mr-3"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'projectName',
      header: t('projectName'),
      cell: ({ row }) => (
        <div className='flex items-center gap-2'>
          <img
            src={row.original.project.logo ?? ''}
            className='h-6 w-6 rounded-[4px]'
          />
          <div className="w-28 truncate">{row.getValue('projectName')}</div>
        </div>
      ),
    },
    {
      accessorKey: 'team',
      header: t('team'),
      cell: ({ row }) => (
        <div className="flex w-[55px] items-center gap-1">
          <BsPersonAdd />
          {row.getValue('team')}
        </div>
      ),
    },
    {
      accessorKey: 'date',
      header: t('date'),
      cell: ({ row }) => (
        <div className="">
          {dayjs(row.getValue('date')).format('MMM D,YYYY')}
        </div>
      ),
    },
    {
      accessorKey: 'sector',
      header: t('sector'),
      cell: ({ row }) => {
        const str = (row.getValue('sector') as string[]).join(',')
        return <div className=" max-w-[140px] truncate">{str}</div>
      },
    },
    {
      accessorKey: 'video',
      header: t('video'),
      cell: ({ row }) => <div className="">{row.getValue('video')}</div>,
    },
    {
      accessorKey: 'oneLineIntro',
      header: t('oneLineIntro'),
      cell: ({ row }) => (
        <div className=" max-w-[180px] truncate">
          {row.getValue('oneLineIntro')}
        </div>
      ),
    },
    {
      accessorKey: 'projectDetail',
      header: t('projectDetail'),
      cell: ({ row }) => (
        <ProjectDetail
          projects={iniData as ProjectExtend[]}
          startIndex={row.index}
        />
      ),
    },
  ]
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  })

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const SubmissionTableHeader = React.useMemo(
    () => (
      <TableHeader className="[&_tr]:border-b-0">
        {table.getHeaderGroups().map(headerGroup => (
          <TableRow
            key={headerGroup.id}
            className='[&_th:last-child]:border-r-0 [&_th]:border-r '
          >
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
    ),
    [table, rowSelection],
  )
  const length = table.getFilteredSelectedRowModel().rows.length
  // )

  return (
    <div className="rounded-md border">
      <div className="flex h-[60px] w-full items-center justify-between bg-primary pr-6 pl-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-6 ">
            <Checkbox
              checked={table.getIsAllPageRowsSelected()}
              onCheckedChange={value =>
                table.toggleAllPageRowsSelected(!!value)
              }
              aria-label="Select all"
            />
            <span className="body-m text-primary-neutral">
              ({table.getFilteredSelectedRowModel().rows.length}){' '}
              {t('selected')}
            </span>
          </div>
          <Dialog>
            <DialogTrigger
              className={cn(
                'headline-m flex items-center gap-1 rounded-full bg-neutral-100 p-[4px_12px] text-neutral-400',
                length && 'bg-neutral-50 text-primary-neutral',
              )}
            >
              <RiDownloadLine className={cn(length && 'text-black')} />{' '}
              {t('downloadApplication')}
            </DialogTrigger>
            <DialogClose ref={closeRef} className="hidden" />
            <ConfirmModal
              title={t('confirmDownload')}
              desc={t('confirmDownloadDescription')}
              onConfirm={() => {
                const rows = table.getSelectedRowModel().rows
                closeRef.current?.click()
                if (!rows.length) return
                exportToCsv(
                  rows.map(obj => {
                    const {
                      location,
                      demoVideo,
                      pitchVideo,
                      prizeTrack,
                      wallet,
                      tracks,
                      teachStack,
                    } = obj.original.project
                    const newObj: any = {
                      location,
                      demoVideo,
                      pitchVideo,
                      wallet,
                      prizeTrack,
                    }
                    newObj.Sector = tracks?.join(',')
                    newObj.techStack = teachStack?.join(',')
                    if (obj.original.project.addition?.githubLink) {
                      newObj.github = obj.original.project.addition.githubLink
                    }
                    return newObj
                  }),
                )
              }}
            />
          </Dialog>
        </div>
      </div>
      <Table>
        {SubmissionTableHeader}
        <TableBody className="">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map(row => {
              return <SubmissionRow key={row.id} row={row} />
            })
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
