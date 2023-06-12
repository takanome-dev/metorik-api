import { NextSeo } from 'next-seo'

import withProtectedRoute from '@/components/hocs/withProtectedRoute'
import EventsOverview from '@/domain/events/components'

const EventsOverviewPage = () => {
    return (
        <>
            <NextSeo title="Your Events" />
            <EventsOverview />
        </>
    )
}

export default withProtectedRoute(EventsOverviewPage)
