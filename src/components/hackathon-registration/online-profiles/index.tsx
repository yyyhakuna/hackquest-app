'use client'

import { facebookField } from './facebook'
import { farcasterField } from './farcaster'
import { githubField } from './github'
import { linkedInField } from './linkedin'
import { twitterField } from './twitter'
import { whatsAppField } from './whatsapp'

export const onlineProfilesField = {
  [githubField.type]: githubField,
  [whatsAppField.type]: whatsAppField,
  [facebookField.type]: facebookField,
  [twitterField.type]: twitterField,
  [farcasterField.type]: farcasterField,
  [linkedInField.type]: linkedInField,
}
