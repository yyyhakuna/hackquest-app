import { QQField } from '../online-profiles/qq'
import { discordField } from './discord'
import { emailField } from './email'
import { phoneNumberField } from './phone-number'
import { telegramField } from './telegram'
import { weChatField } from './wechat'

export const contactField = {
  [emailField.type]: emailField,
  [phoneNumberField.type]: phoneNumberField,
  [weChatField.type]: weChatField,
  [telegramField.type]: telegramField,
  [discordField.type]: discordField,
  [QQField.type]: QQField,
}
