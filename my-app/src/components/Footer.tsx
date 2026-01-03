import { Container } from './ui/Container';
import { scrollToSection } from '../lib/utils';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
export function Footer() {
  const links = [{
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
  }, {
    name: 'Contact',
    href: '#contact'
  }];
  return <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <span className="text-2xl font-bold text-white tracking-tight cursor-pointer" onClick={() => scrollToSection('#hero')}>
              OutSource<span className="text-blue-500">Wise</span>
            </span>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              Premium virtual assistant outsourcing services for businesses
              ready to scale. Quality, reliability, and results.
            </p>
          </div>

          <div className="col-span-1 md:col-span-2 md:pl-12">
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="grid grid-cols-2 gap-2">
              {links.map(link => <li key={link.name}>
                  <button onClick={() => scrollToSection(link.href)} className="text-sm hover:text-blue-400 transition-colors text-left">
                    {link.name}
                  </button>
                </li>)}
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => <a key={i} href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Icon className="h-5 w-5" />
                </a>)}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} OutSourceWise. All rights
            reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-300">
              Terms of Service
            </a>
          </div>
        </div>
      </Container>
    </footer>;
}