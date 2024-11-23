import {
  GrowthFilter,
  GrowthType,
  type HackathonExtend,
  SortOrder,
} from '@/graphql/generated/hooks'
import { isUUID } from '@/lib/is'
import type { Table } from '@tanstack/react-table'
import { stringify } from 'csv-stringify'
import toast from 'react-hot-toast'
import type { ApplicationPayment } from '../constant'

export const parseEquals = (status: string) => {
  switch (status) {
    case 'Approve':
      return 'approved'
    case 'Decline':
      return 'decline'
    case 'Waitlist':
      return 'waiting'
    default:
      return 'pending'
  }
}

export const exportToCsv = (data: Record<string, any>[], name = '未命名') => {
  const columns: string[] = []
  data.forEach(item => {
    for (const key in item) {
      if (!~columns.indexOf(key)) {
        columns.push(key)
      }
    }
  })
  stringify(data, { header: true, columns }, (err: any, output: any) => {
    if (err) {
      toast.error(err.message)
      return
    }
    // 创建一个 Blob 对象
    const blob = new Blob([output], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `${name}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  })
}

export const applicationMultipleExport = (
  table: Table<ApplicationPayment>,
  hackathon: HackathonExtend,
) => {
  const rows = table.getSelectedRowModel().rows
  if (!rows.length) return
  exportToCsv(
    rows.map(obj => {
      const { project } = obj.original

      const res: Record<string, string> = {}
      Object.entries(project?.info?.About).map(([k, v]) => {
        if (isUUID(k)) {
          const key = hackathon?.info?.application?.About?.find((obj: any) => {
            return obj.id === k
          })?.property?.label
          res[key] = v as string
        } else {
          res[k] = v as string
        }
      })
      Object.entries(project?.info?.OnlineProfiles).map(([k, v]) => {
        if (isUUID(k)) {
          const key = hackathon?.info?.application?.OnlineProfiles?.find(
            (obj: any) => {
              return obj.id === k
            },
          )?.property?.label
          res[key] = v as string
        } else {
          res[k] = v as string
        }
      })
      Object.entries(project?.info?.Contact).map(([k, v]) => {
        if (isUUID(k)) {
          const key = hackathon?.info?.application?.Contact?.find(
            (obj: any) => {
              return obj.id === k
            },
          )?.property?.label
          res[key] = v as string
        } else {
          res[k] = v as string
        }
      })
      return res
    }),
  )
}

export const parseGrowthFilter = (filter: string) => {
  switch (filter) {
    case 'Page View':
      return GrowthFilter
    case 'Decline':
      return 'decline'
    case 'Waitlist':
      return 'waiting'
    default:
      return 'pending'
  }
}

export const parseGrowthType = (type: string) => {
  switch (type) {
    case 'Submission':
      return GrowthType.Submiision
    case 'Winnners':
      return GrowthType.Winner
    case 'Registration':
      return GrowthType.Registration
    default:
      return GrowthType.PageView
  }
}

export const parseOrderBy = (orderBy: string) => {
  switch (orderBy) {
    case 'a-z':
      return { name: SortOrder.Asc }
    case 'z-a':
      return { name: SortOrder.Desc }
    case 'latest':
      return { createdAt: SortOrder.Desc }
    default:
      return { createdAt: SortOrder.Asc }
  }
}
