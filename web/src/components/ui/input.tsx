import { forwardRef, InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        <label className="text-[10px] leading-[14px] text-gray-500 uppercase font-normal">
          {label}
        </label>
        <input
          ref={ref}
          className={`h-12 px-4 rounded-lg border border-gray-300 
            text-sm leading-[18px] text-gray-400 placeholder:text-gray-400
            focus:outline-none focus:border-blue-base transition-colors
            ${error ? 'border-red-500' : ''} ${className}`}
          {...props}
        />
        {error && (
          <span className="text-xs text-red-500">{error}</span>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

