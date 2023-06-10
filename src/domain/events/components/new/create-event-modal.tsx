import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Dialog } from '@headlessui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, SelectBox, SelectBoxItem, Text, TextInput } from '@tremor/react'
import { motion } from 'framer-motion'
import { HTTPError } from 'ky'
import { IconChartBar, IconChartLine, IconMath } from 'tabler-icons'

import { useEvents } from '@/domain/shared/use-events'
import { fadeIn } from '@/utils/animations'

import { CreateEventInput, CreateEventSchema } from '../../schemas/events'

type ModalProps = {
    isOpen: boolean
    onClose: () => void
}

type FormValues = CreateEventInput

const CreateEventModal = ({ isOpen, onClose }: ModalProps) => {
    const { createEventMutation, invalidate } = useEvents()
    const form = useForm<FormValues>({
        mode: 'onChange',
        defaultValues: {
            type: 'numeric',
        },
        resolver: zodResolver(CreateEventSchema),
    })

    const onSubmit = form.handleSubmit(async (data) => {
        try {
            await createEventMutation.mutateAsync(data)
            toast.success('Event created successfully!')
            await invalidate()
            onClose()
        } catch (err) {
            if (err instanceof HTTPError) {
                const { error } = (await err.response.json()) as { error: string }
                toast.error(error)
                return
            }
            toast.error('An error has occured while creating the event.')
        }
    })

    return (
        <Dialog
            as={motion.div}
            {...fadeIn}
            className="fixed z-50 w-full h-full bg-neutral-900 bg-opacity-20 backdrop-blur-sm transition-all duration-300 ease-in-out inset-0 flex items-center justify-center"
            open={isOpen}
            onClose={onClose}
        >
            <Dialog.Panel className="bg-white rounded-xl p-5 max-w-lg shadow-xl">
                <Dialog.Title className="text-lg font-semibold text-neutral-700">Create Event</Dialog.Title>
                <Dialog.Description className="text-sm text-neutral-400">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.
                </Dialog.Description>
                <hr className="my-2 border-neutral-200" />

                <form className="flex flex-col gap-y-4" onSubmit={onSubmit}>
                    <div className="flex flex-col gap-y-1">
                        <div>
                            <Text className="text-sm">Name</Text>
                            <Text className="text-xs text-neutral-400">Will be used as a label on the dashboard.</Text>
                        </div>
                        <TextInput
                            error={!!form.formState.errors.title?.message}
                            errorMessage={form.formState.errors.title?.message}
                            placeholder="i.e Users logged"
                            {...form.register('title')}
                        />
                    </div>

                    <div className="flex flex-col gap-y-1">
                        <div>
                            <Text className="text-sm">Description</Text>
                            <Text className="text-xs text-neutral-400">Optional</Text>
                        </div>
                        <TextInput
                            error={!!form.formState.errors.description?.message}
                            errorMessage={form.formState.errors.description?.message}
                            placeholder="i.e : amount of users logged"
                            {...form.register('description')}
                        />
                    </div>

                    <div className="flex flex-col gap-y-1">
                        <div>
                            <Text className="text-sm">Identifier</Text>
                            <Text className="text-xs text-neutral-400">
                                A <b className="underline underline-offset-1">unique</b> identifier that you'll need to
                                dispatch on your API.
                            </Text>
                        </div>
                        <TextInput
                            error={!!form.formState.errors.identifier?.message}
                            errorMessage={form.formState.errors.identifier?.message}
                            placeholder="i.e USERS_LOGGED"
                            {...form.register('identifier')}
                        />
                    </div>

                    <div className="flex flex-col gap-y-1">
                        <div>
                            <Text className="text-sm">Type</Text>
                            <Text className="text-xs text-neutral-400">
                                The visualization type of the event that will be shown on the dashboard.
                            </Text>
                        </div>
                        <Controller
                            control={form.control}
                            name="type"
                            render={({ field }) => {
                                return (
                                    <SelectBox
                                        placeholder="Select a type"
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectBoxItem value="numeric" text="Numeric" icon={IconMath} />
                                        {/* <SelectBoxItem disabled value="bar" text="Bar" icon={IconChartBar} /> */}
                                        {/* <SelectBoxItem value="line" text="Line" icon={IconChartLine} /> */}
                                    </SelectBox>
                                )
                            }}
                        />
                    </div>

                    <dd className="w-full flex items-center justify-end gap-x-8">
                        <Button
                            type="button"
                            color="gray"
                            variant="light"
                            size="xs"
                            onClick={onClose}
                            disabled={createEventMutation.isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={!form.formState.isValid || createEventMutation.isLoading}
                            loading={createEventMutation.isLoading}
                            type="submit"
                            color="pink"
                            variant="primary"
                            size="xs"
                        >
                            Create
                        </Button>
                    </dd>
                </form>
            </Dialog.Panel>
        </Dialog>
    )
}
export default CreateEventModal
