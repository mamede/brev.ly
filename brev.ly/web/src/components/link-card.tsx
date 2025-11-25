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
    <div className="flex items-start justify-between gap-4 py-4 border-b border-[#CDCFD5] last:border-b-0">
      <div className="flex-1 min-w-0">
        <a
          href={`/${link.shortUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-[#2C46B1] hover:underline block truncate"
        >
          brev.ly/{link.shortUrl}
        </a>
        <p className="text-xs text-[#74798B] truncate mt-1">
          {link.originalUrl}
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <span className="text-xs text-[#4D505C]">
          {link.accessCount} acessos
        </span>
        
        <button
          onClick={handleCopy}
          className="p-2 hover:bg-[#E4E6EC] rounded transition-colors"
          title="Copiar link"
        >
          <Copy className="w-4 h-4 text-[#74798B]" />
        </button>

        <button
          onClick={handleDelete}
          className="p-2 hover:bg-[#E4E6EC] rounded transition-colors"
          title="Deletar link"
        >
          <Trash2 className="w-4 h-4 text-[#74798B]" />
        </button>
      </div>
    </div>
  )
}

