import ky from '@/lib/ky'
import { ApiGetResponse, getJWT } from '@/utils/api'

import { CreateEventInput, Event, ListEventsInput } from '../schemas/events'

export default class EventsService {
    static async list({ time = "today" }: ListEventsInput): Promise<ApiGetResponse<Event>> {
        const json = (await ky.get(`/api/events?time=${time}`).json()) as ApiGetResponse<Event>
        return json
    }
    static async create(event: CreateEventInput): Promise<Event> {
        const jwt = getJWT()
        if (!jwt) throw new Error('No JWT')
        const json = (await ky
            .post('/api/events', {
                json: event,
                cache: 'no-store',
            })
            .json()) as Event
        return json
    }

    static async dispatch(identifier: string): Promise<void> {
        await ky.post(`/api/events/${identifier}`)
    }

    static async reset(identifier: string): Promise<void> {
        await ky.post(`/api/events/${identifier}/reset`)
    }
}
