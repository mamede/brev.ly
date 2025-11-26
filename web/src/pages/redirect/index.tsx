import { useEffect, useRef } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import icon from '@/assets/icon.svg'
import { incrementLinkAccess, useLinkByShortUrl } from '@/hooks/use-redirect'

export function Redirect() {
  const { shortUrl } = useParams<{ shortUrl: string }>()
  const navigate = useNavigate()
  const { data: link, isError } = useLinkByShortUrl(shortUrl || '')
  const hasHandledRef = useRef(false)
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!shortUrl || hasHandledRef.current) return

    if (isError) {
      navigate('/url/not-found')
      hasHandledRef.current = true
      return
    }

    if (!link) return

    hasHandledRef.current = true

    let url = link.originalUrl
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = `https://${url}`
    }

    incrementLinkAccess(link.id)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ['links'] })
        setTimeout(() => {
          window.location.href = url
        }, 300)
      })
      .catch(() => {
        setTimeout(() => {
          window.location.href = url
        }, 300)
      })
  }, [shortUrl, isError, link, navigate, queryClient])
  return (
    <main
      className="min-h-screen w-full flex items-center justify-center px-6 py-20 bg-gray-200"
    >
      <div className="w-full max-w-[540px] bg-gray-100 rounded-lg px-10 py-16 md:px-16 md:py-20 flex flex-col items-center gap-8 text-center">
        <div className="flex items-center justify-center">
          <img
            src={icon}
            alt="Logotipo do site com um ícone de corrente azul que representa um link."
            className="h-10 animate-pulse"
          />
        </div>

        <h1 className="text-lg font-bold text-gray-600">
          Redirecionando...
        </h1>

        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-500">
            O link será aberto automaticamente em alguns instantes.
          </p>

          <p className="text-sm text-gray-500">
            Não foi redirecionado?{' '}
            <a
              href="/"
              className="text-blue-base underline"
            >
              Acesse aqui
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}

