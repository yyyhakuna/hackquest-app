import { aboutField } from './about'
import { contactField } from './contact'
import { onlineProfilesField } from './online-profiles'

export const applicationField = {
  ...aboutField,
  ...onlineProfilesField,
  ...contactField,
}
