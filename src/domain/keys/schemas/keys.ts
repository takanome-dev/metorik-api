import { z } from 'zod'

export type UserHasKey = {
    $id: string
    $createdAt: string
    $updatedAt: string
    user_id: string
    key: string
    read: boolean
}
