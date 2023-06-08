import { ErrorBoundary } from 'react-error-boundary'

import SignIn from '@/domain/sign-in/components'

const ErrorFallback = () => <div>Something went wrong!</div>

const SignInPage = () => (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
        <SignIn />
    </ErrorBoundary>
)

export default SignInPage
