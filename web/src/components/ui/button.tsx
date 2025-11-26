import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

export function Button({
  children,
  variant = 'primary',
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses = 'flex items-center justify-center gap-3 rounded-lg font-semibold transition-opacity'

  const variantClasses = {
    primary: `h-12 px-5 bg-blue-base text-white text-sm leading-[18px] ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
      }`,
    secondary: `h-8 px-2 gap-1.5 rounded bg-gray-200 text-gray-500 text-xs leading-4 ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
      }`,
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

