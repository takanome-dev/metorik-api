import { QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'

import queryClient from '@/lib/tanstack-query'

import defaultSeo from '../../next-seo.config'

import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <DefaultSeo {...defaultSeo} />
            <Component {...pageProps} />
        </QueryClientProvider>
    )
}
