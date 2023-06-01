import React, { useEffect } from 'react'

import appwrite from '@/lib/appwrite'

type Props = {}

const Dashboard = (props: Props) => {
    useEffect(() => {
        ;(async () => {
            const session = await appwrite.account.get()
            console.log(session)
        })()
    }, [])
    return <div>Dashboard</div>
}

export default Dashboard
