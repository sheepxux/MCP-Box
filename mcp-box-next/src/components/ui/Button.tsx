import React from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The visual style of the button
   * @default 'primary'
   */
  variant?: ButtonVariant;
  
  /**
   * The size of the button
   * @default 'md'
   */
  size?: ButtonSize;
  
  /**
   * Optional loading state
   */
  isLoading?: boolean;
  
  /**
   * Optional icon to display before button text
   */
  leftIcon?: React.ReactNode;
  
  /**
   * Optional icon to display after button text
   */
  rightIcon?: React.ReactNode;
}

/**
 * Primary UI component for user interaction
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    isLoading = false,
    leftIcon,
    rightIcon,
    children, 
    disabled, 
    ...props 
  }, ref) => {
    // Combine default styles with variant, size, and custom className
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
    
    const variants = {
      primary: 'bg-orange-600 text-white hover:bg-orange-700 focus-visible:ring-orange-500',
      secondary: 'bg-neutral-800 text-white hover:bg-neutral-700 focus-visible:ring-neutral-500',
      outline: 'border border-neutral-800 bg-transparent text-neutral-300 hover:bg-neutral-800 focus-visible:ring-neutral-500',
      ghost: 'bg-transparent text-neutral-300 hover:bg-neutral-800 hover:text-white focus-visible:ring-neutral-500',
      link: 'bg-transparent text-orange-600 underline-offset-4 hover:underline focus-visible:ring-orange-500 p-0 h-auto',
    };
    
    const sizes = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 py-2',
      lg: 'h-12 px-6 text-lg',
    };
    
    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <span className="mr-2 animate-spin">⟳</span>
        )}
        {!isLoading && leftIcon && (
          <span className="mr-2">{leftIcon}</span>
        )}
        {children}
        {!isLoading && rightIcon && (
          <span className="ml-2">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
