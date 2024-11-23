'use client'
import {
  type HackathonMemberExtend,
  useListOrganizerApplicationQuery,
} from '@/graphql/generated/hooks'
import dayjs from '@/lib/dayjs'
import { Checkbox } from '@hackquest/ui/shared/checkbox'
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
import type { ApplicationPayment } from '../../constant'
import { parseEquals, parseOrderBy } from '../../utils'
import ProfileCard from './profile-card'
import {
  ApprovedAction,
  DeclineAction,
  PendingAction,
  WaitlistAction,
} from './table-action'
import {
  ApprovedTopHeader,
  DeclineTopHeader,
  PenddingTopHeader,
  WaitlistTopHeader,
} from './table-top-header'

export function ApplicationTable({ searchWords }: { searchWords: string }) {
  const query = useSearchParams()
  const status = query.get('status')
  const sortBy = query.get('sortBy')
  const params = useParams()
  const id = params.id
  const equals = parseEquals(status ?? '')
  const t = useTranslations('HackathonOrganizer.manage')
  const { data: list, refetch } = useSuspenseQuery({
    queryKey: useListOrganizerApplicationQuery.getKey({
      where: {
        AND: [
          { hackathonId: { equals: id as string } },
          { joinState: { equals } },
        ],
      },
      orderBy: parseOrderBy(sortBy ?? ''),
    }),
    queryFn: useListOrganizerApplicationQuery.fetcher({
      where: {
        AND: [
          { hackathonId: { equals: id as string } },
          { joinState: { equals } },
        ],
      },
      orderBy: parseOrderBy(sortBy ?? ''),
    }),
    staleTime: 0,
  })

  const d = list.listOrganizerApplication.data

  const data = React.useMemo(() => {
    return (
      d?.map(obj => {
        const about = obj.info.About
        return {
          name: (about?.firstName || '') + ' ' + (about?.lastName || ''),
          id: obj.userId,
          applyDate: obj.createdAt,
          location: obj.location ?? '',
          project: obj as HackathonMemberExtend,
          bio: obj.bio ?? '',
          isSubmitted: obj.isSubmitted ?? false,
          registerConfirm: obj.registerConfirm,
          projectId: obj.id,
        }
      }) || []
    )
  }, [d])

  const renderAction = (
    isSubmitted: boolean,
    registerConfirm: boolean,
    id: string,
  ) => {
    switch (status) {
      case 'Approve':
        return (
          <ApprovedAction
            isSubmitted={isSubmitted}
            registerConfirm={registerConfirm}
            refetch={refetch}
            id={id}
          />
        )
      case 'Decline':
        return <DeclineAction refetch={refetch} id={id} />
      case 'Waitlist':
        return <WaitlistAction refetch={refetch} id={id} />
      default:
        return <PendingAction refetch={refetch} id={id} />
    }
  }

  const columns: ColumnDef<ApplicationPayment>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          onClick={e => e.stopPropagation()}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          aria-label="Select row"
          onClick={e => e.stopPropagation()}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'name',
      header: t('name'),
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('name')}</div>
      ),
    },
    {
      accessorKey: 'applyDate',
      header: t('applyDate'),
      cell: ({ row }) => (
        <div className="capitalize">
          {dayjs(row.getValue('applyDate')).format('MMM D,YYYY')}
        </div>
      ),
    },
    {
      accessorKey: 'location',
      header: t('location'),
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('location')}</div>
      ),
    },
    {
      accessorKey: 'bio',
      header: t('bio'),
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('bio')}</div>
      ),
    },
    {
      accessorKey: 'action',
      header: t('action'),
      cell: ({ row }) =>
        renderAction(
          row.original.isSubmitted,
          row.original.registerConfirm,
          row.original.projectId,
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

  const renderTopHeader = () => {
    switch (status) {
      case 'Approve':
        return <ApprovedTopHeader table={table} refetch={refetch} />
      case 'Decline':
        return <DeclineTopHeader table={table} refetch={refetch} />
      case 'Waitlist':
        return <WaitlistTopHeader table={table} refetch={refetch} />
      default:
        return <PenddingTopHeader table={table} refetch={refetch} />
    }
  }
  return (
    <div className="rounded-md border">
      <div className="flex h-[60px] w-full items-center justify-between bg-primary pr-6 pl-4">
        {renderTopHeader()}
      </div>
      <Table>
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
        <TableBody>
          {table.getRowModel().rows.length ? (
            table
              .getRowModel()
              .rows.map(row => (
                <ProfileCard
                  refetch={refetch}
                  key={row.id}
                  row={row}
                  data={d as HackathonMemberExtend[]}
                  status={status ?? ''}
                />
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
