import { Account, Client, Databases } from 'appwrite'

export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID

export enum AppwriteCollections {
    EVENTS = '64781b323cd0ebcc6543',
    EVENTS_HAS_DATA = '64783d9d9062e692d5dc',
    USERS_HAS_KEYS = '648239b659428c033a3a',
}

const client = new Client()
client.setEndpoint('https://cloud.appwrite.io/v1').setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)

const account = new Account(client)
const database = new Databases(client)

export default {
    client,
    account,
    database,
}
