import { NextSeo } from 'next-seo'

import withProtectedRoute from '@/components/hocs/withProtectedRoute'
import Dashboard from '@/domain/dashboard/components'

const DashbordPage = () => {
    return (
        <>
            <NextSeo title="Your Dashboard" />
            <Dashboard />
        </>
    )
}

export default withProtectedRoute(DashbordPage)
