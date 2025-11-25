import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'

interface LinkRedirectData {
  id: string
  originalUrl: string
  shortUrl: string
}

export function useLinkByShortUrl(shortUrl: string) {
  return useQuery({
    queryKey: ['link', shortUrl],
    queryFn: async () => {
      const { data } = await api.get<LinkRedirectData>(`/links/${shortUrl}`)
      return data
    },
    enabled: !!shortUrl,
    retry: false,
  })
}

export async function incrementLinkAccess(linkId: string) {
  await api.patch(`/links/${linkId}/access`)
}

