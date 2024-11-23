import type {
  HackathonExtend,
  ListOrganizerApplicationQuery,
} from '@/graphql/generated/hooks'
import { cn } from '@hackquest/ui/lib/utils'
import { Checkbox } from '@hackquest/ui/shared/checkbox'
import { Dialog, DialogClose, DialogTrigger } from '@hackquest/ui/shared/dialog'
import type { QueryObserverResult } from '@tanstack/react-query'
import type { Table } from '@tanstack/react-table'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'
import { FaCircleCheck } from 'react-icons/fa6'
import { IoMdCloseCircle } from 'react-icons/io'
import { MdOutlineAccessTime } from 'react-icons/md'
import { RiDownloadLine } from 'react-icons/ri'
import type { ApplicationPayment } from '../../constant'
import { applicationMultipleExport } from '../../utils'
import { useOrganizerStore } from '../../utils/store'
import { useApplicationAction } from '../../utils/use-application-action'
import { ConfirmModal } from '../confirm-modal'

export const PenddingTopHeader = ({
  table,
  refetch,
}: {
  table: Table<ApplicationPayment>
  refetch: () => Promise<
    QueryObserverResult<ListOrganizerApplicationQuery, Error>
  >
}) => {
  const t = useTranslations('HackathonOrganizer.manage')
  const rows = table.getSelectedRowModel().rows
  const ids = rows.map(row => {
    return row.original.projectId
  })
  const closeDownloadRef = useRef<HTMLButtonElement>(null)
  const closeApproveRef = useRef<HTMLButtonElement>(null)
  const closeDeclineRef = useRef<HTMLButtonElement>(null)
  const { hackathon } = useOrganizerStore()
  const closeWaitlistRef = useRef<HTMLButtonElement>(null)

  const { approve, decline, waitlist } = useApplicationAction(refetch, ids)
  const length = rows.length
  return (
    <div className="flex w-full justify-between">
      <div className="flex items-center gap-6">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
        <span className="body-m text-primary-neutral">
          ({length}) {t('selected')}
        </span>
      </div>
      <div className="flex space-x-6">
        <Dialog>
          <DialogTrigger
            className={cn(
              'headline-m flex items-center gap-1 rounded-full p-[4px_12px] text-neutral-400',
              length ? 'bg-neutral-50' : 'bg-neutral-100',
            )}
          >
            <RiDownloadLine className={cn(length && 'text-black')} />
            <span className={cn(length && 'text-primary-neutral')}>
              {t('downloadApplication')}
            </span>
          </DialogTrigger>
          <DialogClose ref={closeDownloadRef} className="hidden" />
          <ConfirmModal
            title={t('confirmDownload')}
            desc={t('confirmDownloadDescription')}
            onConfirm={() => {
              if (closeDownloadRef.current) {
                closeDownloadRef!.current!.click()
              }
              applicationMultipleExport(table, hackathon as HackathonExtend)
            }}
          />
        </Dialog>
        <Dialog>
          <DialogTrigger
            className={cn(
              'headline-m flex items-center gap-1 rounded-full p-[4px_12px] text-neutral-400',
              length ? 'bg-neutral-50' : 'bg-neutral-100',
            )}
          >
            <FaCircleCheck className={cn(length && 'text-black')} />
            <span className={cn(length && 'text-primary-neutral')}>
              {t('approve')}
            </span>
          </DialogTrigger>
          <DialogClose ref={closeApproveRef} className="hidden" />
          <ConfirmModal
            title={t('confirmApprove')}
            desc={t('confirmApproveDescription')}
            onConfirm={() => {
              if (closeApproveRef.current) {
                closeApproveRef!.current!.click()
              }
              approve()
            }}
          />
        </Dialog>
        <Dialog>
          <DialogTrigger
            className={cn(
              'headline-m flex items-center gap-1 rounded-full p-[4px_12px] text-neutral-400',
              length ? 'bg-neutral-50' : 'bg-neutral-100',
            )}
          >
            <IoMdCloseCircle className={cn(length && 'text-black')} />
            <span className={cn(length && 'text-primary-neutral')}>
              {t('decline')}
            </span>
          </DialogTrigger>
          <DialogClose ref={closeDeclineRef} className="hidden" />
          <ConfirmModal
            title={t('confirmDecline')}
            desc={t('confirmDeclineDescription')}
            onConfirm={() => {
              if (closeDeclineRef.current) {
                closeDeclineRef!.current!.click()
              }
              decline()
            }}
          />
        </Dialog>
        <Dialog>
          <DialogTrigger
            className={cn(
              'headline-m flex items-center gap-1 rounded-full p-[4px_12px] text-neutral-400',
              length ? 'bg-neutral-50' : 'bg-neutral-100',
            )}
          >
            <MdOutlineAccessTime className={cn(length && 'text-black')} />
            <span className={cn(length && 'text-primary-neutral')}>
              {t('waitlist')}
            </span>
          </DialogTrigger>
          <DialogClose ref={closeWaitlistRef} className="hidden" />
          <ConfirmModal
            title={t('confirmWaitlist')}
            desc={t('confirmWaitlistDescription')}
            onConfirm={() => {
              if (closeWaitlistRef.current) {
                closeWaitlistRef!.current!.click()
              }
              waitlist()
            }}
          />
        </Dialog>
      </div>
    </div>
  )
}

