import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, Loader2, User, MessageSquare } from 'lucide-react';
import { sendContactMessage } from '../services/contactService';

// Custom clean SVG icons for LinkedIn and GitHub
const LinkedInIcon = ({ className = "w-4.5 h-4.5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </svg>
);

const GitHubIcon = ({ className = "w-4.5 h-4.5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
  </svg>
);

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status.error || status.success) {
      setStatus({ submitting: false, success: false, error: null, message: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setStatus({ submitting: false, success: false, error: true, message: 'Please enter your name.' });
      return;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setStatus({ submitting: false, success: false, error: true, message: 'Please enter a valid email address.' });
      return;
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setStatus({ submitting: false, success: false, error: true, message: 'Message must be at least 10 characters long.' });
      return;
    }

    setStatus({ submitting: true, success: false, error: null, message: '' });

    try {
      await sendContactMessage(formData);
      setStatus({
        submitting: false,
        success: true,
        error: false,
        message: 'Message sent successfully!'
      });
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (err) {
      setStatus({
        submitting: false,
        success: false,
        error: true,
        message: 'Unable to send your message. Please try again later.'
      });
    }
  };

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 border-t border-slate-900 bg-slate-950/80 relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400 mb-3 shadow-lg shadow-purple-500/5">
            <Mail className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Let's Connect</h2>
        </div>

        {/* Visually Centered Contact Form Card */}
        <div className="max-w-xl mx-auto">
          <div className="p-5 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl relative backdrop-blur-md">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-purple-400" />
                  Name <span className="text-purple-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  disabled={status.submitting}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-purple-500/70 focus:ring-1 focus:ring-purple-500/50 disabled:opacity-50 transition min-h-[44px]"
                  required
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-purple-400" />
                  Email <span className="text-purple-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="visitor@example.com"
                  disabled={status.submitting}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-purple-500/70 focus:ring-1 focus:ring-purple-500/50 disabled:opacity-50 transition min-h-[44px]"
                  required
                />
              </div>

              {/* Message Input */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
                  Message <span className="text-purple-400">*</span>
                </label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  disabled={status.submitting}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-purple-500/70 focus:ring-1 focus:ring-purple-500/50 disabled:opacity-50 transition resize-none"
                  required
                ></textarea>
              </div>

              {/* Status Messages */}
              {status.success && (
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{status.message}</span>
                </div>
              )}

              {status.error && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5 animate-fadeIn">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{status.message}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status.submitting}
                className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer min-h-[44px]"
              >
                {status.submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-purple-200" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>

            {/* Professional Social Links (LinkedIn & GitHub) */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              {/* LinkedIn Link */}
              <a
                href="https://www.linkedin.com/in/pragya-gupta-44200922a"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-3 p-3 px-4 rounded-xl border border-slate-800 bg-slate-950 hover:border-blue-500/50 hover:bg-slate-900 transition-all group min-h-[44px]"
              >
                <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 group-hover:scale-105 transition-transform">
                  <LinkedInIcon className="w-4.5 h-4.5" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase tracking-wider">LinkedIn</span>
                  <span className="text-xs font-semibold text-white group-hover:text-blue-300 transition-colors">Pragya Gupta</span>
                </div>
              </a>

              {/* GitHub Link */}
              <a
                href="https://github.com/pragyagupta5467-create"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-3 p-3 px-4 rounded-xl border border-slate-800 bg-slate-950 hover:border-purple-500/50 hover:bg-slate-900 transition-all group min-h-[44px]"
              >
                <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400 group-hover:scale-105 transition-transform">
                  <GitHubIcon className="w-4.5 h-4.5" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase tracking-wider">GitHub</span>
                  <span className="text-xs font-semibold text-white group-hover:text-purple-300 transition-colors">Pragya Gupta</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
