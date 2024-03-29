import { useContext, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import Image from 'next/image'
import { useRouter } from 'next/router'

import appwrite from '@/lib/appwrite'
import { SessionContext } from '@/providers/session-provider'

const SignIn = () => {
  const { query, push } = useRouter()
  const { isLogged } = useContext(SessionContext)

  const signInWithGitHub = async () => {
    appwrite.account.createOAuth2Session(
      'github',
      `${process.env.NEXT_PUBLIC_PROD_URL}/a/dashboard`,
      `${process.env.NEXT_PUBLIC_PROD_URL}/sign-in?error=github`
    )
  }

  useEffect(() => {
    if (!isLogged) return
    push('/a/dashboard')
  }, [isLogged, push])

  useEffect(() => {
    if (!query.error) return

    toast.error('An error occurred while signing in with GitHub. Please try again.')
  }, [query])

  return (
    <>
      <div className="flex flex-col justify-center flex-1 min-h-full py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image width={803} height={188} className="w-32 mx-auto" src="/logo-icon.png" alt="METORIK" />
          <h2 className="mt-2 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="px-6 py-12 bg-white shadow sm:rounded-lg sm:px-12">
            <div>
              <div className="grid grid-cols-1 gap-y-4">
                <button
                  onClick={signInWithGitHub}
                  className="flex w-full hover:bg-neutral-400 transition-all duration-200 items-center justify-center gap-3 rounded-md bg-[#24292F] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]"
                >
                  <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-semibold leading-6">GitHub</span>
                </button>
                <p className="text-sm text-center text-neutral-400">
                  Get started with Metorik today and start tracking your API usage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignIn
