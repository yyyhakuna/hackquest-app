import { execute } from '@/graphql/generated/execute'
import { FindUserCertificationDocument } from '@/graphql/generated/graphql'
import dayjs from '@/lib/dayjs'
import { ImageResponse } from '@vercel/og'
import { type NextRequest, NextResponse } from 'next/server'

const headers: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Credentials': 'true',
  'Cache-Control': 'max-age=3600',
}

export async function GET(
  request: NextRequest,
  context: { params: { name: string } },
) {
  const { name } = context.params || {}

  const splitArr = name.split('-')
  const [id, ext] = splitArr.pop()?.split('.') || []

  const data = await execute(FindUserCertificationDocument, {
    certificateId: Number(id),
  })

  const { username, certificateId, certificateTime, template } =
    data.certification || {}

  if (ext === 'json') {
    const response = NextResponse.json({
      description: `Certified Mantle Learner - ${username}-${certificateId}`,
      symbol: 'HACKQUEST',
      image: `${request.url}.png`,
      name: `${username}-${certificateId}`,
    })

    Object.keys(headers).forEach(key => {
      response.headers.append(key, headers[key] as string)
    })

    return response
  }

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 128,
        background: 'lavender',
        position: 'relative',
      }}
    >
      <img
        src={template}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
      <span
        style={{
          position: 'absolute',
          fontStyle: 'italic',
          lineHeight: '120%',
          left: '111px',
          top: '428px',
          fontSize: '72px',
        }}
      >
        {username}
      </span>
      <span
        style={{
          position: 'absolute',
          fontStyle: 'italic',
          lineHeight: '120%',
          right: '91px',
          top: '172px',
          fontSize: '16px',
        }}
      >
        No.{certificateId}
      </span>
      <span
        style={{
          position: 'absolute',
          fontStyle: 'italic',
          lineHeight: '120%',
          left: '534px',
          bottom: '80px',
          fontSize: '16px',
        }}
      >
        {dayjs(certificateTime || '').format('YYYY-MM-DD')}
      </span>
    </div>,
    {
      width: 1524,
      height: 841,
      headers,
    },
  )
}
