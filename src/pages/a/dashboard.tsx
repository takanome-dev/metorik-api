import withProtectedRoute from '@/components/hocs/withProtectedRoute'
import Dashboard from '@/domain/dashboard/components'

type Props = {}

const DashbordPage = (props: Props) => {
    return <Dashboard />
}

export default withProtectedRoute(DashbordPage)
