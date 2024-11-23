'use client'
import { Checkbox } from '@hackquest/ui/shared/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@hackquest/ui/shared/table'
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useParams, useSearchParams } from 'next/navigation'
import * as React from 'react'
import type { TablePament } from '../../constant'
// import { parseOrderBy } from '../../utils'
import ProfileCard from './profile-card'
import { TableAction } from './table-action'
import { TableTopHeader } from './table-top-header'

export function CoLearningTable({ searchWords }: { searchWords: string }) {
  const _query = useSearchParams()

  //   const sortBy = query.get('sortBy')
  const _params = useParams()
  //   const id = params.id
  const data = React.useMemo(() => {
    return [
      {
        data: {
          name: 'aaaaa',
          date: 'bbbbb',
          location: 'ccccc',
          email: 'dddddd',
        },
      },
      {
        data: {
          name: 'aaaaa',
          date: 'bbbbb',
          location: 'ccccc',
          email: 'dddddd',
        },
      },
    ]
  }, [])

  const columns: ColumnDef<TablePament>[] = [
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
      accessorKey: 'Name',
      header: 'Name',
      cell: ({ row }) => (
        <div className="capitalize">{row.original.data.name}</div>
      ),
    },
    {
      accessorKey: 'Date',
      header: 'Date',
      cell: ({ row }) => (
        <div className="capitalize">{row.original.data.date}</div>
      ),
    },
    {
      accessorKey: 'Location',
      header: 'Location',
      cell: ({ row }) => (
        <div className="capitalize">{row.original.data.location}</div>
      ),
    },
    {
      accessorKey: 'Email',
      header: 'Email',
      cell: ({ row }) => (
        <div className="capitalize">{row.original.data.email}</div>
      ),
    },
    {
      accessorKey: 'Action',
      header: 'Action',
      cell: ({ row }) => <TableAction />,
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

  return (
    <div className="rounded-md border">
      <div className="flex h-[60px] w-full items-center justify-between bg-primary pr-6 pl-4">
        <TableTopHeader table={table} />
      </div>
      <Table>
        <TableHeader className="[&_tr]:border-b-0">
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow
              key={headerGroup.id}
              className='border-b-0 [&_th:last-child]:border-r-0 [&_th]:border-r '
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
                <ProfileCard key={row.id} row={row} data={data} />
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
