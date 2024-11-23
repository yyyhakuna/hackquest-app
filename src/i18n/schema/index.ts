import type { I18nSchema } from '../config'
import { authSchema } from './auth'
import { blogSchema } from './blog'
import { builderHomeSchema } from './builder-home'
import { commonSchema } from './common'
import { eventSchema } from './event'
import { faucetsScheme } from './faucets'
import { glossarySchema } from './glossary'
import { hackathonDetailSchema } from './hackahton-detail'
import { archiveSchema } from './hackathon-archive'
import { hackathonExploreScheme } from './hackathon-explore'
import { hackathonOrganizerScheme } from './hackathon-organizer'
import { jobsSchema } from './jobs'
import { pressKitSchema } from './press-kit'

const i18nSchema: I18nSchema = {
  Common: commonSchema,
  Blog: blogSchema,
  Glossary: glossarySchema,
  Faucets: faucetsScheme,
  PressKit: pressKitSchema,
  Auth: authSchema,
  Event: eventSchema,
  Jobs: jobsSchema,
  BuilderHome: builderHomeSchema,
  HackathonDetail: hackathonDetailSchema,
  Archive: archiveSchema,
  HackathonExplore: hackathonExploreScheme,
  HackathonOrganizer: hackathonOrganizerScheme,
}

export default i18nSchema
