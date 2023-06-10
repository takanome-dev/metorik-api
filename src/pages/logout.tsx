import { useEffect } from 'react'

import appwrite from '@/lib/appwrite'

const LogoutPage = () => {
    useEffect(() => {
        localStorage.removeItem('jwt')
        appwrite.account.deleteSession('current').then(() => (window.location.href = '/'))
    }, [])

    return null
}

export default LogoutPage
