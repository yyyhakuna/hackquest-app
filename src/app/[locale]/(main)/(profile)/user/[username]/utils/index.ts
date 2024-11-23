import dayjs from '@/lib/dayjs'

export function calcExperience(startDate: string, endDate?: string) {
  const start = dayjs(startDate)
  const end = endDate ? dayjs(endDate) : dayjs()

  const years = end.diff(start, 'year')
  const months = end.diff(start.add(years, 'year'), 'month')

  if (years === 0) {
    return `${months} mos`
  } else {
    return `${years} yr ${months} mos`
  }
}

export function formatExperienceDates(startDate: string, endDate?: string) {
  const start = dayjs(startDate)

  const startYear = start.format('YYYY')
  const startMonth = start.format('MMMM')

  let endYear = ''
  let endMonth = ''

  if (endDate) {
    const end = dayjs(endDate)
    endYear = end.format('YYYY')
    endMonth = end.format('MMMM')
  }

  return {
    startYear,
    startMonth,
    endYear,
    endMonth,
  }
}

const gradeRanges: Record<string, [number, number]> = {
  S: [95, 100],
  'A+': [90, 95],
  A: [80, 90],
  'A-': [70, 80],
  'B+': [60, 70],
  B: [50, 60],
  'B-': [40, 50],
  C: [0, 40],
}

export function calculateGrade(score?: number) {
  if (!score) return 'C'
  for (const grade in gradeRanges) {
    const [min, max] = gradeRanges[grade] as [number, number]
    if (score >= min && score <= max) {
      return grade
    }
  }
  return 'C'
}
