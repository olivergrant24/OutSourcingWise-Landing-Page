import { Section } from './ui/Section';
import { Container } from './ui/Container';
import { Button } from './ui/Button';
import { Check, Zap, Star, Crown } from 'lucide-react';
const pricingTiers = [{
  name: 'Starter',
  icon: Zap,
  price: 800,
  description: 'Perfect for solopreneurs and small teams testing the waters',
  features: ['1 Dedicated VA', '20 hours per week', 'Email & chat support', 'Basic task management', 'Weekly performance reports', '2-week onboarding'],
  cta: 'Start with Starter',
  popular: false
}, {
  name: 'Professional',
  icon: Star,
  price: 1200,
  description: 'Most popular choice for growing businesses ready to scale',
  features: ['1-2 Dedicated VAs', '40 hours per week', 'Priority support', 'Advanced task & project management', 'Daily performance reports', '48-hour onboarding', 'Dedicated account manager', 'Quality assurance included'],
  cta: 'Get Started',
  popular: true
}, {
  name: 'Enterprise',
  icon: Crown,
  price: null,
  description: 'Custom solutions for established teams with complex needs',
  features: ['Multiple specialized VAs', 'Unlimited hours', '24/7 dedicated support', 'Custom workflows & integrations', 'Real-time reporting dashboard', 'Same-day onboarding', 'Executive account manager', 'SLA guarantees'],
  cta: 'Contact Sales',
  popular: false
}];
export function Pricing() {
  return <Section id="pricing" className="bg-gradient-to-b from-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
      </div>

      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium text-blue-400 bg-blue-500/10 border border-blue-500/20 mb-6">
            <span className="flex h-2 w-2 rounded-full bg-blue-400 mr-2 animate-pulse"></span>
            Transparent Pricing
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Simple, Predictable Pricing
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            No hidden fees. No surprises. Just exceptional virtual assistants
            starting at{' '}
            <span className="text-blue-400 font-bold">$1,200/month</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6 items-center">
          {pricingTiers.map((tier, index) => {
          const Icon = tier.icon;
          return <div key={index} className={`relative rounded-2xl transition-all duration-300 ${tier.popular ? 'bg-white text-gray-900 shadow-2xl scale-105 md:scale-110 border-4 border-blue-500' : 'bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-gray-600'}`}>
                {tier.popular && <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-1.5 rounded-full text-sm font-bold shadow-lg">
                    MOST POPULAR
                  </div>}

                <div className="p-8">
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center mb-6 ${tier.popular ? 'bg-blue-100 text-blue-600' : 'bg-gray-700 text-gray-300'}`}>
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className={`text-2xl font-bold mb-2 ${tier.popular ? 'text-gray-900' : 'text-white'}`}>
                    {tier.name}
                  </h3>
                  <p className={`text-sm mb-6 leading-relaxed ${tier.popular ? 'text-gray-600' : 'text-gray-400'}`}>
                    {tier.description}
                  </p>

                  <div className="mb-8">
                    {tier.price ? <>
                        <div className="flex items-baseline">
                          <span className={`text-5xl font-bold ${tier.popular ? 'text-gray-900' : 'text-white'}`}>
                            ${tier.price}
                          </span>
                          <span className={`ml-2 text-lg ${tier.popular ? 'text-gray-600' : 'text-gray-400'}`}>
                            /month
                          </span>
                        </div>
                        <p className={`text-sm mt-2 ${tier.popular ? 'text-gray-500' : 'text-gray-500'}`}>
                          Billed monthly, cancel anytime
                        </p>
                      </> : <div className={`text-4xl font-bold ${tier.popular ? 'text-gray-900' : 'text-white'}`}>
                        Custom
                      </div>}
                  </div>

                  <Button href="#contact" variant={tier.popular ? 'primary' : 'outline'} className={`w-full mb-8 ${tier.popular ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg' : 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
                    {tier.cta}
                  </Button>

                  <ul className="space-y-4">
                    {tier.features.map((feature, i) => <li key={i} className="flex items-start">
                        <Check className={`h-5 w-5 mr-3 flex-shrink-0 mt-0.5 ${tier.popular ? 'text-blue-600' : 'text-blue-400'}`} />
                        <span className={`text-sm ${tier.popular ? 'text-gray-700' : 'text-gray-300'}`}>
                          {feature}
                        </span>
                      </li>)}
                  </ul>
                </div>
              </div>;
        })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-4">
            All plans include a 14-day money-back guarantee
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
            <span className="flex items-center">
              <Check className="h-4 w-4 text-green-400 mr-2" />
              No setup fees
            </span>
            <span className="flex items-center">
              <Check className="h-4 w-4 text-green-400 mr-2" />
              Cancel anytime
            </span>
            <span className="flex items-center">
              <Check className="h-4 w-4 text-green-400 mr-2" />
              Flexible scaling
            </span>
          </div>
        </div>
      </Container>
    </Section>;
}