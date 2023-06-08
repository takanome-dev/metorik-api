// This file is automatically included by TypeScript, add all your environment variables here for type safety
declare namespace NodeJS {
    export interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test'
        NEXT_PUBLIC_APPWRITE_PROJECT_ID: string
        NEXT_PUBLIC_APPWRITE_DATABASE_ID: string
        APPWRITE_API_KEY: string
    }
}
