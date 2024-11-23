export const parseWhere = (cate: string) => {
  switch (cate) {
    case 'Upcoming':
      return {
        startTime: {
          gte: new Date(),
        },
      }

    case 'Ongoing':
      return {
        startTime: {
          lte: new Date(),
        },
        endTime: {
          gte: new Date(),
        },
      }
    case 'Past':
      return {
        endTime: {
          lte: new Date(),
        },
      }

    default:
      return {}
  }
}

const parseOrder = (order: string) => {
  if (order === 'newest')
    return [
      {
        startTime: 'desc',
      },
    ]
  else return {}
}

export const parseParams = (params: Record<string, any>) => ({
  page: Number(params.page) || 1,
  limit: 12,
  where: parseWhere(params.category),
  orderBy: parseOrder(params.orderby),
})
