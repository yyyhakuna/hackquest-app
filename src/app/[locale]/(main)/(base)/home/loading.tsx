import { Spinner } from '@hackquest/ui/shared/spinner'

export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Spinner />
    </div>
  )
}
