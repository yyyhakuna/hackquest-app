import { ConfirmModal } from '@/app/[locale]/(main)/(build)/organizer/[id]/components/confirm-modal'
import { cn } from '@hackquest/ui/lib/utils'
import { Checkbox } from '@hackquest/ui/shared/checkbox'
import { Dialog, DialogClose, DialogTrigger } from '@hackquest/ui/shared/dialog'
import type { Table } from '@tanstack/react-table'
import { useRef } from 'react'
import { RiDownloadLine } from 'react-icons/ri'
import type { TablePament } from '../../constant'

export const TableTopHeader = ({
  table,
}: {
  table: Table<TablePament>
}) => {
  const closeRef = useRef<HTMLButtonElement>(null)
  const length = table.getFilteredSelectedRowModel().rows.length
  return (
    <div className="flex w-full justify-between">
      <div className="flex items-center gap-6">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
        <span className="body-m text-primary-neutral">({length}) Selected</span>
      </div>
      <Dialog>
        <DialogTrigger
          className={cn(
            'headline-m flex items-center gap-1 rounded-full p-[4px_12px] text-neutral-400',
            length ? 'bg-neutral-50' : 'bg-neutral-100',
          )}
        >
          <RiDownloadLine className={cn(length && 'text-black')} />
          <span className={cn(length && 'text-primary-neutral')}>
            Download Application
          </span>
        </DialogTrigger>
        <DialogClose ref={closeRef} className="hidden" />
        <ConfirmModal
          title="Confirm Download"
          desc="Do you want to download selected applications?"
          onConfirm={() => {
            if (closeRef.current) {
              closeRef!.current!.click()
            }
            // applicationMultipleExport(table, hackathon as HackathonExtend)
          }}
        />
      </Dialog>
    </div>
  )
}
