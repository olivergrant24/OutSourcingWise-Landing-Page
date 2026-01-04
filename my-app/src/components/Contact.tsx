import React, { useState } from 'react';
import { Section } from './ui/Section';
import { Container } from './ui/Container';
import { Button } from './ui/Button';
import { Mail, Phone, MapPin, CheckCircle } from 'lucide-react';

export function Contact() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');
    setErrorMsg('');

    const formEl = e.currentTarget;
    const fd = new FormData(formEl);

    const payload = {
      name: String(fd.get('name') || ''),
      email: String(fd.get('email') || ''),
      company: String(fd.get('company') || ''),
      service: String(fd.get('service') || ''),
      message: String(fd.get('message') || ''),
      website: String(fd.get('website') || ''),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || 'Failed to send');
      }

      setFormState('success');
      formEl.reset(); // optional
    } catch (err) {
      console.error(err);
      setFormState('error');
      setErrorMsg('Failed to send. Please try again or email us directly.');
    }
  };

  return (
    <Section id="contact" className="bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Scale Your Business?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Book a free consultation to discuss your needs. We'll help you
              identify which tasks to outsource and match you with the perfect
              VA.
            </p>

            <div className="space-y-6 mb-12">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-4">
                  <Mail className="h-5 w-5" />
                </div>
                <span className="text-gray-700">francisoutsourcewise@gmail.com</span>
              </div>
              <div className="flex items-center">
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-4">
                  <Phone className="h-5 w-5" />
                </div>
                <span className="text-gray-700">+639668961579</span>
              </div>
              <div className="flex items-center">
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-4">
                  <MapPin className="h-5 w-5" />
                </div>
                <span className="text-gray-700">Philippines</span>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <h4 className="font-semibold text-gray-900 mb-4">
                What happens next?
              </h4>
              <ul className="space-y-3">
                {[
                  'We analyze your requirements',
                  'Schedule a 15-min discovery call',
                  'Present you with candidate profiles',
                  'Start your risk-free trial',
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            {formState === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-600">
                  Thank you for reaching out. One of our account managers will
                  be in touch within 24 hours.
                </p>
                <Button
                  variant="outline"
                  className="mt-8"
                  onClick={() => setFormState('idle')}
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                  />
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Work Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="Acme Inc."
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                  >
                    <option value="">Select a service...</option>
                    <option value="appointment-setting">Appointment Setting</option>
                    <option value="cold-calling">Cold Calling</option>
                    <option value="social-media">Social Media Management</option>
                    <option value="customer-service">Customer Service</option>
                    <option value="tech-support">Technical Support</option>
                    <option value="lead-gen">Lead Generation</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                    placeholder="Tell us about your needs..."
                  />
                </div>

                {formState === 'error' && (
                  <p className="text-sm text-red-600">{errorMsg}</p>
                )}

                <Button type="submit" className="w-full" size="lg" disabled={formState === 'submitting'}>
                  {formState === 'submitting' ? 'Sending...' : 'Request Free Consultation'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
