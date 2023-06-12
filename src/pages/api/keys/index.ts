import { Query } from 'appwrite'
import type { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'

import appwrite, { AppwriteCollections, DATABASE_ID } from '@/lib/appwrite'
import { presetJWT } from '@/utils/api'
import { middlewares } from '@/utils/api-middlewares'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await Promise.all(
    middlewares.map((middleware) => middleware(req as unknown as Request, res as unknown as Response, () => { }))
  )
  const { method } = req
  presetJWT(req, res)
  const userLogged = await appwrite.account.get()
  if (!userLogged.$id) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  switch (method) {
    case 'GET': {
      const foundKeyByUserId = await appwrite.database.listDocuments(
        DATABASE_ID,
        AppwriteCollections.USERS_HAS_KEYS,
        [Query.equal('user_id', userLogged.$id)]
      )
      return res.status(200).json(foundKeyByUserId)
    }
    case 'POST': {
      try {
        const foundKeyByUserId = await appwrite.database.listDocuments(
          DATABASE_ID,
          AppwriteCollections.USERS_HAS_KEYS,
          [Query.equal('user_id', userLogged.$id)]
        )

        if (!!foundKeyByUserId.total) {
          return res.status(429).json({ error: 'User already has a key' })
        }

        const token = jwt.sign({ id: userLogged.$id }, process.env.JWT_SECRET, { expiresIn: '365d' })

        const savedToken = await appwrite.database.createDocument(
          DATABASE_ID,
          AppwriteCollections.USERS_HAS_KEYS,
          'unique()',
          {
            user_id: userLogged.$id,
            key: token,
            read: false,
          }
        )

        return res.status(200).json({ token: savedToken })
      } catch (error) {
        return res.status(500).json({ error: 'Internal server error', message: error })
      }
    }
    case 'DELETE': {
      try {
        const foundKeyByUserId = await appwrite.database.listDocuments(
          DATABASE_ID,
          AppwriteCollections.USERS_HAS_KEYS,
          [Query.equal('user_id', userLogged.$id)]
        )

        if (!foundKeyByUserId.total) {
          return res.status(400).json({ error: "User doesn't have a key" })
        }

        await appwrite.database.deleteDocument(
          DATABASE_ID,
          AppwriteCollections.USERS_HAS_KEYS,
          foundKeyByUserId.documents[0].$id
        )
        return res.status(200).json({ message: 'Key deleted' })
      } catch (error) {
        return res.status(500).json({ error: 'Internal server error', message: error })
      }
    }
    default:
      res.setHeader('Allow', ['POST', 'GET'])
      return res.status(405).json({ message: `Method ${method} not allowed` })
  }
}
