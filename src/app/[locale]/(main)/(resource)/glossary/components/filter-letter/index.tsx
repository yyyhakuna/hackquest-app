import type React from 'react'

export interface LetterDataType {
  label: string
  value: string
}
interface FilterLetterProp {
  letterData: LetterDataType[]
  letterClick: (letter: string) => void
  letter: string
}

const FilterLetter: React.FC<FilterLetterProp> = ({
  letterData,
  letterClick,
  letter,
}) => {
  return (
    <div className={`w-full bg-neutral-white py-[5px]`}>
      <div className="flex flex-wrap gap-[.9375rem] px-6 sm:container sm:gap-2">
        {letterData.map(tab => (
          <button
            role="tab"
            type="button"
            tabIndex={-1}
            aria-selected={tab.value === letter}
            data-state={tab.value === letter ? 'active' : 'inactive'}
            key={tab.value}
            onClick={() => letterClick(tab.value)}
            className={`body-s data-[state=active]:headline-s flex w-[calc((100%-5.625rem)/7)] items-center justify-center rounded-[.5rem] border-[.125rem] border-transparent bg-neutral-100 py-[.5rem] text-neutral-600 outline-none hover:bg-blue-50 data-[state=active]:border-blue-800 data-[state=active]:bg-blue-100 data-[state=active]:text-neutral-800 sm:w-8`}
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default FilterLetter
