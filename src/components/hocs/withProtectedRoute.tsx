import { ComponentType, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'

import { SessionContext } from '@/providers/session-provider'

const RedirectTo = ({ to }: { to: string }) => {
    const router = useRouter()

    useEffect(() => {
        router.push(to)
    }, [router, to])

    return null
}

export default function withProtectedRoute<P extends object>(Component: ComponentType<P>) {
    return function WithProtectedRoute(props: P) {
        const { isLogged, session, user, loading } = useContext(SessionContext)

        if (loading) {
            return <div>Loading...</div>
        }

        if ((!isLogged || !session || !user) && !loading) {
            return <RedirectTo to="/sign-in" />
        }

        return <Component {...props} />
    }
}
