import { AppwriteException, Permission, Query, Role } from 'appwrite'
import { NextApiRequest, NextApiResponse } from 'next'

import { CreateEventSchema } from '@/domain/events/schemas/events'
import appwrite, { AppwriteCollections, DATABASE_ID } from '@/lib/appwrite'
import { presetJWT } from '@/utils/api'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req

    if (method === 'GET') {
        presetJWT(req, res)
        const userLogged = await appwrite.account.get()
        if (!userLogged) {
            return res.status(401).json({ error: 'Unauthorized | NO USER LOGGED' })
        }

        const events = await appwrite.database.listDocuments(DATABASE_ID, AppwriteCollections.EVENTS, [
            Query.equal('user_id', userLogged.$id),
        ])

        return res.status(200).json(events)
    }

    if (method === 'POST') {
        try {
            presetJWT(req, res)
            const userLogged = await appwrite.account.get()
            if (!userLogged) {
                return res.status(401).json({ error: 'Unauthorized | NO USER LOGGED' })
            }
            const validated = await CreateEventSchema.safeParseAsync(req.body)
            if (!validated.success) {
                return res.status(400).json({ error: 'Invalid request body' })
            }

            const { data } = validated


            const foundEvents = await appwrite.database.listDocuments(DATABASE_ID, AppwriteCollections.EVENTS, [
                Query.equal('identifier', data.identifier),
            ])

            if (foundEvents?.total > 0) {
                return res.status(409).json({ error: `An event with this identifier already exists.` })
            }

            const savedEvent = await appwrite.database.createDocument(
                DATABASE_ID,
                AppwriteCollections.EVENTS,
                'unique()',
                {
                    title: data.title,
                    user_id: userLogged.$id,
                    identifier: data.identifier,
                    description: data.description,
                    type: data.type,
                }
            )

            const eventHasData = await appwrite.database.createDocument(
                DATABASE_ID,
                AppwriteCollections.EVENTS_HAS_DATA,
                'unique()',
                {
                    event_id: savedEvent.$id,
                    value: 0 // default value
                }
            )

            return res.status(200).json({
                ...savedEvent,
            })
        } catch (e) {
            if (e instanceof AppwriteException) {
                if (e.code === 401) {
                    return res.status(401).json({ error: 'Unauthorized', cause: e })
                }
            }
            console.log(e)
            return res.status(500).json({ error: e })
        }
    }
}
