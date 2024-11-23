'use client'

import { Link, usePathname, useRouter } from '@/app/navigation'
import { HACKQUEST_DISCORD } from '@/constants/links'
import MenuLink from '@/constants/menu-link'
import { availableLocales } from '@/i18n/config'
import { GlobalModal, useGlobalModalStore } from '@/store/global-modal'
import { useUser, useUserActions } from '@/store/user'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@hackquest/ui/shared/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@hackquest/ui/shared/dropdown-menu'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useTransition } from 'react'
import { FaDiscord } from 'react-icons/fa'
import { IoLanguage } from 'react-icons/io5'
import { LuBell, LuLogOut, LuSettings, LuUser } from 'react-icons/lu'

export function CurrentUser() {
  const router = useRouter()
  const currentUser = useUser()
  const { signOut } = useUserActions()

  function handleSignOut() {
    signOut()
    router.refresh()
  }

  const [_isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const params = useParams()
  const { setModalType } = useGlobalModalStore()

  function onSelectChange(nextLocale: string) {
    startTransition(() => {
      router.replace(
        /**
         * When using shared pathnames navigation(createSharedPathnamesNavigation),
         * pathnames are the same for each locale, therefore there's no need to resolve a localized template.
         * @see https://github.com/amannn/next-intl/issues/1240
         * ```
         * const router = useRouter()
         * const pathname = usePathname()
         *
         * // ❌ Doesn't work
         * router.push({ pathname }, { locale: 'de' })
         *
         * // ✅ Works
         * router.push(pathname, { locale: 'de' })
         * ```
         */
        pathname,
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { params, locale: nextLocale },
      )
    })
  }

  return (
    <div className="ml-auto flex items-center gap-6">
      <div className="flex items-center gap-2">
        <Image
          src="/images/layout/experience.svg"
          alt="experience"
          width={16}
          height={24}
        />
        <span className="font-bold text-neutral-500 text-sm">
          {currentUser?.levelInfo?.level || 0}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Image
          src="/images/layout/coin.png"
          alt="coin"
          width={24}
          height={24}
        />
        <span className="font-bold text-neutral-500 text-sm">
          {currentUser?.hackCoin?.coin || 0}
        </span>
      </div>
      <button
        className="text-neutral-600 outline-none"
        onClick={() => setModalType(GlobalModal.NOTIFICATION)}
      >
        <LuBell className="size-5" />
      </button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage
              src={currentUser?.avatar}
              alt={currentUser?.nickname || ''}
            />
            <AvatarFallback>{currentUser?.nickname?.charAt(0)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link
              href={`${MenuLink.USER_PROFILE}/${currentUser?.username}`}
              className="flex items-center gap-3"
            >
              <LuUser className="size-5" />
              <span className="body-s">Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="gap-3">
              <IoLanguage className="size-5" />
              <span className="body-s">Language</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {availableLocales.map(({ code, displayName }) => (
                  <DropdownMenuItem
                    key={code}
                    className="body-s"
                    onClick={() => {
                      onSelectChange(code)
                    }}
                  >
                    {displayName}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <Link href={`${MenuLink.USER_SETTING}`}>
            <DropdownMenuItem className="gap-3">
              <LuSettings className="size-5" />
              <span className="body-s">Settings</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem className="gap-3" asChild>
            <Link href={HACKQUEST_DISCORD} target="_blank" rel="noreferrer">
              <FaDiscord className="size-5 shrink-0" />
              <span className="body-s">Join Community</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="gap-3 text-destructive-600"
            onClick={handleSignOut}
          >
            <LuLogOut className="size-5" />
            <span className="body-s">Log Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
