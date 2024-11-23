import type React from 'react'

interface FilterTrackProp {
  tracks: string[]
  trackClick: (track: string) => void
  filterTracks: string[]
}

const FilterTrack: React.FC<FilterTrackProp> = ({
  trackClick,
  tracks,
  filterTracks,
}) => {
  return (
    <div className="mt-4 hidden sm:container sm:block">
      <div className='flex flex-wrap gap-[.375rem] border-neutral-200 border-b pb-4 text-neutral-800'>
        {filterTracks.map(v => (
          <div
            key={v}
            onClick={() => trackClick(v)}
            className={`headline-s cursor-pointer whitespace-nowrap rounded-[.5rem] px-3 py-2 hover:bg-blue-50 ${~tracks.indexOf(v) ? 'bg-blue-100' : ''}`}
          >
            {v}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FilterTrack
