import { Query } from 'appwrite'
import type { Request, Response } from 'express'
import { NextApiRequest, NextApiResponse } from 'next'

import appwrite, { AppwriteCollections, DATABASE_ID } from '@/lib/appwrite'
import { presetJWT } from '@/utils/api'
import { middlewares } from '@/utils/api-middlewares'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req

    if (method !== 'POST') {
        res.setHeader('Allow', ['POST'])
        return res.status(405).json({ message: `Method ${method} not allowed` })
    }

    await Promise.all(
        middlewares.map((middleware) => middleware(req as unknown as Request, res as unknown as Response, () => {}))
    )
    const { identifier } = req.query

    try {
        presetJWT(req, res)
        const userLogged = await appwrite.account.get()
        if (!userLogged.$id) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        const foundEventByIdentifier = await appwrite.database.listDocuments(DATABASE_ID, AppwriteCollections.EVENTS, [
            Query.equal('identifier', identifier as string),
        ])

        if (!foundEventByIdentifier.total) {
            return res.status(404).json({ message: 'Event not found' })
        }

        const event = foundEventByIdentifier.documents.find(Boolean) // find the first non null value / first element

        if (!event) {
            return res.status(404).json({ message: 'Event not found' })
        }

        const eventsWithData = await appwrite.database.listDocuments(DATABASE_ID, AppwriteCollections.EVENTS_HAS_DATA, [
            Query.equal('event_id', event.$id),
        ])

        const today = new Date().toISOString().split('T')[0]

        const foundEventWithDataToday = eventsWithData.documents.find((event) => {
            return event.$createdAt.split('T')[0] === today
        })

        if (foundEventWithDataToday) {
            await appwrite.database.updateDocument(
                DATABASE_ID,
                AppwriteCollections.EVENTS_HAS_DATA,
                foundEventWithDataToday.$id,
                {
                    value: foundEventWithDataToday.value + 1,
                }
            )
        } else {
            await appwrite.database.createDocument(DATABASE_ID, AppwriteCollections.EVENTS_HAS_DATA, 'unique()', {
                event_id: event.$id,
                value: 1,
            })
        }

        return res.status(200).json({ message: 'Event dispatched!' })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error', error: err })
    }
}
