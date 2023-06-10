import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import KeysService from '../services/keys'

export const useKeys = () => {
    const keysQuery = useQuery(['keys'], KeysService.list)
    const queryClient = useQueryClient()

    const createKeyMutation = useMutation(async () => {
        await KeysService.create()
        await queryClient.invalidateQueries(['keys'])
    })
    const deleteKeyMutation = useMutation(async () => {
        await KeysService.delete()
        await queryClient.invalidateQueries(['keys'])
    })

    return {
        keysQuery,
        createKeyMutation,
        deleteKeyMutation,
    }
}
