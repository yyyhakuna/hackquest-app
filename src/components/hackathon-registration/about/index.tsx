import { bioField } from './bio'
import { genderField } from './gender'
import { locationField } from './location'
import { nameField } from './name'
import { resumeField } from './resume'
import { universityField } from './university'

export const aboutField = {
  [resumeField.type]: resumeField,
  [nameField.type]: nameField,
  [bioField.type]: bioField,
  [genderField.type]: genderField,
  [locationField.type]: locationField,
  [universityField.type]: universityField,
}
