import { PageSeo } from '~/components/SEO'
import { DonateCard } from '~/components/DonateCard'
import { donateData } from '~/data/donateData'
import { siteMetadata } from '~/data/siteMetadata'

export default function Donate() {
  let donations = donateData
  let description =
    'If you have found my writings helpful, ' +
    'donations are always appreciated but never expected.' +
    ' Thank you for your support 🍻 '

  return (
    <>
      <PageSeo title={`Projects - ${siteMetadata.author}`} description={description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1
            className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900
            dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14"
          >
            Donate
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">{description}</p>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {donations.map((donate) => (
              <DonateCard key={donate.title} donate={donate} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
