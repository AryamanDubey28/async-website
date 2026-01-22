'use client';

import { useState, useEffect, useRef } from 'react';

const CallToAction = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError('');

    try {
      const GOOGLE_SHEET_WEBHOOK_URL =
        'https://script.google.com/macros/s/AKfycbw0jX72GcNKB23nTZAkBC6EzGfniQFOMmWvONXW707FbDAgrhITcBGQgbe9HsGCwHtvsA/exec';

      await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          message,
          timestamp: new Date().toISOString(),
        }),
        mode: 'no-cors',
      });

      setSubmitted(true);
      setEmail('');
      setName('');
      setMessage('');
    } catch {
      setError('Failed to submit. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-background overflow-hidden"
    >
      {/* Aurora background */}
      <div className="absolute inset-0 aurora-bg opacity-50" />

      {/* Mesh gradient */}
      <div className="absolute inset-0 mesh-gradient" />

      {/* Floating orbs */}
      <div className="absolute -top-32 -right-32 w-96 h-96 orb orb-violet float-slow opacity-30" />
      <div className="absolute -bottom-32 -left-32 w-64 h-64 orb orb-cyan float opacity-30" />

      {/* Noise overlay */}
      <div className="absolute inset-0 noise pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div
            className={`text-center mb-12 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full glass-violet mb-6">
              <span className="text-sm font-medium text-violet-200">Get in Touch</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-white">Ready to transform with </span>
              <span className="gradient-text">intelligent AI?</span>
            </h2>

            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Get in touch with our team of AI experts to discuss how we can help
              your business leverage the power of artificial intelligence.
            </p>
          </div>

          {/* Form Card */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="relative">
              {/* Gradient border */}
              <div className="absolute inset-0 rounded-3xl gradient-border" />

              {/* Form container */}
              <div className="relative glass-strong rounded-3xl p-8 md:p-12">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email address <span className="text-violet-400">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        required
                        className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all duration-300"
                      />
                    </div>

                    {/* Name field */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Your name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all duration-300"
                      />
                    </div>

                    {/* Message field */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                        How can we help?
                      </label>
                      <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us about your challenges..."
                        rows={4}
                        className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all duration-300 resize-none"
                      />
                    </div>

                    {/* Error message */}
                    {error && (
                      <p className="text-red-400 text-sm">{error}</p>
                    )}

                    {/* Submit button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="group relative w-full py-4 rounded-xl text-white font-semibold overflow-hidden transition-all duration-300 hover:shadow-glow disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600" />
                      <span className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="absolute inset-0 btn-shimmer" />
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {loading ? (
                          <>
                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            Request a Demo
                            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </>
                        )}
                      </span>
                    </button>
                  </form>
                ) : (
                  <div className="py-12 text-center">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-violet-500/20 flex items-center justify-center">
                      <svg className="w-8 h-8 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Thank you!</h3>
                    <p className="text-gray-400">We&apos;ll be in touch soon.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div
            className={`mt-12 flex flex-col sm:flex-row justify-center gap-8 transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Phone */}
            <a
              href="tel:02035761250"
              className="group flex items-center gap-4 glass rounded-2xl px-6 py-4 hover:bg-white/[0.04] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center group-hover:bg-violet-500/20 transition-colors duration-300">
                <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Call us</div>
                <div className="text-white font-medium">020 3576 1250</div>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:admin@asyncstudios.co.uk"
              className="group flex items-center gap-4 glass rounded-2xl px-6 py-4 hover:bg-white/[0.04] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors duration-300">
                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Email us</div>
                <div className="text-white font-medium">admin@asyncstudios.co.uk</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
