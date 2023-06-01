import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {}

const Home = (props: Props) => {
    return (
        <div className="relative bg-white">
            <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
                <div className="px-6 pt-10 pb-24 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6">
                    <div className="max-w-2xl mx-auto lg:mx-0">
                        <Image className="w-24 h-24" width={500} height={500} src="/logo.png" alt="METORIK-API" />
                        <div className="hidden sm:mt-32 sm:flex lg:mt-16">
                            <div className="relative px-3 py-1 text-sm leading-6 text-gray-500 rounded-full ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                                Get Started Today and Optimize Your API Performance{' '}
                                <a href="#" className="font-semibold text-rose-600 whitespace-nowrap">
                                    <span className="absolute inset-0" aria-hidden="true" />
                                    Start free <span aria-hidden="true">&rarr;</span>
                                </a>
                            </div>
                        </div>
                        <h1 className="mt-24 text-4xl font-bold tracking-tight text-gray-900 sm:mt-10 sm:text-6xl">
                            Unlock the Power of API Analytics with <span className="text-rose-400">Metorik-API</span>
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Uncover Actionable Insights, Track Key Metrics, and Optimize Your API Performance with
                            Metorik-API — The Comprehensive Analytics Solution Built for Developers and Small
                            Businesses.
                        </p>
                        <div className="flex items-center mt-10 gap-x-6">
                            <Link
                                href="/sign-in"
                                className="rounded-md bg-rose-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
                            >
                                Get started
                            </Link>
                            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                                Learn more <span aria-hidden="true">→</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
                    <Image
                        className="aspect-[3/2] w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
                        alt=""
                        src="/hero.png"
                        width={832}
                        height={1456}
                    />
                </div>
            </div>
        </div>
    )
}

export default Home
