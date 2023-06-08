import { useContext } from 'react'
import { Card, Metric, Text } from '@tremor/react'
import { IconStar } from 'tabler-icons'

import withTemplate from '@/components/hocs/withTemplate'
import { SessionContext } from '@/providers/session-provider'
import { AppTemplate } from '@/templates/App.template'
import { useEvents } from '@/domain/shared/use-events'
import { Event } from '@/domain/events/schemas/events'


type StateDrivenCardProps = {
    type: Event["type"]
    data: Event
}

const StateDrivenCard = ({ type, data }: StateDrivenCardProps) => {
    switch (type) {
        case "numeric":
        default:
            return (
                <Card className="max-w-xs mx-auto relative" decoration="top" decorationColor="pink">
                    <Text>{data.title}</Text>
                    <Metric>{data.value}</Metric>
                </Card>
            )
    }
}


const Dashboard = () => {
    const { user } = useContext(SessionContext)
    const { eventsQuery } = useEvents()
    const events = eventsQuery.data?.documents
    const total = eventsQuery.data?.total

    return (
        <div className="flex flex-col h-full">
            <h3 className="text-xl text-neutral-600 font-semibold">Glad to see you, {user?.name}</h3>
            <p className="text-sm text-neutral-400">This your dashboard, you can visualize your events data here.</p>
            <br className="my-4" />
            <div className="flex flex-col mb-3">
                <div className="flex items-center text-neutral-600 gap-x-2">
                    <IconStar className="w-4 h-4" />
                    <h4 className="text-lg tracking-tight ">
                        Favorites <small className="text-xs text-neutral-400">(4/4)</small>
                    </h4>
                </div>
                <p className="text-sm text-neutral-400">You can add up to 4 favorites events.</p>
            </div>

            <div className="grid grid-cols-4 gap-8">
                {events?.map((event) => (
                    <StateDrivenCard key={event.$id} type={event.type} data={event} />
                ))}
            </div>
        </div>
    )
}

export default withTemplate(Dashboard, AppTemplate)
