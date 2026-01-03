import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function scrollToSection(id: string) {
  const element = document.getElementById(id.replace('#', ''))
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
