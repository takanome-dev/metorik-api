import ky from '@/lib/ky'
import { ApiGetResponse } from '@/utils/api'

import { UserHasKey } from '../schemas/keys'

export default class KeysService {
    static async list(): Promise<ApiGetResponse<UserHasKey>> {
        const json = (await ky.get('/api/keys').json()) as ApiGetResponse<UserHasKey>
        return json
    }

    static async create(): Promise<void> {
        await ky.post('/api/keys').json()
    }

    static async delete(): Promise<void> {
        await ky.delete(`/api/keys`)
    }
}
