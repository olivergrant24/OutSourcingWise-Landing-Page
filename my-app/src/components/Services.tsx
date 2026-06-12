import { Section } from './ui/Section';
import { Container } from './ui/Container';
import Calendar from 'lucide-react/dist/esm/icons/calendar.js';
import Phone from 'lucide-react/dist/esm/icons/phone.js';
import Share2 from 'lucide-react/dist/esm/icons/share-2.js';
import Headphones from 'lucide-react/dist/esm/icons/headphones.js';
import Wrench from 'lucide-react/dist/esm/icons/wrench.js';
import Users from 'lucide-react/dist/esm/icons/users.js';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right.js';
const services = [{
  icon: Calendar,
  title: 'Appointment Setting',
  description: 'Fill your calendar with qualified leads. Our VAs handle scheduling, follow-ups, and calendar management so you can focus on closing.'
}, {
  icon: Phone,
  title: 'Cold Calling',
  description: 'Professional outreach to your target market. We handle the initial contact, qualification, and warm up prospects for your sales team.'
}, {
  icon: Share2,
  title: 'Social Media Management',
  description: 'Consistent presence across all platforms. We handle content scheduling, community engagement, and basic content creation.'
}, {
  icon: Headphones,
  title: 'Customer Service',
  description: '24/7 support for your customers. Email, chat, and ticket management to ensure your customers always feel heard and valued.'
}, {
  icon: Wrench,
  title: 'Technical Support',
  description: 'Tier 1 and 2 technical assistance. We troubleshoot issues, guide users, and escalate complex problems to your core team.'
}, {
  icon: Users,
  title: 'Lead Generation',
  description: 'Build a robust pipeline. We research, scrape, and verify leads to keep your sales funnel full of potential opportunities.'
}];
export function Services() {
  return <Section id="services" className="bg-white">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Comprehensive Outsourcing Solutions
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            We provide specialized virtual assistants trained to handle critical
            business functions, allowing you to reclaim your time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => <div key={index} className="group relative rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
              <div className="relative h-32 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-slate-100">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-200/70"></div>
                <div className="absolute -left-8 bottom-4 h-20 w-20 rounded-full bg-green-100"></div>
                <div className="absolute bottom-4 left-4 h-12 w-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-lg">
                  <service.icon className="h-6 w-6" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {service.description}
                </p>
                <button onClick={() => {
              const element = document.getElementById('contact');
              element?.scrollIntoView({
                behavior: 'smooth'
              });
            }} className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors group/link">
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                </button>
              </div>
            </div>)}
        </div>
      </Container>
    </Section>;
}
