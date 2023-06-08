import ky from '@/lib/ky'
import { ApiGetResponse, getJWT } from '@/utils/api'

import { CreateEventInput, Event } from '../schemas/events'

export default class EventsService {

    static async list(): Promise<ApiGetResponse<Event>> {
        const json = await ky.get('/api/events').json() as ApiGetResponse<Event>
        return json
    }
    static async create(event: CreateEventInput): Promise<Event> {
        const jwt = getJWT()
        if (!jwt) throw new Error('No JWT')
        const json = await ky
            .post('/api/events', {
                json: event,
                cache: 'no-store',
            })
            .json() as Event
        return json
    }
}
