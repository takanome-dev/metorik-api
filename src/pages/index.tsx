import { withTemplate } from '@/components/hocs/withTemplate'
import DefaultTemplate from '@/templates/Default.template'

const HomePage = () => {
    return <div>Test</div>
}

export default withTemplate(HomePage, DefaultTemplate)
