import { NextApiRequest, NextApiResponse } from 'next'

import appwrite from '@/lib/appwrite'

export const createJWT = async () => {
    return await appwrite.account.createJWT()
}

export const getJWT = () => {
    return localStorage.getItem('jwt')
}

export const presetJWT = (req: NextApiRequest, res: NextApiResponse) => {
    const { authorization } = req.headers
    const jwt = authorization?.replace('Bearer ', '')
    if (!jwt) return res.status(401).json({ error: 'Unauthorized' })
    appwrite.account.client.setJWT(jwt)
}


export type ApiGetResponse<T> = {
    documents: T[]
    total: number
}