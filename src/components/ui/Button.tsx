import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  customColor?: string; // Custom hex color override if provided by campaign
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  customColor,
  style,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] select-none';
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs gap-1.5 min-h-[36px]',
    md: 'px-4 py-2.5 text-sm gap-2 min-h-[44px]',
    lg: 'px-6 py-3.5 text-base gap-2.5 min-h-[52px]',
  };

  const variantStyles = {
    primary: 'bg-[#0D333C] hover:bg-[#164954] text-white shadow-md shadow-[#0D333C]/25 focus:ring-[#0D333C]',
    secondary: 'bg-[#164954] hover:bg-[#0D333C] text-white shadow-sm focus:ring-[#164954]',
    outline: 'border border-[#0D333C]/30 hover:bg-[#0D333C]/5 text-[#102A30] focus:ring-[#0D333C] bg-white',
    ghost: 'text-[#102A30] hover:bg-[#0D333C]/10 focus:ring-[#0D333C]',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-500',
    success: 'bg-[#0D333C] hover:bg-[#164954] text-white focus:ring-[#0D333C]',
  };

  const buttonStyle: React.CSSProperties = { ...style };
  if (customColor && variant === 'primary') {
    buttonStyle.backgroundColor = customColor;
    buttonStyle.borderColor = customColor;
  }

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      style={buttonStyle}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : leftIcon ? (
        <span className="shrink-0">{leftIcon}</span>
      ) : null}
      <span>{children}</span>
      {!isLoading && rightIcon ? <span className="shrink-0">{rightIcon}</span> : null}
    </button>
  );
};
