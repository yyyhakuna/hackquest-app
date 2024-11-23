import { Link, usePathname, useRouter } from '@/app/navigation'
import { useListFaucetsClaimRecordByChainIdQuery } from '@/graphql/generated/hooks'
import dayjs from '@/lib/dayjs'

import { Pagination } from '@/components/common/pagination'
import type { GetFaucetDetailByIdQuery } from '@/graphql/generated/graphql'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FiExternalLink } from 'react-icons/fi'
import FaucetInfoInput from './faucet-info-input'

interface FaucetTableProps {
  faucetInfo: GetFaucetDetailByIdQuery['findFirstFaucet']
}

interface FaucetTablePaginationProps {
  curPage: number
  pageSize: number
  total: number
  onChange: (page: number) => void
}

interface FaucetTableItemProps {
  record: {
    exportUrl: string
    claimTime: any
  }
}

const PAGE = 'page'
const PAGE_SIZE = 'pageSize'

const FaucetTableHeader = () => {
  return (
    <div className="headline-s grid grid-cols-2 gap-8 border-neutral-200 border-b-[1px] pb-4 text-primary-neutral">
      <div>Transaction</div>
      <div>Timestamp</div>
    </div>
  )
}

const FaucetTableItem: React.FC<FaucetTableItemProps> = ({ record }) => {
  return (
    <div className="body-s grid grid-cols-2 items-center gap-8 pt-3 text-secondary-neutral sm:pt-4">
      <div>
        <Link
          href={record.exportUrl}
          target="_blank"
          className="flex items-center gap-3"
        >
          <div className="pr-0">View on explorer</div>
          <FiExternalLink size={16} />
        </Link>
      </div>
      <div className="hidden sm:block">
        {dayjs(record.claimTime).format('MMM. D, YYYY hh:mm:ss A')}
      </div>
      <div className="sm:hidden">
        <p>{dayjs(record.claimTime).format('MMM. D, YYYY')}</p>
        <p>{dayjs(record.claimTime).format('hh:mm:ss A')}</p>
      </div>
    </div>
  )
}

const FaucetTable: React.FC<FaucetTableProps> = ({ faucetInfo }) => {
  const chainId = faucetInfo.chainId.toString()
  const [curpage, setCurPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const { data: faucetsRecordInfo, refetch } = useSuspenseQuery({
    queryKey: useListFaucetsClaimRecordByChainIdQuery.getKey({
      chainId,
      page: curpage,
    }),
    queryFn: useListFaucetsClaimRecordByChainIdQuery.fetcher({
      page: curpage,
      limit: pageSize,
      chainId,
    }),
  })

  const total = faucetsRecordInfo.listFaucetsClaimRecordByChainId.total

  const OnPagechange = (page: number) => {
    const params = new URLSearchParams()
    params.set(PAGE, page.toString())
    params.set(PAGE_SIZE, pageSize.toString())
    replace(`${pathname}?${params.toString()}`)
    setCurPage(page)
  }

  useEffect(() => {
    const page = searchParams.get(PAGE)
    const pageSize = searchParams.get(PAGE_SIZE)

    if (page && pageSize) {
      setCurPage(Number(page))
      setPageSize(Number(pageSize))
    }
  }, [searchParams])

  return (
    <>
      <FaucetInfoInput faucetInfo={faucetInfo} refresh={refetch} />
      <div className="py-8">
        <div className="mb-4 rounded-xl border border-neutral-300 p-3 sm:p-4 ">
          {/* header */}
          <FaucetTableHeader />
          {/* body */}

          {total > 0 ? (
            faucetsRecordInfo?.listFaucetsClaimRecordByChainId.data?.map(
              (record, index) => {
                return <FaucetTableItem key={index} record={record} />
              },
            )
          ) : (
            <div className="pt-4 text-center">No results</div>
          )}

          {/* footer */}
        </div>
        {total > pageSize && (
          <Pagination
            total={total}
            page={curpage}
            limit={pageSize}
            onPageChange={(page: number) => {
              OnPagechange(page)
            }}
          />
        )}
      </div>
    </>
  )
}

export const FaucetEmptyTable = () => {
  return (
    <div className="py-8">
      <div className="mb-4 rounded-xl border border-neutral-300 p-3 sm:p-4 ">
        {/* header */}
        <FaucetTableHeader />
        {/* body */}
        <div className="pt-4 text-center">No results</div>
      </div>
    </div>
  )
}

export default FaucetTable
