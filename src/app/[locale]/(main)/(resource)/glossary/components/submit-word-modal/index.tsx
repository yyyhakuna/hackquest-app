import { Link } from '@/app/navigation'
import { useCreateCustomKeywordMutation } from '@/graphql/generated/hooks'
import { CustomKeywordType } from '@/service/common/type'
import { useUser } from '@/store/user'
import { Button } from '@hackquest/ui/shared/button'
import { Dialog, DialogContent, DialogTitle } from '@hackquest/ui/shared/dialog'
import { Input } from '@hackquest/ui/shared/input'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import type React from 'react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { HACKQUEST_DISCORD } from '../../constants/data'

type SubmitWordModalProp = {
  open: boolean
  onClose: VoidFunction
}

const SubmitWordModal: React.FC<SubmitWordModalProp> = ({ open, onClose }) => {
  const t = useTranslations()
  const [keyword, setKeyword] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const currentUser = useUser()
  const { mutate, isPending: loading } = useCreateCustomKeywordMutation({
    onSuccess: () => {
      setIsSuccess(true)
    },
    onError: (err: string) => {
      toast.error(err)
    },
  })
  useEffect(() => {
    if (!open) {
      setIsSuccess(false)
      setKeyword('')
    }
  }, [open])
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="wap:h-screen wap:w-screen p-6 sm:h-[24.625rem] sm:w-[28.75rem]">
        <div className="flex flex-col items-center wap:justify-between gap-8">
          {!isSuccess ? (
            <>
              <div className="flex w-full flex-col items-center gap-8">
                <DialogTitle>{t('Glossary.requestGlossary')}</DialogTitle>
                <div className="w-full">
                  <p className="body-s mb-2 text-neutral-600">
                    {t('Glossary.submitQuestion')}
                  </p>
                  <Input
                    value={keyword}
                    onChange={e => {
                      setKeyword(e.target.value)
                    }}
                  />
                </div>
              </div>

              <div className="flex w-full flex-col items-center gap-8">
                <div className="headline-s flex w-full items-center justify-between rounded-2xl border-[2px] border-neutral-200 p-4 text-neutral-800">
                  <div className="flex-1">
                    <p>{t('Glossary.stayUpdated')}</p>
                    <Link href={HACKQUEST_DISCORD} target="_blank">
                      <p className="mt-[8px] text-blue-700">{`${t('Glossary.join')} Discord`}</p>
                    </Link>
                  </div>
                  <Image
                    src={'/images/glossary/join_discord.png'}
                    alt={'join-tip'}
                    width={55}
                    height={55}
                  />
                </div>
                <Button
                  className="w-full"
                  disabled={!keyword}
                  onClick={() =>
                    mutate({
                      data: {
                        keyword,
                        type: CustomKeywordType.GLOSSARY,
                        userId: currentUser?.id || '',
                      },
                    })
                  }
                  loading={loading}
                >
                  {t('Common.buttonText.submit')}
                </Button>
              </div>
            </>
          ) : (
            <div className="flex h-full flex-col ">
              <div className="flex flex-1 flex-col items-center justify-center gap-4">
                <Image
                  src={'/images/glossary/submit_success.png'}
                  alt={'submit-success'}
                  width={64}
                  height={64}
                />
                <p className="title-3 text-neutral-800">
                  {t('Glossary.submitResponse')}
                </p>
                <p className='body-s text-center text-neutral-500'>
                  {t('Glossary.submitResponseText')}
                </p>
              </div>

              <Button
                className="w-full border border-neutral-600 bg-transparent"
                onClick={onClose}
              >
                {' '}
                {t('Common.buttonText.close')}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SubmitWordModal
