import React, { useEffect, useRef, useState } from 'react';
import { Section } from './ui/Section';
import { Container } from './ui/Container';
import { Button } from './ui/Button';
import Mail from 'lucide-react/dist/esm/icons/mail.js';
import Phone from 'lucide-react/dist/esm/icons/phone.js';
import MapPin from 'lucide-react/dist/esm/icons/map-pin.js';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle.js';

const configuredTurnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;
const turnstileSiteKey = configuredTurnstileSiteKey?.startsWith('your-')
  ? undefined
  : configuredTurnstileSiteKey;

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          theme?: 'light' | 'dark' | 'auto';
          callback?: (token: string) => void;
          'expired-callback'?: () => void;
          'error-callback'?: () => void;
        }
      ) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId: string) => void;
    };
  }
}

export function Contact() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [startedAt] = useState(() => Date.now());
  const [turnstileToken, setTurnstileToken] = useState('');
  const turnstileTokenRef = useRef('');
  const turnstileRef = useRef<HTMLDivElement | null>(null);
  const turnstileWidgetIdRef = useRef<string | null>(null);

  const clearTurnstile = () => {
    turnstileTokenRef.current = '';
    setTurnstileToken('');

    if (turnstileWidgetIdRef.current) {
      window.turnstile?.remove(turnstileWidgetIdRef.current);
      turnstileWidgetIdRef.current = null;
    }
  };

  useEffect(() => {
    if (!turnstileSiteKey || !turnstileRef.current || formState === 'success') {
      return;
    }

    let cancelled = false;
    let timeoutId: number | undefined;

    const renderTurnstile = () => {
      if (cancelled || !turnstileRef.current) {
        return;
      }

      if (!window.turnstile) {
        timeoutId = window.setTimeout(renderTurnstile, 150);
        return;
      }

      if (!turnstileWidgetIdRef.current) {
        turnstileWidgetIdRef.current = window.turnstile.render(turnstileRef.current, {
          sitekey: turnstileSiteKey,
          theme: 'light',
          callback: (token) => {
            turnstileTokenRef.current = token;
            setTurnstileToken(token);
          },
          'expired-callback': () => {
            turnstileTokenRef.current = '';
            setTurnstileToken('');
          },
          'error-callback': () => {
            turnstileTokenRef.current = '';
            setTurnstileToken('');
          },
        });
      }
    };

    renderTurnstile();

    return () => {
      cancelled = true;
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [formState]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');
    setErrorMsg('');

    const formEl = e.currentTarget;
    const fd = new FormData(formEl);
    const verifiedTurnstileToken =
      turnstileTokenRef.current ||
      turnstileToken ||
      String(fd.get('cf-turnstile-response') || '');

    if (turnstileSiteKey && !verifiedTurnstileToken) {
      setFormState('error');
      setErrorMsg('Please complete the security check');
      return;
    }

    const payload = {
      name: String(fd.get('name') || ''),
      email: String(fd.get('email') || ''),
      company: String(fd.get('company') || ''),
      service: String(fd.get('service') || ''),
      message: String(fd.get('message') || ''),
      website: String(fd.get('website') || ''),
      startedAt: String(fd.get('startedAt') || ''),
      turnstileToken: verifiedTurnstileToken,
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
      formEl.reset();
      clearTurnstile();
    } catch (err) {
      console.error(err);
      setFormState('error');
      setErrorMsg(err instanceof Error ? err.message : 'Failed to send. Please try again or email us directly.');
      turnstileTokenRef.current = '';
      setTurnstileToken('');
      if (turnstileWidgetIdRef.current) {
        window.turnstile?.reset(turnstileWidgetIdRef.current);
      }
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
                  Confirm Your Email
                </h3>
                <p className="text-gray-600">
                  We sent a verification link to your inbox. Your request will
                  reach our team after you confirm your email.
                </p>
                <Button
                  variant="outline"
                  className="mt-8"
                  onClick={() => {
                    clearTurnstile();
                    setFormState('idle');
                  }}
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
                  <input type="hidden" name="startedAt" value={startedAt} />
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

                {turnstileSiteKey && (
                  <div
                    ref={turnstileRef}
                    className="min-h-[65px]"
                  />
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
