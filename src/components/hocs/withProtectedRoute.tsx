import { ComponentType, useContext, useEffect, useState } from 'react'
import { LoaderIcon } from 'react-hot-toast'
import { useRouter } from 'next/router'

import appwrite from '@/lib/appwrite'
import { SessionContext } from '@/providers/session-provider'
import { createJWT } from '@/utils/api'

const RedirectTo = ({ to }: { to: string }) => {
    const router = useRouter()

    useEffect(() => {
        router.push(to)
    }, [router, to])

    return null
}

export default function withProtectedRoute<P extends object>(Component: ComponentType<P>) {
    return function WithProtectedRoute(props: P) {
        const { isLogged, session, user, dispatch } = useContext(SessionContext)
        const [isLoading, setIsLoading] = useState(true)
        const [times, setTimes] = useState(0)

        useEffect(() => {
            if (!dispatch || isLogged) {
                setIsLoading(false)
                return
            }

            const interval = setInterval(async () => {
                console.log('interval running')
                if (times > 3) {
                    setIsLoading(false)
                    window.location.href = '/sign-in'
                    return
                }

                if (session) {
                    if (user) {
                        const jwtStorage = localStorage.getItem('jwt')
                        if (jwtStorage) {
                            console.log('jwt already created')
                            setIsLoading(false)
                            clearInterval(interval)
                            setTimes(0)
                            return
                        }
                        console.log('#49 - jwt not created')
                        const { jwt } = await createJWT()
                        localStorage.setItem('jwt', jwt)
                        clearInterval(interval)
                    }
                } else {
                    console.log('no session, now checking')
                    const sessionTemp = await appwrite.account.getSession('current')

                    if (!sessionTemp) {
                        dispatch({ type: 'SET_SESSION', payload: null })
                        setIsLoading(false)
                        window.location.href = '/sign-in'
                        return
                    }

                    dispatch({ type: 'SET_SESSION', payload: sessionTemp })

                    const userTemp = await appwrite.account.get()

                    if (!userTemp) {
                        dispatch({ type: 'SET_SESSION', payload: null })
                        setIsLoading(false)
                        window.location.href = '/sign-in'
                        return
                    }

                    dispatch({ type: 'SET_USER', payload: userTemp })

                    if (userTemp && sessionTemp) {
                        const jwtStorage = localStorage.getItem('jwt')
                        if (jwtStorage) {
                            return
                        }
                        console.log('#82 - jwt not created')
                        const { jwt } = await createJWT()
                        localStorage.setItem('jwt', jwt)
                        console.log('jwt created')
                        clearInterval(interval)
                        setTimes(0)
                    }
                }

                setTimes((prev) => prev + 1)
                setIsLoading(false)
            }, 2500) //

            return () => clearInterval(interval)
        }, [dispatch, isLogged, session, user, times])

        if (isLoading) {
            return (
                <div className="flex items-center justify-center bg-neutral-50 h-full w-full isolate">
                    <LoaderIcon className="animate-spin" />
                </div>
            )
        }

        return <Component {...props} />
    }
}
