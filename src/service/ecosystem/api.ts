import type { WebService } from '@hackquest/utils'
import type { EcosystemType } from './type'

export enum EcosystemApiType {
  Ecosystems = '/ecosystems',
}

class EcosystemApi {
  protected service: WebService
  constructor(service: WebService) {
    this.service = service
  }

  getEcosystems(params?: object) {
    return this.service.get<EcosystemType[]>(EcosystemApiType.Ecosystems, { params })
  }
}

export default EcosystemApi
