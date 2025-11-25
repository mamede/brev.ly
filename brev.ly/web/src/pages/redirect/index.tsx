import { useParams } from 'react-router-dom'
import icon from '@/assets/icon.svg'

export function Redirect() {
  const { shortUrl } = useParams<{ shortUrl: string }>()
  console.log(shortUrl)
  return (
    <main
      className="min-h-screen w-full flex items-center justify-center px-6 py-20 bg-[#E4E6EC]"
    >
      <div className="w-full max-w-[540px] bg-[#F9F9FB] rounded-lg px-10 py-16 md:px-16 md:py-20 flex flex-col items-center gap-8 text-center">
        <div className="flex items-center justify-center">
          <img
            src={icon}
            alt="Logotipo do site com um ícone de corrente azul que representa um link."
            className="h-10 animate-pulse"
          />
        </div>

        <h1 className="text-lg font-bold text-[#1F2025]">
          Redirecionando...
        </h1>

        <div className="flex flex-col gap-2">
          <p className="text-sm text-[#4D505C]">
            O link será aberto automaticamente em alguns instantes.
          </p>

          <p className="text-sm text-[#4D505C]">
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

