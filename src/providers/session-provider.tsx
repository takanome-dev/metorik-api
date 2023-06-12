import { createContext, useEffect, useReducer, useState } from 'react'
import type { Models } from 'appwrite/types'

import appwrite from '@/lib/appwrite'
import { createJWT } from '@/utils/api'
type SessionProviderContext = {
    session: Models.Session | null
    user: Models.User<{}> | null
    loading: boolean
    isLogged: boolean
    dispatch?: React.Dispatch<Action>
    reset: () => void
}

const initialContext: SessionProviderContext = {
    session: null,
    user: null,
    loading: true,
    isLogged: false,
    dispatch: () => {},
    reset: () => {},
}

export const SessionContext = createContext<SessionProviderContext>(initialContext)

type Action =
    | { type: 'SET_SESSION'; payload: Models.Session | null }
    | { type: 'SET_USER'; payload: Models.User<{}> | null }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_IS_LOGGED'; payload: boolean }
    | { type: 'RESET' }

const reducer = (state: SessionProviderContext, action: Action) => {
    switch (action.type) {
        case 'SET_SESSION':
            return {
                ...state,
                session: action.payload,
            }
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
            }
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload,
            }
        case 'SET_IS_LOGGED':
            return {
                ...state,
                isLogged: action.payload,
            }
        case 'RESET':
            return initialContext
        default:
            return state
    }
}

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialContext)

    useEffect(() => {
        if (!localStorage.getItem('jwt')) {
            return
        }

        const initSession = async () => {
            try {
                const session = await appwrite.account.getSession('current')
                if (!session) {
                    dispatch({ type: 'SET_SESSION', payload: null })
                    return
                }
                dispatch({ type: 'SET_SESSION', payload: session })
            } catch (err) {
                console.error('Error getting session', err)
                localStorage.removeItem('jwt')
            }
        }

        const initUser = async () => {
            try {
                const user = await appwrite.account.get()
                if (!user) {
                    dispatch({ type: 'SET_USER', payload: null })
                    return
                }
                dispatch({ type: 'SET_USER', payload: user })
            } catch (error) {
                localStorage.removeItem('jwt')
            }
        }

        initSession()
        initUser()
        dispatch({ type: 'SET_LOADING', payload: false })
    }, [])

    useEffect(() => {
        if (!localStorage.getItem('jwt')) {
            return
        }

        const isLogged = !!state.session && !!state.user
        dispatch({ type: 'SET_IS_LOGGED', payload: isLogged })
        if (!isLogged) return
        dispatch({ type: 'SET_LOADING', payload: false })
    }, [state.session, state.user])

    console.log(state)
    return (
        <SessionContext.Provider
            value={{
                ...state,
                dispatch,
                reset: () => dispatch({ type: 'RESET' }),
            }}
        >
            {children}
        </SessionContext.Provider>
    )
}