export const ApprovedTopHeader = ({
  table,
  refetch,
}: {
  table: Table<ApplicationPayment>
  refetch: () => Promise<
    QueryObserverResult<ListOrganizerApplicationQuery, Error>
  >
}) => {
  const t = useTranslations('HackathonOrganizer.manage')
  const closeRef = useRef<HTMLButtonElement>(null)
  const { hackathon } = useOrganizerStore()
  const length = table.getFilteredSelectedRowModel().rows.length
  return (
    <div className="flex w-full justify-between">
      <div className="flex items-center gap-6">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
        <span className="body-m text-primary-neutral">
          ({length}) {t('selected')}
        </span>
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
            {t('downloadApplication')}
          </span>
        </DialogTrigger>
        <DialogClose ref={closeRef} className="hidden" />
        <ConfirmModal
          title={t('confirmDownload')}
          desc={t('confirmDownloadDescription')}
          onConfirm={() => {
            if (closeRef.current) {
              closeRef!.current!.click()
            }
            applicationMultipleExport(table, hackathon as HackathonExtend)
          }}
        />
      </Dialog>
    </div>
  )
}

export const DeclineTopHeader = ({
  table,
  refetch,
}: {
  table: Table<ApplicationPayment>
  refetch: () => Promise<
    QueryObserverResult<ListOrganizerApplicationQuery, Error>
  >
}) => {
  const t = useTranslations('HackathonOrganizer.manage')
  const closeDownloadRef = useRef<HTMLButtonElement>(null)
  const ids = table.getSelectedRowModel().rows.map(row => {
    return row.original.projectId
  })
  const { undo } = useApplicationAction(refetch, ids)
  const closeUndoRef = useRef<HTMLButtonElement>(null)
  const { hackathon } = useOrganizerStore()
  const length = table.getFilteredSelectedRowModel().rows.length
  return (
    <div className="flex w-full justify-between">
      <div className="flex items-center gap-6">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
        <span className="body-m text-primary-neutral">
          ({length}) {t('selected')}
        </span>
      </div>
      <div className="flex space-x-6">
        <Dialog>
          <DialogTrigger
            className={cn(
              'headline-m flex items-center gap-1 rounded-full p-[4px_12px] text-neutral-400',
              length ? 'bg-neutral-50' : 'bg-neutral-100',
            )}
          >
            <RiDownloadLine className={cn(length && 'text-black')} />
            <span className={cn(length && 'text-primary-neutral')}>
              {t('downloadApplication')}
            </span>
          </DialogTrigger>
          <DialogClose ref={closeDownloadRef} className="hidden" />
          <ConfirmModal
            title={t('confirmDownload')}
            desc={t('confirmDownloadDescription')}
            onConfirm={() => {
              if (closeDownloadRef.current) {
                closeDownloadRef!.current!.click()
              }
              applicationMultipleExport(table, hackathon as HackathonExtend)
            }}
          />
        </Dialog>
        <Dialog>
          <DialogTrigger
            className={cn(
              'headline-m flex items-center gap-1 rounded-full p-[4px_12px] text-neutral-400',
              length ? 'bg-neutral-50' : 'bg-neutral-100',
            )}
          >
            <IoMdCloseCircle className={cn(length && 'text-black')} />
            <span className={cn(length && 'text-primary-neutral')}>
              Undo Decline
            </span>
          </DialogTrigger>
          <DialogClose ref={closeUndoRef} className="hidden" />
          <ConfirmModal
            title="Undo Decline"
            desc="Do you want to Undo Decline?"
            onConfirm={() => {
              if (closeUndoRef.current) {
                closeUndoRef!.current!.click()
              }
              undo()
            }}
          />
        </Dialog>
      </div>
    </div>
  )
}

