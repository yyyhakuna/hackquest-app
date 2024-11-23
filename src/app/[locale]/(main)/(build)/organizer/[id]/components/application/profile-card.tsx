import { Dialog, DialogTrigger } from '@hackquest/ui/shared/dialog'

import type {
  HackathonMemberExtend,
  ListOrganizerApplicationQuery,
} from '@/graphql/generated/hooks'
import { TableCell, TableRow } from '@hackquest/ui/shared/table'
import type { QueryObserverResult } from '@tanstack/react-query'
import { type Row, flexRender } from '@tanstack/react-table'
import { useTranslations } from 'next-intl'
import type { ApplicationPayment } from '../../constant'
import CardContent from './card-content'

const ProfileCard = ({
  row,
  data,
  status,
  refetch,
}: {
  row: Row<ApplicationPayment>
  data: HackathonMemberExtend[]
  status: string
  refetch: () => Promise<
    QueryObserverResult<ListOrganizerApplicationQuery, Error>
  >
}) => {
  const _t = useTranslations('HackathonOrganizer.manage')

  return (
    <Dialog>
      <DialogTrigger asChild>
        <TableRow
          data-state={row.getIsSelected() && 'selected'}
          className=' cursor-pointer border-b-0 hover:bg-neutral-100 [&_td:last-child]:border-r-0 [&_td]:border-r'
        >
          {row.getVisibleCells().map(cell => (
            <TableCell key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      </DialogTrigger>
      <CardContent row={row} data={data} status={status} refetch={refetch} />
    </Dialog>
  )
}

export default ProfileCard
