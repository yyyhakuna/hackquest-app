import type { WebService } from '@hackquest/utils'
import type { PageResult } from '../type'
import type { ProjectCourseType } from './type'

export enum CourseApiType {
  Courses = '/courses',
}

class CourseApi {
  protected service: WebService
  constructor(service: WebService) {
    this.service = service
  }

  getCourses(params?: object) {
    return this.service.get<PageResult<ProjectCourseType>>(CourseApiType.Courses, { params })
  }
}

export default CourseApi
