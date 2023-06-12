import { useContext } from 'react'
import { Controller } from 'react-hook-form'
import { Card, Metric, SelectBox, SelectBoxItem, Text } from '@tremor/react'
import Link from 'next/link'
import { IconSearch } from 'tabler-icons'

import withTemplate from '@/components/hocs/withTemplate'
import BodyCard from '@/components/ui/BodyCard/BodyCard'
import { Event } from '@/domain/events/schemas/events'
import { useEvents } from '@/domain/shared/use-events'
import { SessionContext } from '@/providers/session-provider'
import { AppTemplate } from '@/templates/App.template'

type StateDrivenCardProps = {
    type: Event['type']
    data: Event
}

const StateDrivenCard = ({ type, data }: StateDrivenCardProps) => {
    switch (type) {
        case 'numeric':
        default:
            return (
                <Card
                    className="max-w-xs  flex flex-col justify-end mx-auto relative"
                    decoration="top"
                    decorationColor="pink"
                >
                    <Text className="flex-1">{data.title}</Text>
                    <Metric>{data.value}</Metric>
                </Card>
            )
    }
}

const SkeletonCard = () => (
    <div className="w-full h-full sm:min-h-[96px] xl:min-h-[128px] border-t-4 border-t-neutral-200 bg-neutral-100 border p-4 border-neutral-200 animate-pulse rounded-lg" />
)

const Dashboard = () => {
    const { user } = useContext(SessionContext)
    const { eventsQuery, form } = useEvents()
    const events = eventsQuery.data?.documents
    const total = eventsQuery.data?.total

    if (eventsQuery.isLoading) {
        return (
            <>
                <BodyCard
                    heading="Dashboard"
                    description={`Glad to see you, ${user?.name}, we are retrieving your events...`}
                >
                    <div className="grid grid-cols-4 gap-8">
                        {Array.from({ length: 16 }).map((_, index) => (
                            <SkeletonCard key={index} />
                        ))}
                    </div>
                </BodyCard>
            </>
        )
    }

    if (!eventsQuery.isLoading && !total) {
        return (
            <BodyCard heading="Dashboard" description={`Glad to see you, ${user?.name}, it's empty here...`}>
                <div className=" flex flex-col gap-y-2 items-center justify-center h-full text-center text-neutral-500">
                    <div className="p-4 bg-neutral-100 border text-neutral-600 rounded-full">
                        <IconSearch className="w-4 h-4" />
                    </div>

                    <Text className="text-xl font-semibold text-neutral-400 tracking-tight">No events found</Text>
                    <Text className="text-neutral-400">
                        Start creating your events{' '}
                        <Link
                            href="/a/events?showCreateDialog=true"
                            className="underline underline-offset-2 text-pink-400"
                        >
                            here
                        </Link>
                    </Text>
                </div>
            </BodyCard>
        )
    }

    return (
        <BodyCard
            heading="Dashboard"
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
                                <SelectBoxItem value="today" text="Today" />
                                <SelectBoxItem value="week" text="Lasts 7 days" />
                                <SelectBoxItem value="month" text="Lasts 30 days" />
                            </SelectBox>
                        </div>
                    )}
                />
            }
        >
            <div className="grid grid-cols-4 gap-8">
                {events?.map((event) => (
                    <StateDrivenCard key={event.$id} type={event.type} data={event} />
                ))}
            </div>
        </BodyCard>
    )
}

export default withTemplate(Dashboard, AppTemplate)
