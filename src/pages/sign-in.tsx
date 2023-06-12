import { ErrorBoundary } from 'react-error-boundary'
import { NextSeo } from 'next-seo'

import SignIn from '@/domain/sign-in/components'

const ErrorFallback = () => <div>Something went wrong!</div>

const SignInPage = () => (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
        <NextSeo title="Sign-in" />
        <SignIn />
    </ErrorBoundary>
)

export default SignInPage
