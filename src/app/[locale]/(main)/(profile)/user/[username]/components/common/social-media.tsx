import { FormInput } from '@/components/common/form-input'
import { openWindow } from '@/lib/utils'
import { Button } from '@hackquest/ui/shared/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@hackquest/ui/shared/form'
import { Input, InputSlot } from '@hackquest/ui/shared/input'
import { Label } from '@hackquest/ui/shared/label'
import { type FieldValues, useFormContext } from 'react-hook-form'
import {
  FaDiscord,
  FaGithub,
  FaLinkedin,
  FaTelegram,
  FaXTwitter,
} from 'react-icons/fa6'
import { IoLogoWechat } from 'react-icons/io5'
import { LuCheck } from 'react-icons/lu'
import { SocialMediaInput } from './social-medial-input'

export function SocialMedia({
  isOnboarding = false,
}: {
  isOnboarding?: boolean
}) {
  const form = useFormContext<FieldValues>()

  const discord = form.watch('discord')

  return (
    <div className="space-y-1">
      {!isOnboarding && (
        <Label className="body-s text-neutral-600">Social Media</Label>
      )}
      <div className="space-y-3">
        {!isOnboarding && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <FaDiscord className="size-6 text-social-discord" />
              <span className="hidden min-w-28 text-sm sm:block">Discord</span>
            </div>
            {discord ? (
              <div className="flex w-full items-center gap-2">
                <Input className="h-9" readOnly defaultValue={discord}>
                  <InputSlot side="right">
                    <span className="headline-xs inline-flex items-center gap-1 text-success-600">
                      <LuCheck className="size-4" />
                      Linked
                    </span>
                  </InputSlot>
                </Input>
                <button
                  type="button"
                  className="body-xs text-destructive-600 outline-none"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <Button
                size="small"
                onClick={() =>
                  openWindow('http://localhost:4002/auth/discord/connect')
                }
              >
                Link Account
              </Button>
            )}
          </div>
        )}
        {!isOnboarding && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <FaGithub className="size-6 text-social-github" />
              <span className="hidden min-w-28 text-sm sm:block">Github</span>
            </div>
            <FormField
              control={form.control}
              name="github"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <SocialMediaInput
                      {...field}
                      prefix="github.com/"
                      placeholder="username"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <FaXTwitter className="size-6 text-social-twitter" />
            <span className="hidden min-w-28 text-sm sm:block">Twitter</span>
          </div>
          <FormField
            control={form.control}
            name="twitter"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <SocialMediaInput
                    {...field}
                    prefix="x.com/"
                    placeholder="username"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <FaLinkedin className="size-6 text-social-linkedin" />
            <span className="hidden min-w-28 text-sm sm:block">LinkedIn</span>
          </div>
          <FormField
            control={form.control}
            name="linkedIn"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <SocialMediaInput
                    {...field}
                    prefix="linkedin.com/in/"
                    placeholder="username"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <FaTelegram className="size-6 text-social-telegram" />
            <span className="hidden min-w-28 text-sm sm:block">Telegram</span>
          </div>
          <FormField
            control={form.control}
            name="telegram"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <SocialMediaInput
                    {...field}
                    prefix="t.me/"
                    placeholder="username"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <IoLogoWechat className="size-6 text-social-wechat" />
            <span className="hidden min-w-28 text-sm sm:block">WeChat</span>
          </div>
          <FormInput
            control={form.control}
            name="wechat"
            placeholder="wechatID"
            className="h-9"
          />
        </div>
      </div>
    </div>
  )
}
