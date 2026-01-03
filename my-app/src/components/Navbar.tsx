import React, { useEffect, useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Container } from './ui/Container';
import { Button } from './ui/Button';
import { cn, scrollToSection } from '../lib/utils';
const navLinks = [{
  name: 'Pricing',
  href: '#pricing'
}, {
  name: 'Services',
  href: '#services'
}, {
  name: 'How It Works',
  href: '#how-it-works'
}, {
  name: 'Why Us',
  href: '#why-us'
}, {
  name: 'Testimonials',
  href: '#testimonials'
}, {
  name: 'FAQ',
  href: '#faq'
}];
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const handleNavClick = (href: string) => {
    setIsOpen(false);
    scrollToSection(href);
  };
  return <header className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-sm', isScrolled ? 'shadow-md py-3' : 'py-5')}>
      <Container>
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollToSection('#hero')}>
            <span className="text-2xl font-bold text-gray-900 tracking-tight">
              OutSource<span className="text-blue-600">Wise</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map(link => <button key={link.name} onClick={() => handleNavClick(link.href)} className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                {link.name}
              </button>)}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button href="#contact" size="sm">
              Book a Call
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none" aria-label="Toggle menu">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile Menu Overlay */}
      <div className={cn('fixed inset-x-0 top-[60px] bg-white shadow-lg lg:hidden transition-all duration-300 ease-in-out overflow-hidden', isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0')}>
        <div className="px-4 pt-4 pb-8 space-y-4 flex flex-col items-center">
          {navLinks.map(link => <button key={link.name} onClick={() => handleNavClick(link.href)} className="block w-full text-center py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md">
              {link.name}
            </button>)}
          <div className="pt-4 w-full max-w-xs">
            <Button href="#contact" className="w-full" onClick={() => setIsOpen(false)}>
              Book a Call
            </Button>
          </div>
        </div>
      </div>
    </header>;
}