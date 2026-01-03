import { Section } from './ui/Section';
import { Container } from './ui/Container';
import { PhoneCall, UserCheck, BarChart3 } from 'lucide-react';
const steps = [{
  icon: PhoneCall,
  title: 'Discovery Call',
  description: 'We discuss your needs, goals, and the specific skills required for your role. We build a custom profile for your ideal candidate.'
}, {
  icon: UserCheck,
  title: 'Match & Onboard',
  description: 'We select the best VA from our pre-vetted pool. We handle the contracts, onboarding, and initial training on your tools.'
}, {
  icon: BarChart3,
  title: 'Delegate & Scale',
  description: 'Start delegating tasks immediately. Receive weekly performance reports and have regular check-ins with your dedicated account manager.'
}];
export function HowItWorks() {
  return <Section id="how-it-works" className="bg-gray-50">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600">
            Getting started is simple. We handle the heavy lifting of recruiting
            and vetting so you can focus on delegation.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-200 -z-10"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step, index) => <div key={index} className="relative flex flex-col items-center text-center bg-gray-50 md:bg-transparent p-6 md:p-0 rounded-xl">
                <div className="h-24 w-24 bg-white rounded-full border-4 border-blue-50 flex items-center justify-center text-blue-600 shadow-sm mb-6 z-10">
                  <step.icon className="h-10 w-10" />
                </div>
                <div className="absolute top-6 right-6 md:hidden text-6xl font-bold text-gray-100 -z-10">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>)}
          </div>
        </div>
      </Container>
    </Section>;
}