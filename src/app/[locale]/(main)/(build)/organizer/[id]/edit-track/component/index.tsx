import { Button } from '@hackquest/ui/shared/button'
import { Checkbox } from '@hackquest/ui/shared/checkbox'
import { useTranslations } from 'next-intl'
import { FiCopy } from 'react-icons/fi'
import { IoAdd } from 'react-icons/io5'
import Back from './back'

const EditPage = () => {
  const t = useTranslations('HackathonOrganizer.manage')
  return (
    <div className='fixed top-0 left-0 h-full w-full overflow-auto bg-neutral-100'>
      <Back />
      <div className='m-auto w-[57%] space-y-8 rounded-3xl bg-neutral-white p-8'>
        <span>{t('web3Track')}</span>
        <div className='flex gap-[10px] rounded-2xl border-2 border-neutral-200 p-8'>
          <div className="space-y-3">
            <div className='title-1 text-center text-primary-neutral'>
              110,000 USD
            </div>
            <div className='body-s text-center text-secondary-neutral'>
              {t('web3Track')}
            </div>
          </div>
          <div className='h-auto w-[1px] bg-neutral-200' />
          <div className="flex flex-1 flex-col">
            <div className='flex flex-1 justify-between'>
              <span className="body-m text-secondary-neutral">first Place</span>
              <span className="body-l text-primary-neutral">5,000USD</span>
            </div>
            <div className='flex flex-1 justify-between'>
              <span className="body-m text-secondary-neutral">first Place</span>
              <span className="body-l text-primary-neutral">5,000USD</span>
            </div>
            <div className='flex flex-1 justify-between'>
              <span className="body-m text-secondary-neutral">first Place</span>
              <span className="body-l text-primary-neutral">5,000USD</span>
            </div>
            <div className='flex flex-1 justify-between'>
              <span className="body-m text-secondary-neutral">first Place</span>
              <span className="body-l text-primary-neutral">5,000USD</span>
            </div>
          </div>
        </div>
        <div>
          <span className='body-s mb-8 text-neutral-600'>
            {t('prizeTrack')}
          </span>
          <div className='rounded-2xl border border-neutral-300 p-6'>
            <span className="">{t('web3PrizeTrack')}</span>
            <div className="mt-6 mb-4">
              <div className="flex justify-between">
                <span className="body-s text-neutral-600">
                  {t('judgingCriteriaForTrack')}*
                </span>
                <span className="body-xs text-secondary-neutral">360/360</span>
              </div>
              <div className='mt-[10px] rounded-md border border-neutral-300 p-2'>
                <span className="body-s text-primary-neutral ">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos,
                  voluptatum aperiam dolorem velit illo inventore quod maxime
                  voluptatibus minus, rerum voluptate tempora quia assumenda
                  quasi sed repellat deserunt enim debitis?
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <span className="body-s text-neutral-600">
                {t('judgingMode')}*
              </span>
              <div className="body-xs text-secondary-neutral">
                The 'Users + Judges' category can be applied to only one track
                in this hackathon.
              </div>
              <div className="flex w-full gap-3">
                <Button className='flex-1 border border-primary bg-primary-100'>
                  {t('userAndJudges')}
                </Button>
                <Button className='flex-1 border border-neutral-300 bg-neutral-white'>
                  {t('judgesOnly')}
                </Button>
              </div>
              <div className="flex gap-2">
                <Checkbox />
                <span className="body-xs text-secondary-neutral ">
                  We are not going to use HackQuest voting and judging system
                  for this track
                </span>
              </div>
            </div>
            <div className="my-6 h-[1px] bg-neutral-300" />
            <div className="space-y-2">
              <span className="body-s text-neutral-600">
                {t('votingMode')}*
              </span>
              <div className="body-xs text-secondary-neutral">
                Only ‘Fixed Number of Vote’ is available to ‘Users + Judges’
                category.
              </div>
              <div className="rounded-xl border-primary bg-primary-100 p-[10px]">
                <div className='headline-s text-center text-primary-neutral'>
                  Fixed Number of Vote
                </div>
                <div className='body-xs m-auto w-[42%] text-center text-secondary-neutral'>
                  Each user/judge has a certain number of votes to distribute
                  among the projects
                </div>
              </div>
            </div>
            <div className="mt-6 mb-4">
              <span className="body-s text-neutral-600">
                {t('fixedNumberOfVote')}*
              </span>
              <div className='mt-4 flex flex-wrap gap-3'>
                <div className=' basis-[calc(50%-6px)] rounded-xl border border-neutral-300 p-6'>
                  <div className='headline-l text-center text-primary-neutral'>
                    Judge-Centric
                  </div>
                  <div className='my-4 h-[1px] bg-neutral-300' />
                  <div className="space-y-3">
                    <div>
                      <span className="body-s text-neutral-600">
                        Total Users Votes:
                      </span>
                      <span className="body-m text-primary-neutral">1200</span>
                    </div>
                    <div>
                      <span className="body-s text-neutral-600">
                        Total Users Votes:
                      </span>
                      <span className="body-m text-primary-neutral">1200</span>
                    </div>
                  </div>
                  <div className='my-4 h-[1px] bg-neutral-300' />
                  <Button className="w-full">Apply</Button>
                </div>
                <div className=' basis-[calc(50%-6px)] rounded-xl border border-neutral-300 p-6'>
                  <div className='headline-l text-center text-primary-neutral'>
                    Judge-Centric
                  </div>
                  <div className='my-4 h-[1px] bg-neutral-300' />
                  <div className="space-y-3">
                    <div>
                      <span className="body-s text-neutral-600">
                        Total Users Votes:
                      </span>
                      <span className="body-m text-primary-neutral">1200</span>
                    </div>
                    <div>
                      <span className="body-s text-neutral-600">
                        Total Users Votes:
                      </span>
                      <span className="body-m text-primary-neutral">1200</span>
                    </div>
                  </div>
                  <div className='my-4 h-[1px] bg-neutral-300' />
                  <Button className="w-full">Apply</Button>
                </div>
                <div className=' basis-[calc(50%-6px)] rounded-xl border border-neutral-300 p-6'>
                  <div className='headline-l text-center text-primary-neutral'>
                    Judge-Centric
                  </div>
                  <div className='my-4 h-[1px] bg-neutral-300' />
                  <div className="space-y-3">
                    <div>
                      <span className="body-s text-neutral-600">
                        Total Users Votes:
                      </span>
                      <span className="body-m text-primary-neutral">1200</span>
                    </div>
                    <div>
                      <span className="body-s text-neutral-600">
                        Total Users Votes:
                      </span>
                      <span className="body-m text-primary-neutral">1200</span>
                    </div>
                  </div>
                  <div className='my-4 h-[1px] bg-neutral-300' />
                  <Button className="w-full">Apply</Button>
                </div>
                <div className=' basis-[calc(50%-6px)] rounded-xl border border-neutral-300 p-6'>
                  <div className='headline-l text-center text-primary-neutral'>
                    Judge-Centric
                  </div>
                  <div className='my-4 h-[1px] bg-neutral-300' />
                  <div className="space-y-3">
                    <div>
                      <span className="body-s text-neutral-600">
                        Total Users Votes:
                      </span>
                      <span className="body-m text-primary-neutral">1200</span>
                    </div>
                    <div>
                      <span className="body-s text-neutral-600">
                        Total Users Votes:
                      </span>
                      <span className="body-m text-primary-neutral">1200</span>
                    </div>
                  </div>
                  <div className='my-4 h-[1px] bg-neutral-300' />
                  <Button className="w-full">Apply</Button>
                </div>
              </div>
            </div>
            <div>
              <div className=" body-s text-neutral-600">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla,
                accusamus!
              </div>
              <div className='body-xs my-2 text-secondary-neutral'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Delectus.
              </div>
              <div className="flex flex-wrap gap-3">
                <Button className="basis-[calc(33.33%-8px)]">
                  Senior Users
                </Button>
                <Button className="basis-[calc(33.33%-8px)]">
                  Senior Users
                </Button>
                <Button className="basis-[calc(33.33%-8px)]">
                  Senior Users
                </Button>
                <Button className="basis-[calc(33.33%-8px)]">
                  Senior Users
                </Button>
                <Button className="basis-[calc(33.33%-8px)]">
                  Senior Users
                </Button>
              </div>
            </div>
            <div className="mt-6">
              <div className="body-s text-neutral-600">
                Lorem, ipsum dolor. Vote
              </div>
              <div className='body-s my-2 text-neutral-600'>
                Lorem, ipsum. (3)
              </div>
              <div className="space-y-[15px]">
                <div className='space-y-2 rounded-xl border border-neutral-300 p-4'>
                  <div className='flex items-center gap-2'>
                    <img
                      src="/images/events/events_banner.png"
                      alt=""
                      className='h-8 w-8 rounded-full object-cover'
                    />
                    <span className="headline-m text-primary-neutral">
                      RAIN FROM CD
                    </span>
                  </div>
                  <div>
                    <span className="body-s text-neutral-600">Account: </span>
                    <span className='headline-s mr-12 text-primary-neutral'>
                      RAIN FROM CD@gmail
                    </span>
                    <span className="body-s text-neutral-600">Password: </span>
                    <span className=' headline-s text-primary-neutral'>
                      666666
                    </span>
                  </div>
                  <Button variant="outline" color="neutral" className="w-full">
                    {t('copyAccount')} <FiCopy />{' '}
                  </Button>
                </div>
                <div className='space-y-2 rounded-xl border border-neutral-300 p-4'>
                  <div className='flex items-center gap-2'>
                    <img
                      src="/images/events/events_banner.png"
                      alt=""
                      className='h-8 w-8 rounded-full object-cover'
                    />
                    <span className="headline-m text-primary-neutral">
                      RAIN FROM CD
                    </span>
                  </div>
                  <div>
                    <span className="body-s text-neutral-600">Account: </span>
                    <span className='headline-s mr-12 text-primary-neutral'>
                      RAIN FROM CD@gmail
                    </span>
                    <span className="body-s text-neutral-600">Password: </span>
                    <span className=' headline-s text-primary-neutral'>
                      666666
                    </span>
                  </div>
                  <Button variant="outline" color="neutral" className="w-full">
                    {t('copyAccount')} <FiCopy />{' '}
                  </Button>
                </div>
                <Button className="w-full">
                  <IoAdd /> {t('judgeAccount')}
                </Button>
              </div>
            </div>
          </div>
          <Button className='mt-8 w-full'>{t('submitprizeTrack')}</Button>
        </div>
      </div>
    </div>
  )
}

export default EditPage
