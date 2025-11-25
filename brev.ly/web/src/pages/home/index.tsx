import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Download, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import logo from '@/assets/logo.svg'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/empty-state'
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
    <div className="min-h-screen w-full bg-[#E4E6EC] py-[88px]">
      <div className="max-w-[980px] mx-auto px-6">
        <img src={logo} alt="Brev.ly" className="mb-14" />

        <div className="flex flex-col lg:flex-row items-start gap-5">
          <div className="bg-[#F9F9FB] rounded-lg p-8 w-full lg:w-[380px] shrink-0">
            <h2 className="text-lg font-bold text-[#1F2025] leading-6 mb-6">
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

          <div className="bg-[#F9F9FB] rounded-lg p-8 w-full lg:w-[580px]">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-[#1F2025] leading-6">
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

            <div className="border-t border-[#CDCFD5]" />

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-[#74798B]" />
              </div>
            ) : !links?.length ? (
              <EmptyState />
            ) : (
              <div className="mt-5 space-y-3">
                {links.map((link) => (
                  <div
                    key={link.id}
                    className="p-4 rounded-lg border border-[#CDCFD5] bg-white"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#1F2025] truncate">
                          {link.shortUrl}
                        </p>
                        <p className="text-xs text-[#74798B] truncate mt-1">
                          {link.originalUrl}
                        </p>
                        <p className="text-xs text-[#4D505C] mt-2">
                          {link.accessCount} acessos
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
