import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@hackquest/ui/shared/avatar'
import { IconButton } from '@hackquest/ui/shared/icon-button'
import { Separator } from '@hackquest/ui/shared/separator'
import { Tag } from '@hackquest/ui/shared/tag'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { Card } from './card'

function AddUserButton() {
  return (
    // biome-ignore lint/a11y/useFocusableInteractive: <explanation>
    <div
      // biome-ignore lint/a11y/useSemanticElements: <explanation>
      role="button"
      className="inline-flex w-fit items-center justify-center gap-2.5 rounded-xl border border-neutral-300 px-6 py-2.5 transition-colors duration-300 hover:bg-neutral-100"
    >
      <IconButton className="border-none bg-primary enabled:hover:bg-primary">
        <AiOutlineUserAdd />
      </IconButton>
      <span className="headline-m">Smart Contract</span>
    </div>
  )
}

export function TeammateRecruitment() {
  return (
    <div className="space-y-6">
      <h2 className="title-3">Teammate Recruitment</h2>
      <Card className="space-y-6 rounded-2xl sm:p-8">
        <div className="space-y-6">
          <div className="flex gap-4 max-sm:flex-col sm:items-center sm:gap-8">
            <div className="shrink-0">
              {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
              <label className="body-m text-secondary-neutral">
                Team leader:
              </label>
              <div className="flex items-center gap-1.5">
                <Avatar className="size-6">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="headline-l">John Doe</span>
              </div>
            </div>
            <Separator className="sm:h-[4.5rem] sm:w-px" />
            <p className="body-m">
              Lorem ipsum dolor sit amet consectetur. Tellus ut adipiscing sit
              mattis nam cursus. Diam at tellus adipiscing nulla. Facilisis urna
              pretium quisque ligula maecenas risus aenean facilisis. Leo
              feugiat nunc nisi integer nisi velit nam pretium nec. Elit in
              mauris faucibus accumsan ornare nulla praesent.
            </p>
          </div>
          <div className="space-y-3 sm:space-y-6">
            <div className="flex gap-2 max-sm:flex-col sm:items-center sm:gap-6">
              <h4 className="headline-m sm:w-36">Email</h4>
              <span className="body-s">4654464546@gmail.com</span>
            </div>
            <div className="flex gap-2 max-sm:flex-col sm:items-center sm:gap-6">
              <h4 className="headline-m sm:w-36">Telegram</h4>
              <span className="body-s">4654464546</span>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <h5 className="body-s text-neutral-600">Recruitment</h5>
          <div className="space-y-4">
            <Card className="space-y-2 bg-neutral-50 p-4">
              <div className="flex gap-4 max-sm:flex-col sm:items-center sm:gap-6">
                <AddUserButton />
                <div className="flex flex-wrap items-center gap-2">
                  <Tag className="body-s bg-neutral-100 px-6 py-4">
                    Pellentesque
                  </Tag>
                  <Tag className="body-s bg-neutral-100 px-6 py-4">Solana</Tag>
                  <Tag className="body-s bg-neutral-100 px-6 py-4">
                    Pellentesque
                  </Tag>
                  <Tag className="body-s bg-neutral-100 px-6 py-4">
                    Pellentesque
                  </Tag>
                </div>
              </div>
              <p className="body-m p-2">
                Lorem ipsum dolor sit amet consectetur. Tellus ut adipiscing sit
                mattis nam cursus. Diam at tellus adipiscing nulla. Facilisis
                urna pretium quisque ligula maecenas risus aenean facilisis. Leo
                feugiat nunc nisi integer nisi velit nam pretium nec. Elit in
                mauris faucibus accumsan ornare nulla praesent.
              </p>
            </Card>
            <Card className="space-y-2 bg-neutral-50 p-4">
              <div className="flex gap-4 max-sm:flex-col sm:items-center sm:gap-6">
                <AddUserButton />
                <div className="flex flex-wrap items-center gap-2">
                  <Tag className="body-s bg-neutral-100 px-6 py-4">Node</Tag>
                  <Tag className="body-s bg-neutral-100 px-6 py-4">Java</Tag>
                </div>
              </div>
              <p className="body-m p-2">
                Lorem ipsum dolor sit amet consectetur. Tellus ut adipiscing sit
                mattis nam cursus. Diam at tellus adipiscing nulla. Facilisis
                urna pretium quisque ligula maecenas risus aenean facilisis. Leo
                feugiat nunc nisi integer nisi velit nam pretium nec. Elit in
                mauris faucibus accumsan ornare nulla praesent.
              </p>
            </Card>
            <Card className="space-y-2 bg-neutral-50 p-4">
              <div className="flex gap-4 max-sm:flex-col sm:items-center sm:gap-6">
                <AddUserButton />
                <div className="flex flex-wrap items-center gap-2">
                  <Tag className="body-s bg-neutral-100 px-6 py-4">
                    Lorem adipiscing
                  </Tag>
                  <Tag className="body-s bg-neutral-100 px-6 py-4">
                    Lorem adipiscing
                  </Tag>
                  <Tag className="body-s bg-neutral-100 px-6 py-4">
                    Lorem adipiscing
                  </Tag>
                </div>
              </div>
            </Card>
            <Card className="space-y-2 bg-neutral-50 p-4">
              <div className="flex gap-4 max-sm:flex-col sm:items-center sm:gap-6">
                <AddUserButton />
              </div>
            </Card>
          </div>
        </div>
      </Card>
    </div>
  )
}
