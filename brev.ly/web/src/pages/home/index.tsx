import { useState } from 'react'
import { Download } from 'lucide-react'
import logo from '@/assets/logo.svg'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/empty-state'

export function Home() {
  const [originalUrl, setOriginalUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implementar criação de link
  }

  const handleExport = () => {
    // TODO: Implementar exportação
  }

  return (
    <div className="min-h-screen w-full bg-[#E4E6EC] py-[88px]">
      <div className="max-w-[980px] mx-auto px-6">
        <img src={logo} alt="Brev.ly" className="mb-14" />

        <div className="flex flex-col lg:flex-row items-start gap-5">
          <div className="bg-[#F9F9FB] rounded-lg p-8 w-full lg:w-[380px] shrink-0">
            <h2 className="text-lg font-bold text-[#1F2025] leading-6 mb-6">
              Novo link
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                label="Link original"
                placeholder="www.exemplo.com.br"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
              />

              <Input
                label="Link encurtado"
                placeholder="brev.ly/"
                value={shortUrl}
                onChange={(e) => setShortUrl(e.target.value)}
              />

              <Button
                type="submit"
                disabled={!originalUrl || !shortUrl}
              >
                Salvar link
              </Button>
            </form>
          </div>

          <div className="bg-[#F9F9FB] rounded-lg p-8 w-full lg:w-[580px]">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-[#1F2025] leading-6">
                Meus links
              </h2>
              <Button
                variant="secondary"
                onClick={handleExport}
                disabled
              >
                <Download className="w-4 h-4" />
                Baixar CSV
              </Button>
            </div>

            <div className="border-t border-[#CDCFD5]" />

            <EmptyState />
          </div>
        </div>
      </div>
    </div>
  )
}
