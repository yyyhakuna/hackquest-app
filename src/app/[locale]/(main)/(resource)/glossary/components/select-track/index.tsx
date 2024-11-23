import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@hackquest/ui/shared/select'
import type React from 'react'
import { useMemo } from 'react'

type SelectTrackProp = {
  tracks: string[]
  trackClick: (track: string) => void
  filterTracks: string[]
}

const SelectTrack: React.FC<SelectTrackProp> = ({ tracks, trackClick, filterTracks }) => {
  const selects = useMemo(() => {
    return filterTracks?.map(v => ({
      label: v,
      value: v,
    }))
  }, [filterTracks])
  return (
    <div className='mt-4 px-6 sm:hidden'>
      <Select onValueChange={trackClick} value={tracks[0]}>
        <SelectTrigger className="w-[11.25rem]">
          <SelectValue placeholder="Select a track" />
        </SelectTrigger>
        <SelectContent>
          {selects.map(v => (
            <SelectItem key={v.value} value={v.value}>
              {v.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default SelectTrack
