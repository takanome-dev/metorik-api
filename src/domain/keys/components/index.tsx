import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Menu } from '@headlessui/react'
import { Button, Divider, Text } from '@tremor/react'
import dayjs from 'dayjs'
import { HTTPError } from 'ky'
import Link from 'next/link'
import { IconCheck, IconCopy, IconDots, IconKey, IconTrash } from 'tabler-icons'

import BodyCard from '@/components/ui/BodyCard/BodyCard'

import { useKeys } from './use-keys'

const metaProps = {
    heading: 'API Key',
    description: 'Generate an API key to use inside your server code to access our API.',
}

export const KeysOverview = () => {
    const [copied, setCopied] = useState(false)
    const { keysQuery, createKeyMutation, deleteKeyMutation } = useKeys()
    const keys = keysQuery.data?.documents

    const onCreate = async () => {
        try {
            await createKeyMutation.mutateAsync()
            toast.success('Key created successfully')
        } catch (err) {
            if (err instanceof HTTPError) {
                if (err.response.status === 429) {
                    toast.error('You have reached the maximum number of keys')
                    return
                }
            }
            toast.error('Something went wrong')
        }
    }

    const onDelete = async () => {
        try {
            await deleteKeyMutation.mutateAsync()
            toast.success('Key deleted successfully')
        } catch (err) {
            toast.error('Something went wrong')
        }
    }

    const onCopy = () => {
        if (!keys?.length) return
        const keyValue = keys[0].key
        if (!keyValue) return
        navigator.clipboard.writeText(keyValue)
        setCopied(true)
        toast.success('Copied to clipboard')
    }

    useEffect(() => {
        if (!copied) return
        const timeout = setTimeout(() => {
            setCopied(false)
        }, 2000)
        return () => clearTimeout(timeout)
    }, [copied])

    return (
        <BodyCard
            {...metaProps}
            header={
                <Button
                    className="ml-auto"
                    variant="secondary"
                    color="pink"
                    size="xs"
                    onClick={onCreate}
                    disabled={createKeyMutation.isLoading}
                    loading={createKeyMutation.isLoading}
                >
                    Create Key
                </Button>
            }
        >
            {!!keys?.length ? (
                <div
                    className={`w-full flex-col ${
                        deleteKeyMutation.isLoading && 'blur-lg'
                    } transition-all duration-300 ease-in-out`}
                >
                    <div className="w-full flex items-center justify-between">
                        <div className="grid mb-3">
                            <Text className="text-sm font-semibold">Active API key</Text>
                            <div className="flex items-center gap-x-2">
                                <Text className="text-xs text-neutral-400">
                                    Generated : {dayjs(keys.at(0)?.$createdAt).format('DD MMM YYYY , HH:mm a')}
                                </Text>
                                <span className="text-neutral-200 text-sm">|</span>
                                <Text className="text-xs text-neutral-400">
                                    Valid until :{' '}
                                    {dayjs(keys.at(0)?.$createdAt).add(365, 'day').format('DD MMM YYYY , HH:mm a')}
                                </Text>
                            </div>
                        </div>
                        <Menu>
                            <Menu.Button className="hover:bg-neutral-50 p-2 rounded transition-all duration-200 ease-in-out">
                                <IconDots className="w-4 h-4" />
                            </Menu.Button>
                            <Menu.Items className="absolute z-10 xl:min-w-[15rem] right-8 flex-col flex gap-y-4 top-10 p-4 bg-white rounded-xl shadow-lg border border-neutral-200">
                                <small>Actions</small>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            type="button"
                                            onClick={onCopy}
                                            className={`${
                                                active && 'bg-neutral-50'
                                            } px-2.5 py-1.5 transition-all duration-300 ease-in-out hover:pl-2 flex items-center gap-x-2 rounded group`}
                                        >
                                            {copied ? (
                                                <>
                                                    <IconCheck className="w-4 h-4 mr-2 group-hover:-rotate-12 transition-all duration-300 ease-in-out" />
                                                    Copied!
                                                </>
                                            ) : (
                                                <>
                                                    <IconCopy className="w-4 h-4 mr-2 group-hover:-rotate-12 transition-all duration-300 ease-in-out" />
                                                    Copy
                                                </>
                                            )}
                                        </button>
                                    )}
                                </Menu.Item>
                                <hr />
                                <small>Danger Zone</small>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            type="button"
                                            onClick={onDelete}
                                            className={`${
                                                active && 'bg-red-50 text-red-400'
                                            }  px-2.5 py-1.5 transition-all duration-300 ease-in-out hover:pl-2 flex items-center gap-x-2 rounded group`}
                                        >
                                            <IconTrash className="w-4 h-4 mr-2 group-hover:-rotate-12 transition-transform duration-300 ease-in-out" />
                                            Delete
                                        </button>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Menu>
                    </div>
                    <div
                        className={`
                            p-2 transition-all duration-300 ease-in-out relative font-mono rounded border
                            ${copied ? 'bg-green-50 text-green-400' : 'bg-neutral-100 text-neutral-400'}
                            `}
                    >
                        {keys[0].key.substr(0, 20)}...
                        <Button
                            onClick={onCopy}
                            className="outline-none focus:ring-0 absolute right-2 top-1/2 transform -translate-y-1/2"
                            color="gray"
                            variant="light"
                            size="md"
                        >
                            {copied ? <IconCheck className="w-4 h-4" /> : <IconCopy className="w-4 h-4" />}
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="col-span-full flex flex-col gap-y-2 items-center justify-center h-full text-center text-neutral-500">
                    <div className="p-4 bg-neutral-100 border text-neutral-600 rounded-full">
                        <IconKey className="w-4 h-4" />
                    </div>

                    <Text className="text-xl font-semibold text-neutral-400 tracking-tight">No API key generated</Text>
                    <Text className="text-neutral-400">
                        Create a key by clicking{' '}
                        <button onClick={onCreate} className="underline underline-offset-2 text-pink-400">
                            here
                        </button>
                    </Text>
                </div>
            )}
        </BodyCard>
    )
}
