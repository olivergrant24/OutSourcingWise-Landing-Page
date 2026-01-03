import React from 'react';
import { cn, scrollToSection } from '../../lib/utils';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
}
export function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm',
    secondary: 'bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-900 shadow-sm',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
    ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
  };
  const sizes = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-11 px-6 text-base',
    lg: 'h-14 px-8 text-lg'
  };
  const classes = cn(baseStyles, variants[variant], sizes[size], className);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (href && href.startsWith('#')) {
      e.preventDefault();
      scrollToSection(href);
    }
    if (onClick) {
      onClick(e);
    }
  };
  return <button className={classes} onClick={handleClick} {...props}>
      {children}
    </button>;
}