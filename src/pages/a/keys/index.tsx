import withTemplate from '@/components/hocs/withTemplate'
import { KeysOverview } from '@/domain/keys/components'
import { AppTemplate } from '@/templates/App.template'

const KeysPage = () => <KeysOverview />

export default withTemplate(KeysPage, AppTemplate)
