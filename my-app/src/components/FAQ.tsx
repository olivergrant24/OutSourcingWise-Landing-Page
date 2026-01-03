import React, { useState } from 'react';
import { Section } from './ui/Section';
import { Container } from './ui/Container';
import { Plus, Minus } from 'lucide-react';
import { cn } from '../lib/utils';
const faqs = [{
  question: 'How fast can we start?',
  answer: 'Typically, we can have a fully onboarded VA ready for you within 48 to 72 hours after our initial discovery call. We maintain a pool of pre-vetted talent ready to deploy.'
}, {
  question: 'What timezones do you support?',
  answer: 'We support all major timezones including EST, PST, GMT, and AEST. Our VAs work shifts that align with your business hours to ensure seamless collaboration.'
}, {
  question: 'Are calls recorded and is QA included?',
  answer: 'Yes, for voice roles (cold calling, support), all calls are recorded for quality assurance. Our internal QA team reviews a percentage of calls weekly and provides coaching to the VAs at no extra cost to you.'
}, {
  question: 'What tools do you use?',
  answer: 'Our VAs are trained on popular tools like Salesforce, HubSpot, Zendesk, Slack, Asana, and Google Workspace. We can also train them on your proprietary software during the onboarding phase.'
}, {
  question: 'Can I scale up or down anytime?',
  answer: 'Absolutely. We offer month-to-month flexibility. You can add more VAs during your busy season and scale back when things slow down, with just a 30-day notice.'
}];
export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return <Section id="faq" className="bg-gray-50">
      <Container className="max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about our process and services.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-200">
              <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full flex items-center justify-between p-6 text-left focus:outline-none">
                <span className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </span>
                {openIndex === index ? <Minus className="h-5 w-5 text-blue-600 flex-shrink-0" /> : <Plus className="h-5 w-5 text-gray-400 flex-shrink-0" />}
              </button>
              <div className={cn('px-6 text-gray-600 overflow-hidden transition-all duration-300 ease-in-out', openIndex === index ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0')}>
                {faq.answer}
              </div>
            </div>)}
        </div>
      </Container>
    </Section>;
}