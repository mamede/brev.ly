import { Link } from 'lucide-react'

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-5">
      <Link className="w-8 h-8 text-gray-400" strokeWidth={1.5} />
      <p className="text-[10px] leading-[14px] text-gray-500 uppercase text-center">
        Ainda não existem links cadastrados
      </p>
    </div>
  )
}

