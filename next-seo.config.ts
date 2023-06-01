import { DefaultSeoProps } from 'next-seo'

const APP_NAME = 'nextros'
const APP_DESCRIPTION = 'APP_DESCRIPTION'
const APP_URL = 'APP_URL'

const config: DefaultSeoProps = {
    titleTemplate: `%s | ${APP_NAME}`,
    defaultTitle: APP_NAME,
    description: APP_DESCRIPTION,
    canonical: APP_URL,
    // Multilanguage support
    //   languageAlternates: [
    //     {
    //       hrefLang: "en",
    //       href: `${APP_URL}/en`,
    //     },
    //     {
    //       hrefLang: "fr",
    //       href: `${APP_URL}/fr`,
    //     },
    //   ],
    openGraph: {
        type: 'website',
        locale: 'fr_FR',
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
        handle: '@handle',
        site: '@site',
        cardType: 'summary_large_image',
    },
}

export default config
