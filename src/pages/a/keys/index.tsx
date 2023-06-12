import { NextSeo } from 'next-seo'

import withTemplate from '@/components/hocs/withTemplate'
import { KeysOverview } from '@/domain/keys/components'
import { AppTemplate } from '@/templates/App.template'

const KeysPage = () => (
    <>
        <NextSeo title="Your API Keys" />
        <KeysOverview />
    </>
)

export default withTemplate(KeysPage, AppTemplate)