export const WaitlistTopHeader = ({
  table,
  refetch,
}: {
  table: Table<ApplicationPayment>
  refetch: () => Promise<
    QueryObserverResult<ListOrganizerApplicationQuery, Error>
  >
}) => {
  const t = useTranslations('HackathonOrganizer.manage')
  const ids = table.getSelectedRowModel().rows.map(row => {
    return row.original.projectId
  })
  const { undo, approve, decline } = useApplicationAction(refetch, ids)
  const { hackathon } = useOrganizerStore()
  const closeDownloadRef = useRef<HTMLButtonElement>(null)
  const closeApproveRef = useRef<HTMLButtonElement>(null)
  const closeDeclineRef = useRef<HTMLButtonElement>(null)
  const closeUndoRef = useRef<HTMLButtonElement>(null)
  const length = table.getFilteredSelectedRowModel().rows.length
  return (
    <div className="flex w-full justify-between">
      <div className="flex items-center gap-6">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
        <span className="body-m text-primary-neutral">
          ({length}) {t('selected')}
        </span>
      </div>
      <div className="flex gap-6">
        <Dialog>
          <DialogTrigger
            className={cn(
              'headline-m flex items-center gap-1 rounded-full p-[4px_12px] text-neutral-400',
              length ? 'bg-neutral-50' : 'bg-neutral-100',
            )}
          >
            <RiDownloadLine className={cn(length && 'text-black')} />
            <span className={cn(length && 'text-primary-neutral')}>
              {t('downloadApplication')}
            </span>
          </DialogTrigger>
          <DialogClose ref={closeDownloadRef} className="hidden" />
          <ConfirmModal
            title={t('confirmDownload')}
            desc={t('confirmDownloadDescription')}
            onConfirm={() => {
              if (closeDownloadRef.current) {
                closeDownloadRef!.current!.click()
              }
              applicationMultipleExport(table, hackathon as HackathonExtend)
            }}
          />
        </Dialog>
        <Dialog>
          <DialogTrigger
            className={cn(
              'headline-m flex items-center gap-1 rounded-full p-[4px_12px] text-neutral-400',
              length ? 'bg-neutral-50' : 'bg-neutral-100',
            )}
          >
            <FaCircleCheck className={cn(length && 'text-black')} />
            <span className={cn(length && 'text-primary-neutral')}>
              {t('approve')}
            </span>
          </DialogTrigger>
          <DialogClose ref={closeApproveRef} className="hidden" />
          <ConfirmModal
            title={t('confirmApprove')}
            desc={t('confirmApproveDescription')}
            onConfirm={() => {
              if (closeApproveRef.current) {
                closeApproveRef!.current!.click()
              }
              approve()
            }}
          />
        </Dialog>
        <Dialog>
          <DialogTrigger
            className={cn(
              'headline-m flex items-center gap-1 rounded-full p-[4px_12px] text-neutral-400',
              length ? 'bg-neutral-50' : 'bg-neutral-100',
            )}
          >
            <IoMdCloseCircle className={cn(length && 'text-black')} />
            <span className={cn(length && 'text-primary-neutral')}>
              {t('decline')}
            </span>
          </DialogTrigger>
          <DialogClose ref={closeDeclineRef} className="hidden" />
          <ConfirmModal
            title={t('confirmDecline')}
            desc={t('confirmDeclineDescription')}
            onConfirm={() => {
              if (closeDeclineRef.current) {
                closeDeclineRef!.current!.click()
              }
              decline()
            }}
          />
        </Dialog>
        <Dialog>
          <DialogTrigger
            className={cn(
              'headline-m flex items-center gap-1 rounded-full p-[4px_12px] text-neutral-400',
              length ? 'bg-neutral-50' : 'bg-neutral-100',
            )}
          >
            <IoMdCloseCircle className={cn(length && 'text-black')} />
            <span className={cn(length && 'text-primary-neutral')}>
              undo waitlist
            </span>
          </DialogTrigger>
          <DialogClose ref={closeUndoRef} className="hidden" />
          <ConfirmModal
            title="Undo Decline"
            desc="Do you want to Undo Decline?"
            onConfirm={() => {
              if (closeUndoRef.current) {
                closeUndoRef!.current!.click()
              }
              undo()
            }}
          />
        </Dialog>
      </div>
    </div>
  )
}
