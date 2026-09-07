import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'flat' | 'glass' | 'bordered';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  ...props
}) => {
  const variantStyles = {
    default: 'bg-white border border-slate-200/90 shadow-xl shadow-slate-200/70 rounded-3xl',
    flat: 'bg-slate-50 border border-slate-200/80 rounded-3xl',
    glass: 'bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-3xl shadow-xl',
    bordered: 'bg-white border-2 border-slate-200 rounded-3xl shadow-sm',
  };

  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div className={`${variantStyles[variant]} ${paddingStyles[padding]} ${className}`} {...props}>
      {children}
    </div>
  );
};
