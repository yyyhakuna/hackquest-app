import type { WebService } from '@hackquest/utils'
import { cache } from 'react'
import type { GetSignatureParams, MantleType, SignatureData, TargetsType, UserCertificateInfo } from './type'

export enum CampaignsApiType {
  Campaigns = '/campaigns',
  GetSignature = '/ethers/signature',
  Certifications = '/certifications',
}

class CampaignsApi {
  protected service: WebService
  constructor(service: WebService) {
    this.service = service
  }

  getCampaigns() {
    return this.service.get<MantleType[]>(CampaignsApiType.Campaigns)
  }

  campaignsClaim(data: { campaignId: string }) {
    return this.service.post(`${CampaignsApiType.Campaigns}/claim`, {
      body: JSON.stringify(data),
    })
  }

  getCampaignsTargets(id: string) {
    return this.service.get<TargetsType[]>(`${CampaignsApiType.Campaigns}/${id}/targets`)
  }

  campaignsTargetClaim(campaignId: string, data: { targetIds: string[] }) {
    return this.service.post(`${CampaignsApiType.Campaigns}/${campaignId}/targets/claim`, {
      body: JSON.stringify(data),
    })
  }

  campaignsDiscord() {
    return this.service.get<{ url: string }>(`${CampaignsApiType.Campaigns}/discord`)
  }

  campaignsToUrl(campaignId: string, data: { targetIds: string[] }) {
    return this.service.post<{ url: string }>(`${CampaignsApiType.Campaigns}/${campaignId}/targets/complete`, {
      body: JSON.stringify(data),
    })
  }

  /** 获取certification 密钥 */
  getSignature(certificateId: string, params: GetSignatureParams) {
    return this.service.post<SignatureData>(`${CampaignsApiType.Certifications}/${certificateId}/signature`, {
      body: JSON.stringify(params),
    })
  }

  /** 获取证书的详情 */
  getCertificationDetail(certificationId: string) {
    return this.service.get<UserCertificateInfo>(`${CampaignsApiType.Certifications}/${certificationId}`)
  }

  getCertificate(certificationId: string, token: string) {
    const cacheFn = cache(() => {
      return this.service.get<UserCertificateInfo>(`${CampaignsApiType.Certifications}/${certificationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    })

    return cacheFn()
  }

  /** 获取证书的详情 */
  async fetchCertificationDetail(certificationId: string): Promise<UserCertificateInfo> {
    // const url = `${this.service.baseURL.slice(0, -1)}${CampaignsApiType.Certifications}/${certificationId}`;

    // const certificationDetail = await fetch(url, {
    //   method: 'get'
    // });

    // if (!certificationDetail.ok) {
    //   throw new Error('Failed to fetch learning track data!');
    // }

    // return certificationDetail.json();

    const cacheFn = cache(() => {
      return this.getCertificationDetail(certificationId)
    })

    return cacheFn()
  }

  claimCertification(certificationId: string) {
    return this.service.get(`${CampaignsApiType.Certifications}/${certificationId}/claim`)
  }

  claimCertificate(certificationId: string, data: FormData) {
    return this.service.post<UserCertificateInfo>(`${CampaignsApiType.Certifications}/${certificationId}/claim`, {
      body: JSON.stringify(data),
    })
  }

  /** 保存mint状态 */
  // savaMintState(params: { certificationId: string; txId: string }) {
  //   return this.service.patch(`${CampaignsApiType.Certifications}/${params.certificationId}/mint`, {
  //     data: {
  //       txId: params.txId,
  //     },
  //   })
  // }

  crateCertificate(certificationId: string, data: { username: string }) {
    return this.service.post<UserCertificateInfo>(`${CampaignsApiType.Certifications}/${certificationId}/certificate`, {
      body: JSON.stringify(data),
    })
  }

  getCertificateInfoById(id: string) {
    return this.service.get<UserCertificateInfo>(`/certifications/certificate/${id}`)
  }
}

export default CampaignsApi
