import { Section } from './ui/Section';
import { Container } from './ui/Container';
import Award from 'lucide-react/dist/esm/icons/award.js';
import Clock from 'lucide-react/dist/esm/icons/clock.js';
import Shield from 'lucide-react/dist/esm/icons/shield.js';
import Users from 'lucide-react/dist/esm/icons/users.js';
import Zap from 'lucide-react/dist/esm/icons/zap.js';
import TrendingUp from 'lucide-react/dist/esm/icons/trending-up.js';
const benefits = [{
  icon: Award,
  title: 'Top 1% Trained VAs',
  description: 'Our rigorous vetting process ensures you only work with the best. English proficiency and skill tests are mandatory.'
}, {
  icon: TrendingUp,
  title: 'QA & Performance Tracking',
  description: 'We monitor calls, check tasks, and provide weekly reports to ensure quality never dips.'
}, {
  icon: Zap,
  title: 'Flexible Packages',
  description: 'Scale up or down as needed. No long-term lock-in contracts that hold your business back.'
}, {
  icon: Clock,
  title: 'Fast Onboarding',
  description: 'Get your VA up and running in as little as 48 hours. We have a pool of talent ready to go.'
}, {
  icon: Shield,
  title: 'Data Privacy Mindset',
  description: "Enterprise-grade security protocols. Your data and your customers' data are always protected."
}, {
  icon: Users,
  title: 'Dedicated Account Manager',
  description: "You're never alone. Your account manager ensures smooth communication and resolves any issues instantly."
}];
export function WhyUs() {
  return <Section id="why-us" className="bg-gradient-to-b from-gray-50 to-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose OutSourceWise?
            </h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              We're not just a marketplace; we're a managed service provider. We
              take responsibility for the quality of work delivered, giving you
              peace of mind and consistent results.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return <div key={index} className="flex items-start group">
                    <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mr-4 flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1 text-lg">
                        {benefit.title}
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>;
            })}
            </div>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="relative min-h-[420px] rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-gradient-to-br from-slate-950 via-blue-900 to-slate-900">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.45),transparent_30%),radial-gradient(circle_at_78%_34%,rgba(34,197,94,0.25),transparent_26%)]"></div>
              <div className="absolute left-8 right-8 top-8 grid grid-cols-2 gap-4">
                {benefits.slice(0, 4).map((benefit) => {
                const Icon = benefit.icon;
                return <div key={benefit.title} className="rounded-2xl bg-white/12 border border-white/15 p-4 backdrop-blur-sm">
                    <Icon className="h-6 w-6 text-blue-200 mb-6" />
                    <div className="h-2 w-16 rounded-full bg-white/40 mb-3"></div>
                    <div className="h-2 w-24 rounded-full bg-white/20"></div>
                  </div>;
              })}
              </div>

              <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-blue-600">98%</div>
                    <div className="text-xs text-gray-600 font-medium mt-1">
                      Retention
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600">
                      500+
                    </div>
                    <div className="text-xs text-gray-600 font-medium mt-1">
                      Clients
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-600">
                      24/7
                    </div>
                    <div className="text-xs text-gray-600 font-medium mt-1">
                      Support
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            </div>
          </div>
        </div>
      </Container>
    </Section>;
}
