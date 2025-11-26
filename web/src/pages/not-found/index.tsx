import { useNavigate } from 'react-router-dom'
import icon404 from '@/assets/404.svg'

export function NotFound() {
  const navigate = useNavigate()

  return (
    <main className="min-h-screen w-full flex items-center justify-center px-6 py-20 bg-gray-200">
      <div className="w-full max-w-[540px] bg-gray-100 rounded-lg px-10 py-16 md:px-16 md:py-20 flex flex-col items-center gap-8 text-center">
        <img
          src={icon404}
          alt="Texto 404 com efeito glitch nas cores azul e vermelho."
          className="h-20"
        />

        <h1 className="text-lg font-bold text-gray-600">
          Link não encontrado
        </h1>

        <p className="max-w-md text-sm text-gray-500">
          O link que você está tentando acessar não existe, foi removido ou é
          uma URL inválida. Saiba mais em{' '}
          <button
            type="button"
            onClick={() => navigate('/')}
            className="text-blue-base underline"
          >
            brev.ly
          </button>
          .
        </p>
      </div>
    </main>
  )
}

