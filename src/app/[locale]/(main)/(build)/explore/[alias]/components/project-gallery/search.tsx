import { Button } from '@hackquest/ui/shared/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@hackquest/ui/shared/select'
import type React from 'react'
import { projectSorts } from '../../constants/data'

type Option = {
  label: string
  value: any
}
interface SearchProp {
  params: any
  changeParams: (params: any) => void
  clear: VoidFunction
  tracks: Option[]
  prizeTracks: Option[]
}

const Search: React.FC<SearchProp> = ({
  params,
  changeParams,
  clear,
  tracks,
  prizeTracks,
}) => {
  return (
    <div className="no-scrollbar mb-4 flex items-center justify-between overflow-auto border-neutral-200 border-b pb-6 sm:mb-6">
      <div className="flex gap-2">
        <Select
          value={params.rewardId}
          onValueChange={rewardId => {
            const prize = prizeTracks.find(v => v.value === rewardId)
            changeParams({
              prizeTrack: prize?.label,
              rewardId,
            })
          }}
        >
          <SelectTrigger className="headline-m border-none bg-neutral-100">
            <SelectValue placeholder={'Prize Track'} />
          </SelectTrigger>
          <SelectContent>
            {prizeTracks.map(v => (
              <SelectItem value={v.value} key={v.value}>
                {v.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={params.track}
          onValueChange={track => {
            changeParams({
              track,
            })
          }}
        >
          <SelectTrigger className="headline-m border-none bg-neutral-100">
            <SelectValue placeholder={'Sector'} />
          </SelectTrigger>
          <SelectContent>
            {tracks?.map(v => (
              <SelectItem value={v.value} key={v.value}>
                {v.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* <Select>
          <SelectTrigger className="headline-m border-none bg-neutral-100">
            <SelectValue placeholder={'Tech Stack'} />
          </SelectTrigger>
          <SelectContent>
            {prizeTracks.map(v => (
              <SelectItem value={v.value} key={v.value}>
                {v.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select> */}
      </div>
      <div className="flex gap-2">
        <Button variant="text" color={'neutral'} onClick={clear}>
          Clear all
        </Button>

        <Select
          value={params.sort}
          onValueChange={sort => {
            changeParams({
              sort,
            })
          }}
        >
          <SelectTrigger className="headline-m border-none bg-neutral-100">
            <SelectValue placeholder={'Sort By'} />
          </SelectTrigger>
          <SelectContent>
            {projectSorts.map(v => (
              <SelectItem value={v.value} key={v.value}>
                {v.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default Search
