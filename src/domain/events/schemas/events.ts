import { z } from 'zod'

export type Event = {
    title: string
    user_id: string
    identifier: string
    description?: string
    type: 'numeric' | 'bar' | 'line'
    $id: string
    $createdAt: string
    $updatedAt: string
    $permissions: string[]
    $collectionId: string
    $databaseId: string
}

export const CreateEventSchema = z.object({
    title: z.string().min(3).max(255),
    identifier: z.string().min(3).max(255),
    description: z.string().max(255).optional(),
    type: z.enum(['numeric', 'bar', 'line']),
})

export type CreateEventInput = z.infer<typeof CreateEventSchema>
