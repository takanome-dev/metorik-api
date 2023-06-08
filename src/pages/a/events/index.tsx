import withProtectedRoute from '@/components/hocs/withProtectedRoute'
import EventsOverview from '@/domain/events/components'

const EventsOverviewPage = () => {
    return <EventsOverview />
}

export default withProtectedRoute(EventsOverviewPage)
