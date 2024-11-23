import MenuLink from '@/constants/menu-link'
import type { WebService } from '@hackquest/utils'
import type { FaucetClaimDTO, FaucetRecordType, FaucetRecordsDTO, FaucetType } from './type'

class FaucetsApi {
  protected service: WebService
  constructor(service: WebService) {
    this.service = service
  }

  getFaucets(params: object) {
    return this.service.get<{ total: number; data: FaucetType[] }>(`${MenuLink.FAUCETS}`, {
      params,
    })
  }

  getFaucetDetailById(chainId: string) {
    return this.service.get<FaucetType>(`${MenuLink.FAUCETS}/${chainId}`)
  }

  faucetClaim(data: FaucetClaimDTO) {
    return this.service.post(`${MenuLink.FAUCETS}/claim`, {
      data,
    })
  }

  getFaucetRecords(faucetId: string, params: FaucetRecordsDTO) {
    return this.service.get<{ total: number; data: FaucetRecordType[] }>(
      `${MenuLink.FAUCETS}/${faucetId}/record`,
      {
        params
      }
    );
  }
}

export default FaucetsApi
