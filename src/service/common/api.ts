import { getDomain } from '@/lib/utils'
import type { WebService } from '@hackquest/utils'
import type { PageResult } from '../type'
import type { CustomKeywordType } from './type'
import type { NotionParseLog } from './type'
export enum CommonApiType {
  UPLOAD_IMAGE = '/upload/single',
}

class CommonApi {
  protected service: WebService
  constructor(service: WebService) {
    this.service = service
  }

  customKeywordAdd(data: { type: CustomKeywordType; keyword: string }) {
    return this.service.post(`/custom-keywords`, {
      body: JSON.stringify(data),
    })
  }

  uploadImage(file: FormData) {
    return this.service.post<{ filepath: string }>(CommonApiType.UPLOAD_IMAGE, {
      data: file,
    })
  }

  singleUpload(data: FormData) {
    return this.service.post<string>('/shared/upload', {
      data,
    })
  }

  getUploadSignedUrl(params: {
    filename: string
    path: string
    isPublic?: boolean
  }) {
    params.isPublic = params.isPublic ?? true
    return this.service.get<{
      signedUrl: string
    }>('/shared/singed-url', {
      params,
    })
  }

  getAssetsUrl(assets: string) {
    return this.service.get<string>('/shared/assets-url', {
      params: { assets },
    })
  }

  async getUploadSessionUrl(url: string) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': getDomain(
          process.env.RUNTIME_ENV || 'local',
        ),
        'Content-Type': 'application/octet-stream',
        'X-Goog-Resumable': 'start',
      } as any,
      body: JSON.stringify({ name: 'string' }),
    })
    return response.headers.get('location') as string
  }

  getNotionLogs(params?: {
    keyword?: string
    notionType?: string
    status?: string
    sort?: string
    limit?: number
  }) {
    return this.service.get<PageResult<NotionParseLog>>(
      '/admin/parse-notion/logs',
      {
        params: params || {},
      },
    )
  }
}

export default CommonApi
