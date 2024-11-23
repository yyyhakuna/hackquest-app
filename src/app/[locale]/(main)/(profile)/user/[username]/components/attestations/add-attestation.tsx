import { Button } from '@hackquest/ui/shared/button'
import { DialogFooter } from '@hackquest/ui/shared/dialog'
import { Label } from '@hackquest/ui/shared/label'
import { RadioCards, RadioCardsItem } from '@hackquest/ui/shared/radio-cards'
import { Textarea } from '@hackquest/ui/shared/textarea'
import toast from 'react-hot-toast'
import { LuArrowRight } from 'react-icons/lu'
import { TbTriangleFilled, TbTriangleInvertedFilled } from 'react-icons/tb'
import { useAttestationStore } from '../../utils/store'

export function AddAttestation() {
  const { state, setState, setStep } = useAttestationStore()

  function onValid() {
    if (!state.attest) {
      toast.error('Please select attest')
      return
    }
    setStep(2)
  }

  return (
    <div className="flex flex-1 flex-col gap-6 max-sm:mt-4">
      <RadioCards
        value={state?.attest?.toString()}
        onValueChange={value => setState({ attest: value === 'true' })}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        <RadioCardsItem
          value="true"
          className="flex h-16 items-center justify-start gap-4 p-3 data-[state=checked]:border-success-600 data-[state=checked]:bg-success-100 data-[state=checked]:font-normal"
        >
          <div className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-success-100">
            <TbTriangleFilled className="size-3 text-success-600" />
          </div>
          <div className="space-y-1 text-left">
            <h4 className="headline-s ">Attest True</h4>
            <p className="body-xs whitespace-nowrap text-secondary-neutral">
              Share good comments
            </p>
          </div>
        </RadioCardsItem>
        <RadioCardsItem
          value="false"
          className="flex h-16 items-center justify-start gap-4 p-3 data-[state=checked]:border-destructive-600 data-[state=checked]:bg-destructive-100 data-[state=checked]:font-normal"
        >
          <div className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-destructive-100">
            <TbTriangleInvertedFilled className="size-3 text-destructive-600" />
          </div>
          <div className="space-y-1 text-left">
            <h4 className="headline-s">Attest False</h4>
            <p className="body-xs whitespace-nowrap text-secondary-neutral">
              Share bad comments
            </p>
          </div>
        </RadioCardsItem>
      </RadioCards>
      <section className="space-y-1">
        <Label className="body-s text-neutral-600">
          Add comment (Optional)
        </Label>
        <Textarea
          placeholder="Add a comment"
          value={state?.comment}
          onChange={e => setState({ comment: e.target.value })}
          rows={4}
        />
      </section>
      <DialogFooter className="max-sm:pt-6 max-sm:pb-10">
        <Button onClick={onValid}>
          Continue
          <LuArrowRight className="icon-hover-translate size-4" />
        </Button>
      </DialogFooter>
    </div>
  )
}
