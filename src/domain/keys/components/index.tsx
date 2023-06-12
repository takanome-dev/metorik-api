import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Menu } from '@headlessui/react'
import { Button, Text } from '@tremor/react'
import { IconCheck, IconCopy, IconDots, IconTrash } from 'tabler-icons'

import BodyCard from '@/components/ui/BodyCard/BodyCard'

import { useKeys } from './use-keys'

const metaProps = {
  heading: 'API Keys',
  description: 'Generate an API key to use with the Metorik',
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
          className={`w-full flex-col ${deleteKeyMutation.isLoading && 'blur-lg'
            } transition-all duration-300 ease-in-out`}
        >
          <div className="w-full flex items-center justify-between">
            <Text className="text-sm font-semibold">Active API key</Text>
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
                      className={`${active && 'bg-neutral-50'
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
                      className={`${active && 'bg-red-50 text-red-400'
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
        <Text className="text-neutral-400 text-sm">No keys found.</Text>
      )}
    </BodyCard>
  )
}
