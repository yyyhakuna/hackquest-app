import { Link } from '@/app/navigation'
import { Card } from '@hackquest/ui/shared/card'
import Image from 'next/image'
import type React from 'react'
import { articlesData } from '../../constants/data'

interface ArticlesProp {
  children: React.JSX.Element
}

const Article: React.FC<ArticlesProp> = async ({ children }) => {
  // const { t } = await useTranslation(lang, TransNs.PRESS_KIT);
  const articles = articlesData.filter(article => article.link)
  return (
    <div className="overflow-y-auto">
      {children}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {articles.map((article, i) => (
          <Link key={i} href={''} target="_blank">
            <Card className="w-full overflow-hidden rounded-[16px] border-2 border-neutral-200 bg-neutral-white p-6">
              <div className="relative h-0 w-full bg-neutral-light-gray pt-[56.25%]">
                {article.img && (
                  <Image
                    src={article.img}
                    alt={article.time}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              <div className="mt-4">
                {/* title */}
                <h2 className="body-m mb-3 line-clamp-2 font-bold text-primary-neutral">
                  {article.title}
                </h2>
                {/* descrption */}
                <div className="body-s line-clamp-3 h-[63px] text-secondary-neutral">
                  {article.descrption}
                </div>
                {/* time */}
                <div className="body-xs flex gap-[10px] pt-3 text-secondary-neutral">
                  <div>Press</div>
                  <div className="h-[18px] w-[1px] bg-neutral-300" />
                  <div>{article.time}</div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Article
