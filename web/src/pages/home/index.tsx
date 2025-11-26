import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Download, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import logo from '@/assets/logo.svg'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/empty-state'
import { LinkCard } from '@/components/link-card'
import { useLinks, useCreateLink, useExportLinks } from '@/hooks/use-links'
import { createLinkSchema, type CreateLinkInput } from '@/lib/schemas'

export function Home() {
  const { data: links, isLoading } = useLinks()
  const { mutate: createLink, isPending: isCreating } = useCreateLink()
  const { mutate: exportLinks, isPending: isExporting } = useExportLinks()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateLinkInput>({
    resolver: zodResolver(createLinkSchema),
  })

  const onSubmit = (data: CreateLinkInput) => {
    createLink(data, {
      onSuccess: () => {
        toast.success('Link criado com sucesso!')
        reset()
      },
      onError: (error) => {
        const message =
          (error as { response?: { data?: { message?: string } } })
            .response?.data?.message || 'Erro ao criar link'
        toast.error(message)
      },
    })
  }

  const handleExport = () => {
    exportLinks(undefined, {
      onSuccess: (data) => {
        window.open(data.url, '_blank')
        toast.success('CSV exportado com sucesso!')
      },
      onError: () => {
        toast.error('Erro ao exportar CSV')
      },
    })
  }

  return (
    <div className="min-h-screen w-full bg-gray-200 py-[88px]">
      <div className="max-w-[980px] mx-auto px-6">
        <img src={logo} alt="Brev.ly" className="mb-14" />

        <div className="flex flex-col lg:flex-row items-start gap-5">
          <div className="bg-gray-100 rounded-lg p-8 w-full lg:w-[380px] shrink-0">
            <h2 className="text-lg font-bold text-gray-600 leading-6 mb-6">
              Novo link
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <Input
                label="Link original"
                placeholder="www.exemplo.com.br"
                error={errors.originalUrl?.message}
                {...register('originalUrl')}
              />

              <Input
                label="Link encurtado"
                placeholder="brev.ly/"
                error={errors.shortUrl?.message}
                {...register('shortUrl')}
              />

              <Button type="submit" disabled={isCreating}>
                {isCreating && <Loader2 className="w-4 h-4 animate-spin" />}
                Salvar link
              </Button>
            </form>
          </div>

          <div className="bg-gray-100 rounded-lg p-8 w-full lg:w-[580px]">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-gray-600 leading-6">
                Meus links
              </h2>
              <Button
                variant="secondary"
                onClick={handleExport}
                disabled={!links?.length || isExporting}
              >
                {isExporting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                Baixar CSV
              </Button>
            </div>

            <div className="border-t border-gray-300" />

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
              </div>
            ) : !links?.length ? (
              <EmptyState />
            ) : (
              <div className="max-h-[480px] overflow-y-auto scrollbar-custom">
                {links.map((link) => (
                  <LinkCard key={link.id} link={link} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
