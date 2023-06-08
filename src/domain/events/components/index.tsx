import { useState } from 'react'
import { Button, Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text } from '@tremor/react'
import { IconDots, IconHelp, IconPlus } from 'tabler-icons'

import withTemplate from '@/components/hocs/withTemplate'
import { AppTemplate } from '@/templates/App.template'

import CreateEventModal from './new/create-event-modal'
import { useEvents } from './use-events'
import BodyCard from '@/components/ui/BodyCard/BodyCard'

const sample = [
    {
        id: 1,
        name: 'User logged',
        handle: 'user_logged',
        type: 'numeric',
    },
    {
        id: 2,
        name: 'User signed up',
        handle: 'user_signed_up',
        type: 'numeric',
    },
    {
        id: 3,
        name: 'Posts created',
        handle: 'posts_created',
        type: 'numeric',
    },
]

const cardProps = {
    heading: "Events",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
}

const EventsOverview = () => {
    const { eventsQuery } = useEvents()
    const documents = eventsQuery.data?.documents
    const total = eventsQuery.data?.total
    const [isModalOpen, setIsModalOpen] = useState(false)



    if (eventsQuery.error) {
        return (
            <BodyCard {...cardProps}>
                <div className="flex items-center justify-center w-full h-full">
                    <Text>
                        An error has occured while fetching events.{' '}
                    </Text>
                    <Button
                        className="ml-2"
                        variant="secondary"
                        color="pink"
                        size="xs"
                        onClick={() => eventsQuery.refetch()}
                    >
                        Retry
                    </Button>
                </div>
            </BodyCard>

        )
    }

    if (eventsQuery.isLoading) {
        return (
            <BodyCard {...cardProps}>
                <div className="flex items-center justify-center w-full h-full">
                    <Text>
                        Loading events...
                    </Text>
                </div>
            </BodyCard>
        )

    }

    if (!documents?.length) {
        return (
            <>
                <CreateEventModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

                <BodyCard {...cardProps}>
                    <div className="flex flex-col items-center justify-center h-full w-full">
                        <div className="max-w-xs text-center">
                            <Text className="text-lg font-semibold text-neutral-400">
                                No events found
                            </Text>
                            <Text className="text-sm leading-8 text-neutral-400">
                                Create an event to get started : <Button
                                    className="ml-2"
                                    variant="secondary"
                                    color="pink"
                                    size="xs"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    Create Event
                                </Button>
                            </Text>
                        </div>

                    </div>
                </BodyCard>
            </>

        )
    }

    return (
        <>
            <CreateEventModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <Card className="flex flex-col h-full ">
                <div className="flex w-full items-center">
                    <div className="flex flex-col gap-1">
                        <h3 className="text-xl text-neutral-600 font-semibold">Events</h3>
                        <p className="text-sm text-neutral-400">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.
                        </p>
                    </div>

                    <Button
                        icon={IconPlus}
                        onClick={() => setIsModalOpen(true)}
                        className="ml-auto max-h-max text-xs"
                        variant="secondary"
                        color="pink"
                        size="xs"
                    >
                        Create Event
                    </Button>
                </div>
                <hr className="w-full border-neutral-200 my-4" />
                <Table className="relative h-full">
                    <TableHead>
                        <TableHeaderCell>Label</TableHeaderCell>
                        <TableHeaderCell className="flex items-center gap-x-2">
                            Handle
                            <IconHelp className="h-4 w-4 text-neutral-400" />
                        </TableHeaderCell>
                        <TableHeaderCell>Type</TableHeaderCell>
                        <TableHeaderCell></TableHeaderCell>
                    </TableHead>
                    <TableBody>
                        {!!documents?.length
                            && documents.map((event) => (

                                <TableRow key={event.$id}>
                                    <TableCell>{event.title}</TableCell>
                                    <TableCell>
                                        <kbd className="bg-neutral-100 text-neutral-400 p-1 rounded shadow-sm">
                                            {event.identifier}
                                        </kbd>
                                    </TableCell>
                                    <TableCell>
                                        <kbd className="bg-neutral-100 text-neutral-400 p-1 rounded shadow-sm">
                                            {event.type}
                                        </kbd>
                                    </TableCell>
                                    <TableCell>
                                        <IconDots className="w-4 h-4" />
                                    </TableCell>
                                </TableRow>

                            ))}
                    </TableBody>
                </Table>


                <span className="text-sm text-neutral-400">
                    <b>{total || 0}</b> found
                </span>
            </Card>
        </>
    )
}

export default withTemplate(EventsOverview, AppTemplate)
