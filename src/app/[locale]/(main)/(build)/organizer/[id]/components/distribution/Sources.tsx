import type {
  HackathonUtmExtend,
  ListOrganizerDistributionUtmSourcesQuery,
} from '@/graphql/generated/hooks'
import { Button } from '@hackquest/ui/shared/button'
import { Dialog, DialogTrigger } from '@hackquest/ui/shared/dialog'
import type { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import type React from 'react'
import { IoAddSharp } from 'react-icons/io5'
import UpdateSourceDialog from './update-source-dialog'

interface SourcesProp {
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<
    QueryObserverResult<ListOrganizerDistributionUtmSourcesQuery, Error>
  >
  utmSources: HackathonUtmExtend[]
}

const Sources: React.FC<SourcesProp> = ({ utmSources, refetch }) => {
  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex items-center justify-between">
        <div className="title-3 text-primary-neutral">UTM Sources</div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="">
              <IoAddSharp size={14} />
              Add A Source
            </Button>
          </DialogTrigger>
          <UpdateSourceDialog type="add" refetch={refetch} />
        </Dialog>
      </div>
      <div className="body-s flex flex-wrap gap-[40px_20px]">
        {utmSources?.map(source => (
          <div className="flex items-center gap-[8px]" key={source.id}>
            <Dialog>
              <DialogTrigger asChild>
                <div
                  className='h-[20px] w-[60px] cursor-pointer rounded-[4px]'
                  style={{
                    backgroundColor: source.color ?? '',
                  }}
                />
              </DialogTrigger>
              <UpdateSourceDialog
                type="edit"
                refetch={refetch}
                source={source}
              />
            </Dialog>
            <span className="body-s text-primary-neutral">
              {source.sourceName}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sources
