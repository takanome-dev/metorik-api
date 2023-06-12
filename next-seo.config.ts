import { DefaultSeoProps } from 'next-seo'

const APP_NAME = 'Metorik'
const APP_DESCRIPTION = 'Metorik is a tool that will help you track and analyze your API usage by dispatching events in your server code.'
const APP_URL = process.env.NEXT_PUBLIC_PROD_URL || 'https://metorik.vercel.app'

const config: DefaultSeoProps = {
  titleTemplate: `%s | ${APP_NAME}`,
  defaultTitle: APP_NAME,
  description: APP_DESCRIPTION,
  canonical: APP_URL,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: APP_URL,
    site_name: APP_NAME,
    images: [
      {
        url: `${APP_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: APP_NAME,
      },
    ],
  },
  twitter: {
    handle: '@adevinwild',
    site: '@adevinwild',
    cardType: 'summary_large_image',
  },
}

export default config
