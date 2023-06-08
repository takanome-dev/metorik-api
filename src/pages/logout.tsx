import { useEffect } from 'react'

import appwrite from '@/lib/appwrite'

const LogoutPage = () => {
    useEffect(() => {
        appwrite.account.deleteSession('current').then(() => (window.location.href = '/'))
    }, [])

    return null
}

export default LogoutPage
