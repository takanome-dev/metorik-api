import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CreateEventInput } from '../events/schemas/events'
import EventsService from '../events/services/events'


export const useEvents = () => {
    const eventsQuery = useQuery(['events'], EventsService.list)
    const createEventMutation = useMutation(async (event: CreateEventInput) => {
        await EventsService.create(event)
        await invalidate()
    })
    const dispatchEventMutation = useMutation(async (identifier: string) => {
        await EventsService.dispatch(identifier)
        await invalidate()
    }
    )
    const resetEventMutation = useMutation(async (identifier: string) => {
        await EventsService.reset(identifier)
        await invalidate()
    })

    const queryClient = useQueryClient()
    const invalidate = async () => {
        await queryClient.invalidateQueries(['events'])
    }

    return {
        eventsQuery,
        createEventMutation,
        resetEventMutation,
        dispatchEventMutation,
        invalidate
    }
}
