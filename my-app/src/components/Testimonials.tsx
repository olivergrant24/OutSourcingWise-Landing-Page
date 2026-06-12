import { Section } from './ui/Section';
import { Container } from './ui/Container';
import Star from 'lucide-react/dist/esm/icons/star.js';
import Quote from 'lucide-react/dist/esm/icons/quote.js';
const testimonials = [{
  quote: 'OutSourceWise completely transformed our lead gen process. We went from booking 5 calls a week to 25 within the first month. The quality of the VAs is unmatched.',
  author: 'Sarah Jenkins',
  role: 'VP of Sales, TechGrowth',
  initials: 'SJ'
}, {
  quote: 'I was hesitant about outsourcing customer support, but their team integrated seamlessly. Our response times dropped by 80% and customer satisfaction is at an all-time high.',
  author: 'Michael Chen',
  role: 'Founder, EcomScale',
  initials: 'MC'
}, {
  quote: "The flexibility is what keeps us here. We scaled up during our busy season and scaled back down without any headaches. It's the perfect partner for a growing agency.",
  author: 'Jessica Williams',
  role: 'Operations Director, CreativeFlow',
  initials: 'JW'
}];
export function Testimonials() {
  return <Section id="testimonials" className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300 rounded-full filter blur-3xl"></div>
      </div>

      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Trusted by Business Leaders
          </h2>
          <p className="text-xl text-blue-100 leading-relaxed">
            Don't just take our word for it. Here's what our partners have to
            say about working with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => <div key={index} className="relative bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
              <Quote className="h-10 w-10 text-blue-300 mb-6 opacity-50" />

              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />)}
              </div>

              <blockquote className="text-lg text-blue-50 mb-8 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              <div className="flex items-center">
                <div className="h-14 w-14 rounded-full bg-white/15 border-2 border-white/30 mr-4 flex items-center justify-center text-sm font-bold text-white">
                  {testimonial.initials}
                </div>
                <div>
                  <div className="font-bold text-white text-lg">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-blue-200">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>)}
        </div>
      </Container>
    </Section>;
}
