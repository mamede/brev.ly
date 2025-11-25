import { forwardRef, InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        <label className="text-[10px] leading-[14px] text-[#4D505C] uppercase font-normal">
          {label}
        </label>
        <input
          ref={ref}
          className={`h-12 px-4 rounded-lg border border-[#CDCFD5] 
            text-sm leading-[18px] text-[#74798B] placeholder:text-[#74798B]
            focus:outline-none focus:border-[#2C46B1] transition-colors
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

