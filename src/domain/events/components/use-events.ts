import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { CreateEventInput } from '../schemas/events'
import EventsService from '../services/events'

export const useEvents = () => {
    const eventsQuery = useQuery(['events'], EventsService.list)
    const createEventMutation = useMutation((event: CreateEventInput) => EventsService.create(event))
    const queryClient = useQueryClient()
    const invalidate = async () => {
        await queryClient.invalidateQueries(['events'])
    }

    return {
        eventsQuery,
        createEventMutation,
        invalidate
    }
}
