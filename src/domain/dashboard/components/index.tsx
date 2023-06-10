import { Card, Metric, SelectBox, SelectBoxItem, Text } from '@tremor/react'
import { useContext } from 'react'

import withTemplate from '@/components/hocs/withTemplate'
import BodyCard from '@/components/ui/BodyCard/BodyCard'
import { Event } from '@/domain/events/schemas/events'
import { useEvents } from '@/domain/shared/use-events'
import { SessionContext } from '@/providers/session-provider'
import { AppTemplate } from '@/templates/App.template'
import { Controller } from 'react-hook-form'

type StateDrivenCardProps = {
    type: Event['type']
    data: Event
}


const StateDrivenCard = ({ type, data }: StateDrivenCardProps) => {
    switch (type) {
        case 'numeric':
        default:
            return (
                <Card className="max-w-xs flex flex-col justify-end mx-auto relative" decoration="top" decorationColor="pink">
                    <Text className="flex-1">{data.title}</Text>
                    <Metric >{data.value}</Metric>
                </Card>
            )
    }
}

const SkeletonCard = () => (
    <div className="w-full h-full sm:min-h-[96px] xl:min-h-[128px] border-t-4 border-t-pink-400 bg-neutral-100 border p-4 border-neutral-200 animate-pulse rounded-lg" />
)

const Dashboard = () => {
    const { user } = useContext(SessionContext)
    const { eventsQuery, form } = useEvents()
    const events = eventsQuery.data?.documents
    const total = eventsQuery.data?.total

    return (
        <BodyCard
            heading='Dashboard'
            description={`Glad to see you, ${user?.name}, you have ${total} events!`}
            header={
                <Controller
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                        <div className="ml-auto">

                            <SelectBox
                                placeholder="Select a time frame"
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <SelectBoxItem value='today' text="Today" />
                                <SelectBoxItem value='week' text="Lasts 7 days" />
                                <SelectBoxItem value='month' text="Lasts 30 days" />
                            </SelectBox>
                        </div>

                    )}
                />}
        >

            <div className="grid grid-cols-4 gap-8">
                {!eventsQuery.isLoading && events?.map((event) => (
                    <StateDrivenCard key={event.$id} type={event.type} data={event} />
                ))}
                {
                    eventsQuery.isLoading && Array.from({ length: 4 }).map((_, index) => (
                        <SkeletonCard key={index} />
                    ))
                }
            </div>
        </BodyCard>
    )
}

export default withTemplate(Dashboard, AppTemplate)
