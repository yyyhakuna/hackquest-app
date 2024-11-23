import { useControllableState } from '@hackquest/ui/lib/use-controllable-state'
import { cn } from '@hackquest/ui/lib/utils'
import { CheckboxPrimitive } from '@hackquest/ui/shared/checkbox'
import * as React from 'react'

interface SelectableCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode
  defaultChecked?: boolean
  checked?: boolean
  disabled?: boolean
  onCheckedChange?: (checked: boolean) => void
  optional?: boolean
  defaultOptional?: boolean
  onOptionalChange?: (optional: boolean) => void
}

const SelectableCard = React.forwardRef<HTMLDivElement, SelectableCardProps>(
  (
    {
      label,
      defaultChecked,
      checked,
      disabled,
      onCheckedChange,
      optional,
      defaultOptional,
      onOptionalChange,
      className,
      ...rest
    },
    forwardRef,
  ) => {
    const [checkedState = false, setCheckedState] = useControllableState({
      prop: checked,
      defaultProp: defaultChecked,
      onChange: onCheckedChange,
    })

    const [optionalState = false, setOptionalState] = useControllableState({
      prop: optional,
      defaultProp: defaultOptional,
      onChange: onOptionalChange,
    })

    return (
      <div
        ref={forwardRef}
        role="checkbox"
        aria-checked={checkedState}
        aria-disabled={disabled}
        data-state={checkedState ? 'checked' : 'unchecked'}
        onClick={() => !disabled && setCheckedState(!checkedState)}
        className={cn(
          'group flex h-12 cursor-pointer items-center justify-center gap-2.5 rounded-xl border border-neutral-300 p-2.5 transition-colors duration-300 aria-disabled:cursor-not-allowed aria-disabled:border-primary aria-disabled:bg-primary-50 aria-disabled:font-bold aria-disabled:text-neutral-400 data-[state=checked]:border-primary-500 data-[state=checked]:bg-primary-50 data-[state=checked]:font-bold data-[state=checked]:text-primary-neutral',
          !disabled && 'hover:bg-neutral-100 hover:text-primary-neutral',
          className,
        )}
        {...rest}
      >
        {checkedState && !disabled && (
          <CheckboxPrimitive.Root
            checked={!optionalState}
            onClick={event => event.stopPropagation()}
            onCheckedChange={(checked: boolean) => setOptionalState(!checked)}
            className="size-6 shrink-0 rounded border border-neutral-300 bg-neutral-white"
          >
            <CheckboxPrimitive.Indicator className="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="text-primary-neutral"
              >
                <g clipPath="url(#clip0_3449_35548)">
                  <path
                    d="M9.59032 2.45458C9.49554 2.39986 9.39092 2.36435 9.28242 2.35006C9.17392 2.33578 9.06367 2.343 8.95797 2.37133C8.85226 2.39965 8.75317 2.44852 8.66635 2.51514C8.57953 2.58176 8.50668 2.66483 8.45196 2.7596L4.2853 9.97648C4.17479 10.1679 4.14484 10.3953 4.20204 10.6088C4.25925 10.8223 4.39891 11.0043 4.59032 11.1148C4.78172 11.2253 5.00918 11.2553 5.22267 11.1981C5.43615 11.1409 5.61816 11.0012 5.72867 10.8098L9.89534 3.59293C10.0058 3.40153 10.0358 3.17407 9.97859 2.96058C9.92138 2.7471 9.78172 2.56508 9.59032 2.45458ZM4.73188 2.53631C4.54048 2.64681 4.40082 2.82882 4.34361 3.0423C4.28641 3.25577 4.31635 3.48323 4.42685 3.67463L8.59333 10.8914C8.70462 11.0812 8.88648 11.2194 9.09922 11.2756C9.31197 11.3319 9.53833 11.3017 9.7289 11.1917C9.91948 11.0816 10.0588 10.9007 10.1165 10.6883C10.1741 10.476 10.1454 10.2494 10.0367 10.0581L5.8702 2.84134C5.7597 2.64994 5.57769 2.51028 5.36421 2.45307C5.15073 2.39587 4.92328 2.42581 4.73188 2.53631ZM2.08504 6.78743C2.08505 7.00844 2.17285 7.22039 2.32912 7.37667C2.4854 7.53294 2.69736 7.62073 2.91836 7.62074L11.2522 7.62105C11.4723 7.61958 11.6828 7.53114 11.8379 7.37502C11.993 7.2189 12.08 7.00778 12.08 6.78772C12.08 6.56766 11.993 6.35654 11.8379 6.20043C11.6828 6.04431 11.4723 5.95587 11.2522 5.95442L2.91834 5.95411C2.69734 5.95411 2.48538 6.04191 2.32911 6.19819C2.17284 6.35447 2.08504 6.56642 2.08504 6.78743Z"
                    fill="currentColor"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_3449_35548">
                    <rect
                      width="10"
                      height="10"
                      fill="white"
                      transform="matrix(-0.866025 -0.5 -0.5 0.866025 14 5)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </CheckboxPrimitive.Indicator>
          </CheckboxPrimitive.Root>
        )}
        <div className="body-s flex max-w-full items-center">
          <span className="truncate">{label}</span>
          {(disabled || !optionalState) && '*'}
        </div>
      </div>
    )
  },
)

export { SelectableCard }
