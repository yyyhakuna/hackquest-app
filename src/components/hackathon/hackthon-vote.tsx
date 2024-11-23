import { Input } from '@hackquest/ui/shared/input'
import React, { useEffect } from 'react'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

interface HackathonVoteProp {
  value: number
  maxValue: number
  initValue: number
  onChange: (value: number) => void
}

const HackathonVote: React.FC<HackathonVoteProp> = ({
  value,
  maxValue,
  initValue,
  onChange,
}) => {
  const [vote, setVote] = React.useState(initValue)

  const changeVote = (vote: number) => {
    if (vote < 0) {
      vote = 0
    }
    if (vote > maxValue) {
      vote = maxValue
    }
    setVote(vote)
    onChange(vote)
  }
  useEffect(() => {
    setVote(value)
  }, [value])
  return (
    <div className="flex h-[3rem] w-full gap-[.375rem]">
      <div
        className={`body-l flex h-[3rem] w-[3rem] flex-shrink-0 items-center justify-center rounded-[50%] border border-neutral-200 ${vote > 0 ? 'cursor-pointer text-neutral-800' : 'cursor-not-allowed bg-neutral-100 text-neutral-500'}`}
        onClick={() => {
          if (!vote) return
          changeVote(vote - 1)
        }}
      >
        <FiChevronDown />
      </div>
      <Input
        className={`body-m h-full flex-1 flex-shrink-0 ${vote !== initValue ? 'bg-primary-100' : ''}`}
        inputClassName="w-full text-center"
        value={vote}
        onChange={e => {
          const value = e.target.value
          if (!/^\d*$/.test(value)) return
          const val = value === '' ? 0 : Number(value)
          changeVote(val)
        }}
        onBlur={e => {
          if (!e.target.value) {
            changeVote(initValue)
          }
        }}
      />

      <div
        className={`body-l flex h-[3rem] w-[3rem] flex-shrink-0 items-center justify-center rounded-[50%] border border-neutral-200 ${vote < maxValue ? 'cursor-pointer text-neutral-800' : 'cursor-not-allowed bg-neutral-100 text-neutral-500 '}`}
        onClick={() => {
          if (vote >= maxValue) return
          changeVote(vote + 1)
        }}
      >
        <FiChevronUp />
      </div>
    </div>
  )
}

export default HackathonVote
