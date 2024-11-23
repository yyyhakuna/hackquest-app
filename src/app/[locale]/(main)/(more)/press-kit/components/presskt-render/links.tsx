import { Link } from '@/app/navigation'
import { Button } from '@hackquest/ui/shared/button'
import { Card } from '@hackquest/ui/shared/card'
import Image from 'next/image'
import { emailsData, linksData } from '../../constants/data'

const Links = async () => {
  // const { t } = await useTranslation(lang, TransNs.PRESS_KIT)
  return (
    <div>
      <h1 className="title-5 pb-4">Social Media</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {linksData.map((v, i) => (
          <Card
            key={i}
            className="overflow-hidden rounded-[16px] border-2 border-neutral-200 bg-netural-white p-4 text-neutral-800"
          >
            {/* pic */}
            <div>
              <Image src={v.img} alt={''} className="object-contain" width={48} height={48} />
            </div>
            {/* title */}
            <div className="headline-m pt-4">
              <p>{v.name}</p>
            </div>
            {/* website */}
            <div className="body-s py-4">
              <p className="line-clamp-1 overflow-hidden">{v.link}</p>
            </div>

            <Link href={v.link}>
              <Button className="border border-neutral-600 bg-neutral-white">
                <div className="flex items-center gap-2">
                  <span>{v.btnText}</span>
                  {v.icon}
                </div>
              </Button>
            </Link>
          </Card>
        ))}
      </div>
      <h1 className="title-5 py-4">Email</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {emailsData.map((v, i) => (
          <Card
            key={i}
            className="overflow-hidden rounded-[16px] border-2 border-neutral-200 bg-netural-white p-4 text-neutral-800"
          >
            {/* pic */}
            <div>
              <Image src={v.img} alt={''} className="object-contain" width={48} height={48} />
            </div>
            {/* title */}
            <div className="headline-m pt-4 text-neutral-800">
              <p className="">{v.name}</p>
            </div>
            {/* website */}
            <p className="body-s py-4">{v.link}</p>
            <Link href={v.link}>
              <Button className="border border-neutral-600 bg-neutral-white">
                <div className="flex items-center gap-2">
                  <span>{v.btnText}</span>
                  {v.icon}
                </div>
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Links
