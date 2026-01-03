import React from 'react';
import { cn } from '../../lib/utils';
interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  id: string;
  className?: string;
}
export function Section({
  children,
  id,
  className,
  ...props
}: SectionProps) {
  return <section id={id} className={cn('py-16 md:py-24 scroll-mt-20', className)} {...props}>
      {children}
    </section>;
}