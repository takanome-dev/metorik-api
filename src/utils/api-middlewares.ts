import { Request } from 'express'
import rateLimit from 'express-rate-limit'
import slowDown from 'express-slow-down'
import type { NextApiRequest } from 'next/types'

const getIP = (request: Request) =>
    request.ip ||
    request.headers['x-forwarded-for'] ||
    request.headers['x-real-ip'] ||
    request.connection.remoteAddress ||
    ''

const limit = 10

const windowMs = 60 * 1_000 // 1 minute
const delayAfter = Math.round(limit / 2) // begin slowing down responses after the 5th request
const delayMs = 500 // slow down subsequent responses by 500 milliseconds per request

export const middlewares = [
    slowDown({ keyGenerator: getIP as any, windowMs, delayAfter, delayMs }),
    rateLimit({ keyGenerator: getIP as any, windowMs, max: limit }),
]
