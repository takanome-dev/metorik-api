import { AppwriteException, Query } from 'appwrite'
import type { Request, Response } from 'express'
import { NextApiRequest, NextApiResponse } from 'next'

import { CreateEventSchema, Event } from '@/domain/events/schemas/events'
import appwrite, { AppwriteCollections, DATABASE_ID } from '@/lib/appwrite'
import { ApiGetResponse, presetJWT } from '@/utils/api'
import { middlewares } from '@/utils/api-middlewares'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req
    await Promise.all(
        middlewares.map((middleware) => middleware(req as unknown as Request, res as unknown as Response, () => {}))
    )
    if (method === 'GET') {
        presetJWT(req, res)
        const userLogged = await appwrite.account.get()
        if (!userLogged) {
            return res.status(401).json({ error: 'Unauthorized | NO USER LOGGED' })
        }

        // get the params from the query : ?time=value
        const { time } = req.query

        const events = (await appwrite.database.listDocuments(DATABASE_ID, AppwriteCollections.EVENTS, [
            Query.equal('user_id', userLogged.$id),
        ])) as unknown as ApiGetResponse<Event>

        for (const event of events.documents) {
            const datas = await appwrite.database.listDocuments(DATABASE_ID, AppwriteCollections.EVENTS_HAS_DATA, [
                Query.equal('event_id', event.$id),
            ])

            // filter the datas by time

            const eventFilteredByTime = datas.documents.filter((event) => {
                const eventDate = new Date(event.$createdAt)

                switch (time) {
                    case 'today':
                        return eventDate.getDate() === new Date().getDate()
                    case 'week':
                        return eventDate.getDate() >= new Date().getDate() - 7
                    case 'month':
                        return eventDate.getDate() >= new Date().getDate() - 30
                    default:
                        return true
                }
            })

            const value = eventFilteredByTime.at(0)?.value as string | undefined
            event.value = value ? parseInt(value) : 0
        }
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

            await appwrite.database.createDocument(DATABASE_ID, AppwriteCollections.EVENTS_HAS_DATA, 'unique()', {
                event_id: savedEvent.$id,
                value: 0, // default value
            })

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
