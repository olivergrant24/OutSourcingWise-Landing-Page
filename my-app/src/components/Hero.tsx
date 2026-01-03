import { Container } from './ui/Container';
import { Button } from './ui/Button';
import { ArrowRight, CheckCircle2, Play } from 'lucide-react';
export function Hero() {
  return <section id="hero" className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 mb-8 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
              Now accepting new clients for Q4
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight mb-6 leading-[1.1]">
              Virtual Assistant Outsourcing That{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Scales Your Business
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed">
              Stop drowning in busy work. Get matched with top-tier virtual
              assistants for appointment setting, customer support, and more.
            </p>

            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mb-12">
              <Button href="#pricing" size="lg" className="w-full sm:w-auto group shadow-lg hover:shadow-xl transition-shadow">
                View Pricing
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button href="#contact" variant="outline" size="lg" className="w-full sm:w-auto group">
                <Play className="mr-2 h-5 w-5" />
                Book a Call
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 justify-center lg:justify-start text-sm text-gray-600">
              <div className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                <span className="font-medium">500+ Happy Clients</span>
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                <span className="font-medium">98% Retention Rate</span>
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                <span className="font-medium">24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative lg:h-[600px] h-[400px]">
            {/* Main Image */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
              <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80" alt="Professional team collaborating" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
            </div>

            {/* Floating Stats Cards */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 border border-gray-100 max-w-[200px] animate-float">
              <div className="text-4xl font-bold text-blue-600 mb-1">$1.2K</div>
              <div className="text-sm text-gray-600 font-medium">
                Starting Price/Month
              </div>
            </div>

            <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-6 border border-gray-100 max-w-[200px] animate-float-delayed">
              <div className="text-4xl font-bold text-green-600 mb-1">48hr</div>
              <div className="text-sm text-gray-600 font-medium">
                Fast Onboarding
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
              <div className="absolute top-0 right-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
          {/*
        <div className="mt-20 pt-12 border-t border-gray-200">
          <p className="text-sm font-semibold text-gray-500 mb-8 text-center tracking-wider">
            TRUSTED BY FAST-GROWING COMPANIES
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16 opacity-50 hover:opacity-100 transition-opacity duration-500">
            {['TechFlow', 'GrowthLabs', 'ScaleUp', 'VentureNorth', 'ApexDigital'].map(brand => <span key={brand} className="text-2xl font-bold text-gray-400 flex items-center">
                <div className="h-8 w-8 bg-gray-300 rounded-lg mr-3"></div>
                {brand}
              </span>)}
          </div>
        </div>
         */}
      </Container>
    </section>;
}