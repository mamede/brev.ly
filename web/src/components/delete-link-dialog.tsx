import { AlertTriangle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'

interface DeleteLinkDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  linkShortUrl: string
}

export function DeleteLinkDialog({
  open,
  onOpenChange,
  onConfirm,
  linkShortUrl,
}: DeleteLinkDialogProps) {
  const handleConfirm = () => {
    onConfirm()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="bg-gray-100 border-gray-300 p-6 gap-5 max-w-[420px]"
        showCloseButton={false}
      >
        <DialogHeader className="gap-0 space-y-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-danger/10 shrink-0">
              <AlertTriangle className="h-5 w-5 text-danger" />
            </div>
            <DialogTitle className="text-gray-600 text-lg font-bold leading-6">
              Deletar link
            </DialogTitle>
          </div>
          <DialogDescription className="text-gray-500 text-sm leading-[22px] text-left">
            Tem certeza que deseja deletar o link{' '}
            <strong className="text-gray-600 font-semibold">
              brev.ly/{linkShortUrl}
            </strong>
            ? Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-3 sm:gap-3 flex-row sm:flex-row justify-end">
          <button
            onClick={() => onOpenChange(false)}
            className="h-12 px-5 rounded-lg font-semibold text-sm leading-[18px] bg-gray-200 text-gray-500 hover:opacity-90 transition-opacity"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="h-12 px-5 rounded-lg font-semibold text-sm leading-[18px] bg-danger text-white hover:opacity-90 transition-opacity"
          >
            Deletar
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

