'use client'

import { Link } from '@/app/navigation'
import MenuLink from '@/constants/menu-link'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@hackquest/ui/shared/avatar'
import { Card, CardDescription, CardTitle } from '@hackquest/ui/shared/card'
import { Tag } from '@hackquest/ui/shared/tag'
import { LuImage } from 'react-icons/lu'
import { AttestButton } from '../attestations/attest-button'
import { AttestationsPreview } from '../attestations/attestations-preivew'

const data: any[] = [
  {
    id: 1,
    creatorId: 1,
    creator: {
      username: 'kevin',
      nickname: 'Kevin Li',
    },
  },
  {
    id: 2,
    creatorId: 2,
    creator: {
      username: 'cameron',
      nickname: 'Cameron Wang',
    },
  },
  {
    id: 3,
    creatorId: 3,
    creator: {
      username: 'solana',
      nickname: 'Solana Foundation',
    },
  },
  {
    id: 4,
    creatorId: 4,
    creator: {
      username: 'solana',
      nickname: 'Solana Foundation',
    },
  },
]

export function HackathonCard() {
  return (
    <Link href={`/explore/Move-on-Sui-Online-Hackathon`}>
      <Card className="p-4">
        <div className="flex items-start justify-between">
          <Avatar className="size-16 rounded-lg">
            <AvatarImage
              className="object-cover"
              src="https://assets.dev.hackquest.io/hackathons/projects/logo/sNKkvvv8VE3x-blnts8wD.svg"
            />
            <AvatarFallback className="bg-neutral-100">
              <LuImage className="size-6 text-secondary-neutral" />
            </AvatarFallback>
          </Avatar>
          <span className="headline-xs inline-flex h-6 items-center justify-center rounded-lg bg-primary px-2 py-1">
            Winner
          </span>
        </div>
        <CardTitle className="headline-m my-3 line-clamp-1">
          Living Knowledge Systems - Decentralize...
        </CardTitle>
        <CardDescription className="body-s line-clamp-2 text-secondary-neutral">
          Al Music Fly to Mooon,welcome to my solana team,let’s building great
          meme pro Al Music Fly to Mooon,welcome to my solana team,let’s
          building great meme pro...
        </CardDescription>
        <div className="mt-4 flex items-center justify-between">
          <span className="body-s text-neutral-400">Project Vison</span>
          <span className="headline-s">Meme Solana</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="body-s text-neutral-400">Builder</span>
          <object>
            <Link
              href={`${MenuLink.USER_PROFILE}/kevin`}
              className="inline-flex items-center gap-1.5"
            >
              <Avatar className="size-6">
                <AvatarImage
                  className="object-cover"
                  src="https://assets.hackquest.io/users/9f59e31f-1e30-4b63-8dab-c30b8ba4a709/avatar_f016cd71-4100-4715-9713-9759417e10f3.JPG"
                />
                <AvatarFallback className="bg-neutral-100 text-xs">
                  E
                </AvatarFallback>
              </Avatar>
              <span className="headline-s">Kevin</span>
            </Link>
          </object>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          {['Solana', 'NFT']?.map((track: string) => (
            <Tag key={track} color="brown" className="body-xs">
              {track}
            </Tag>
          ))}
        </div>
        <AttestButton className="my-4" />
        <AttestationsPreview attestations={data} />
      </Card>
    </Link>
  )
}
