import { Copy, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { useDeleteLink } from '@/hooks/use-links'
import type { Link } from '@/lib/schemas'

interface LinkCardProps {
  link: Link
}

export function LinkCard({ link }: LinkCardProps) {
  const { mutate: deleteLink } = useDeleteLink()

  const handleCopy = () => {
    const fullUrl = `${window.location.origin}/${link.shortUrl}`
    navigator.clipboard.writeText(fullUrl)
    toast.success('Link copiado!')
  }

  const handleDelete = () => {
    deleteLink(link.id, {
      onSuccess: () => {
        toast.success('Link deletado!')
      },
      onError: () => {
        toast.error('Erro ao deletar link')
      },
    })
  }

  return (
    <div className="flex items-start justify-between gap-4 py-4 border-b border-gray-300 last:border-b-0">
      <div className="flex-1 min-w-0">
        <a
          href={`/${link.shortUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-blue-base hover:underline block truncate"
        >
          brev.ly/{link.shortUrl}
        </a>
        <p className="text-xs text-gray-400 truncate mt-1">
          {link.originalUrl}
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <span className="text-xs text-gray-500">
          {link.accessCount} acessos
        </span>

        <button
          onClick={handleCopy}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Copiar link"
        >
          <Copy className="w-4 h-4 text-gray-400" />
        </button>

        <button
          onClick={handleDelete}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Deletar link"
        >
          <Trash2 className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </div>
  )
}

