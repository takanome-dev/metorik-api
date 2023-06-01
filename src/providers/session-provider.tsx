import { createContext, useEffect, useReducer } from 'react'
import type { Models } from 'appwrite/types'

import appwrite from '@/lib/appwrite'
type SessionProviderContext = {
    session: Models.Session | null
    user: Models.User<{}> | null
    loading: boolean
    isLogged: boolean
    reset: () => void
}

const initialContext: SessionProviderContext = {
    session: null,
    user: null,
    loading: true,
    isLogged: false,
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
        const initSession = async () => {
            const session = await appwrite.account.getSession('current')
            if (!session) {
                dispatch({ type: 'SET_SESSION', payload: null })
                return
            }
            dispatch({ type: 'SET_SESSION', payload: session })
        }

        const initUser = async () => {
            const user = await appwrite.account.get()
            if (!user) {
                dispatch({ type: 'SET_USER', payload: null })
                return
            }
            dispatch({ type: 'SET_USER', payload: user })
        }

        initSession()
        initUser()
        dispatch({ type: 'SET_LOADING', payload: false })
    }, [])

    useEffect(() => {
        const isLogged = !!state.session && !!state.user
        dispatch({ type: 'SET_IS_LOGGED', payload: isLogged })
        dispatch({ type: 'SET_LOADING', payload: false })
    }, [state.session, state.user])

    return (
        <SessionContext.Provider
            value={{
                ...state,
                reset: () => dispatch({ type: 'RESET' }),
            }}
        >
            {children}
        </SessionContext.Provider>
    )
}
