import withTemplate from '@/components/hocs/withTemplate'
import Home from '@/domain/home/components'
import DefaultTemplate from '@/templates/Default.template'

const HomePage = () => {
    return <Home />
}

export default withTemplate(HomePage, DefaultTemplate)
