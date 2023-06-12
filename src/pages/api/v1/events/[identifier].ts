import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import { Client, Databases, Query } from 'node-appwrite'

import { Event } from '@/domain/events/schemas/events'
import { AppwriteCollections, DATABASE_ID } from '@/lib/appwrite'
import { middlewares } from '@/utils/api-middlewares'
const sdk = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY)

const dbs = new Databases(sdk)

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req
    await Promise.all(
        middlewares.map((middleware) => middleware(req as unknown as Request, res as unknown as Response, () => {}))
    )
    if (method !== 'POST') {
        res.setHeader('Allow', ['POST'])
        return res.status(405).json({ message: `Method ${method} not allowed` })
    }

    const { identifier } = req.query
    const token = req.headers.authorization?.replace('Bearer ', '')

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const parsedToken = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf-8')) as {
        id: string
        iat: number
        exp: number
    }

    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)

    if (!verifiedToken) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    // check expiration
    const now = Math.floor(Date.now() / 1000)
    if (parsedToken.exp < now) {
        return res.status(401).json({ message: 'Key has expired.' })
    }

    const foundEventByIdentifier = await dbs.listDocuments(DATABASE_ID, AppwriteCollections.EVENTS)

    const foundEvenRelated = foundEventByIdentifier.documents.find((event) => {
        const e: Event = event as unknown as Event
        return e.identifier === identifier && e.user_id === parsedToken.id
    })

    if (!foundEvenRelated) {
        return res.status(404).json({ message: `Event not found with the identifier ${identifier}.` })
    }

    const event = foundEventByIdentifier.documents[0]

    const eventsWithData = await dbs.listDocuments(DATABASE_ID, AppwriteCollections.EVENTS_HAS_DATA, [
        Query.equal('event_id', event.$id),
    ])

    const today = new Date().toISOString().split('T')[0]

    const foundEventWithDataToday = eventsWithData.documents.find((event) => {
        return event.$createdAt.split('T')[0] === today
    }) as unknown as Event

    if (foundEventWithDataToday) {
        await dbs.updateDocument(DATABASE_ID, AppwriteCollections.EVENTS_HAS_DATA, foundEventWithDataToday.$id, {
            value: foundEventWithDataToday.value ? foundEventWithDataToday.value + 1 : 1,
        })
    } else {
        await dbs.createDocument(DATABASE_ID, AppwriteCollections.EVENTS_HAS_DATA, 'unique()', {
            event_id: event.$id,
            value: 1,
        })
    }

    return res.status(200).json({
        message: `${identifier} has been dispatched`,
        metadata: {
            value: foundEventWithDataToday.value ? foundEventWithDataToday.value + 1 : 1,
        },
    })
}
