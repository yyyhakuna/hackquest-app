export const creationBaseTabs = [
  {
    value: 'info',
    label: 'Info',
  },
  {
    value: 'timeline',
    label: 'Timeline',
  },
  {
    value: 'application',
    label: 'Application',
  },
  {
    value: 'qr',
    label: 'QR',
  },
  {
    value: 'todo',
    label: 'To Do',
  },
]

export type TablePament = {
  data: {
    name: string
    date: string
    location: string
    email: string
  }
}
