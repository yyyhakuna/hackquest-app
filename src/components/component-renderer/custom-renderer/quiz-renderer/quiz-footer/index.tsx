import { childRenderCallback } from '@/components/component-renderer'
import { LocalStorageKey } from '@/constants/enum'
import { Button } from '@hackquest/ui/shared/button'
import Image from 'next/image'
import type React from 'react'
import { useRef, useState } from 'react'
import SpendCoinModal from '../spend-coin-modal'

interface QuizFooterProp {
  showAnswer: boolean
  setShowAnswer: (showAnswer: boolean) => void
  onSubmit: VoidFunction
  submitDisable?: boolean
  showHint: boolean
  lessonId: string
  includeHint: boolean
  setShowHint: (showHint: boolean) => void
  isCompleted: boolean
  quiz: any
}

const QuizFooter: React.FC<QuizFooterProp> = ({
  showAnswer,
  setShowAnswer,
  onSubmit,
  showHint,
  setShowHint,
  includeHint,
  lessonId,
  isCompleted,
  submitDisable = false,
  quiz,
}) => {
  const [open, setOpen] = useState(false)
  const firstShowAnswer = useRef(true)
  // const { updateUserCoin } = useGetMissionData();
  // const { runAsync } = useRequest(
  //   () => {
  //     return webApi.courseApi.showAnswerCostCoin(lessonId);
  //   },
  //   {
  //     manual: true,
  //     onError(err) {
  //       errorMessage(err);
  //     }
  //   }
  // );

  const isCostCoin = firstShowAnswer.current && !showAnswer && !isCompleted

  const showAnswerHandle = async () => {
    if (!showHint && includeHint) {
      setShowHint(true)
      return
    }
    if (isCostCoin) {
      const showCostCoinModal = window.localStorage.getItem(
        LocalStorageKey.ShowAnswerCostCoinModal,
      )
      const show = !showCostCoinModal || showCostCoinModal === 'show'
      if (show) {
        setOpen(true)
        return
      }
      try {
        // await runAsync();
        // await updateUserCoin();
        // firstShowAnswer.current = false;
        setShowAnswer(!showAnswer)
      } catch (_err) {
        // errorMessage(err);
      }
    } else {
      setShowAnswer(!showAnswer)
    }
  }

  const onConfirm = () => {
    setShowAnswer(!showAnswer)
    setOpen(false)
  }
  const submit = () => {}
  // const { run: submit, loading } = useRequest(
  //   async () => {
  //     return onSubmit();
  //   },
  //   {
  //     manual: true
  //   }
  // );
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        {/* <Button>
          <span>Try again</span>
          <FiRefreshCw />
        </Button> */}
        <Button
          disabled={submitDisable}
          loading={false}
          onClick={() => submit()}
        >
          Check Answer
        </Button>
        <Button
          variant={'outline'}
          color={'neutral'}
          className="flex"
          onClick={showAnswerHandle}
        >
          {showAnswer && <span>Hide Answer</span>}
          {(!includeHint || showHint) && !showAnswer && (
            <span className="flex gap-[2px]">
              <span className="">Show Answer</span>
              {isCostCoin && (
                <span className="flex gap-px no-underline">
                  {`(-10 `}
                  <Image
                    src={'/images/layout/coin.png'}
                    alt={'coin'}
                    width={16}
                    height={16}
                    className="w-[1.25rem] flex-shrink-0 rounded-[50%]"
                  />
                  {`)`}
                </span>
              )}
            </span>
          )}
          {includeHint && !showHint && !showAnswer && (
            <span className="">Show Hint</span>
          )}
        </Button>
        <SpendCoinModal
          open={open}
          coin={10}
          onOpenChange={setOpen}
          onConfirm={onConfirm}
        />
      </div>
      {showHint && quiz.hint && (
        <div className="flex items-center gap-2">
          <div className="headline-xs rounded-lg bg-tag-blue px-2 py-1 text-neutral-800">
            Hint
          </div>
          {quiz.hint.children.map(childRenderCallback(quiz.hint!))}
        </div>
      )}
      <div className="body-s cursor-pointer text-neutral-500">
        Found a bug?{' '}
        <span className="headline-s text-primary-link">Report</span>
      </div>
    </div>
  )
}

export default QuizFooter
