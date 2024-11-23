import dayjs from '@/lib/dayjs'
import { TableCell, TableRow } from '@hackquest/ui/shared/table'
import {
  type ColumnDef,
  type Row,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import type { SubmissionPayment, memberPayment } from '../../constant'

const SubmissionRow = ({ row }: { row: Row<SubmissionPayment> }) => {
  const data: memberPayment[] = row.original.members.map(obj => {
    return {
      name: obj.nickname ?? '',
      role: obj.memberType ?? 'member',
      date: dayjs(obj.createdAt).format('MMM D,YYYY'),
      avatar: obj.avatar ?? '',
    }
  })

  const columns: ColumnDef<memberPayment>[] = [
    {
      id: 'null',
      cell: () => <></>,
    },
    {
      accessorKey: 'name',
      cell: ({ row }) => (
        <div className='flex items-center gap-2'>
          <img src={row.original.avatar} className='h-6 w-6 rounded-[4px]' />
          <div className="w-28 truncate">{row.getValue('name')}</div>
        </div>
      ),
    },
    {
      accessorKey: 'role',
      cell: ({ row }) => <div className="w-[55px]">{row.getValue('role')}</div>,
    },
    {
      accessorKey: 'date',
      cell: ({ row }) => <div>{row.getValue('date')}</div>,
    },
  ]
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const [visible, setVisible] = useState(false)
  const memberList = useMemo(
    () =>
      table.getRowModel().rows.map(row => (
        <TableRow key={row.id} className="[&_td]:border-r ">
          {row.getVisibleCells().map(cell => (
            <TableCell key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      )),
    [table],
  )

  return (
    <>
      <TableRow
        data-state={row.getIsSelected() && 'selected'}
        className=' cursor-pointer border-b-0 hover:bg-neutral-100 [&_td:last-child]:border-r-0 [&_td]:border-r'
        onClick={_e => {
          setVisible(!visible)
        }}
      >
        {row.getVisibleCells().map(cell => (
          <TableCell key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
      {visible && memberList}
    </>
  )
}

export default SubmissionRow
