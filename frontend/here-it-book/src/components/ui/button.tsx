import * as React from 'react'
import { cn } from '@/lib/utils'

type ButtonVariant = 'default' | 'outline' | 'destructive'
type ButtonSize = 'default' | 'sm' | 'lg'

const variantClassMap: Record<ButtonVariant, string> = {
  default: 'bg-emerald-600 text-white hover:bg-emerald-700',
  outline: 'border border-emerald-200 bg-white text-emerald-800 hover:bg-emerald-50',
  destructive: 'bg-red-600 text-white hover:bg-red-700',
}

const sizeClassMap: Record<ButtonSize, string> = {
  default: 'h-9 px-4 py-2',
  sm: 'h-8 rounded-md px-3 text-xs',
  lg: 'h-10 rounded-md px-6',
}

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', type = 'button', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400',
          variantClassMap[variant],
          sizeClassMap[size],
          className,
        )}
        ref={ref}
        type={type}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button }
