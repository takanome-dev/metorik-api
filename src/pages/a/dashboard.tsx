import withProtectedRoute from '@/components/hocs/withProtectedRoute'
import Dashboard from '@/domain/dashboard/components'

const DashbordPage = () => {
    return <Dashboard />
}

export default withProtectedRoute(DashbordPage)
