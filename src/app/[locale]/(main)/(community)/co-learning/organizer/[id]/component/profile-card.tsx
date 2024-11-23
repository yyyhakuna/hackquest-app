import { Dialog, DialogTrigger } from '@hackquest/ui/shared/dialog'
import { TableCell, TableRow } from '@hackquest/ui/shared/table'
import { type Row, flexRender } from '@tanstack/react-table'
import type { TablePament } from '../../constant'
// import CardContent from './card-content'

const ProfileCard = ({
  row,
  data,
}: {
  row: Row<TablePament>
  data: any
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <TableRow
          data-state={row.getIsSelected() && 'selected'}
          className=' cursor-pointer border-b-0 hover:bg-neutral-100 [&_td:last-child]:border-r-0 [&_td]:border-r '
        >
          {row.getVisibleCells().map(cell => (
            <TableCell key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      </DialogTrigger>
      {/* <CardContent row={row} data={data} /> */}
    </Dialog>
  )
}

export default ProfileCard
