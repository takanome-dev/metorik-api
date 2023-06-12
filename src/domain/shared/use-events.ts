import { useDeferredValue } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { CreateEventInput, ListEventsInput, ListEventsSchema } from '../events/schemas/events'
import EventsService from '../events/services/events'

type FormValues = ListEventsInput

export const useEvents = () => {
    const form = useForm<FormValues>({
        defaultValues: {
            time: 'today',
        },
        resolver: zodResolver(ListEventsSchema),
    })

    const deferredTimeValue = useDeferredValue(form.watch().time)

    const eventsQuery = useQuery(['events', deferredTimeValue], () => EventsService.list({ time: deferredTimeValue }))

    const createEventMutation = useMutation(async (event: CreateEventInput) => {
        await EventsService.create(event)
        await invalidate()
    })
    const dispatchEventMutation = useMutation(async (identifier: string) => {
        await EventsService.dispatch(identifier)
        await invalidate()
    })
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
        invalidate,
        form,
    }
}
