import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import type { CreateLinkInput, Link } from '@/lib/schemas'

export function useLinks() {
  return useQuery({
    queryKey: ['links'],
    queryFn: async () => {
      const { data } = await api.get<Link[]>('/links')
      return data
    },
  })
}

export function useCreateLink() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: CreateLinkInput) => {
      const { data } = await api.post('/links', input)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] })
    },
  })
}

export function useDeleteLink() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/links/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] })
    },
  })
}

export function useExportLinks() {
  return useMutation({
    mutationFn: async () => {
      const { data } = await api.post<{ url: string }>('/links/export')
      return data
    },
  })
}

