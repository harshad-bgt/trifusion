'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import { CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

interface FormData {
    name: string;
    email: string;
    phone: string;
    company: string;
    serviceInterest: string;
    projectType: string;
    budgetRange: string;
    preferredContactMethod: string;
    message: string;
}

const initialState: FormData = {
    name: '', email: '', phone: '', company: '',
    serviceInterest: '', projectType: '', budgetRange: '',
    preferredContactMethod: '', message: '',
};

const services = [
    'Custom Software Development', 'Web Application Development', 'Mobile App Development',
    'Smart GST & Accounting Systems', 'AI & Machine Learning', 'Data Analytics & BI',
    'Cloud & DevOps', 'API & System Integration', 'UI/UX Engineering', 'Digital Transformation',
    'Other / Not sure yet',
];

const budgets = [
    'Under ₹30K',
    '₹30K – ₹50K',
    '₹50K – ₹1L',
    '₹1L – ₹2L',
    '₹2L – ₹5L',
    "Let's discuss",
];
const contactMethods = ['Email', 'Phone call', 'WhatsApp', 'Video call'];

export function ContactForm() {
    const [form, setForm] = useState<FormData>(initialState);
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [leadRef, setLeadRef] = useState<string>('');
    const [errorMsg, setErrorMsg] = useState<string>('');

    const validate = (): boolean => {
        const newErrors: Partial<FormData> = {};
        if (!form.name.trim() || form.name.trim().length < 2) newErrors.name = 'Name must be at least 2 characters';
        if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Valid email is required';
        if (!form.message.trim() || form.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormData]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setStatus('loading');
        setErrorMsg('');

        try {
            const result = await api.leads.submit(form);
            setLeadRef(result.leadRef);
            setStatus('success');
        } catch (err: unknown) {
            setStatus('error');
            const message = err instanceof Error ? err.message : 'Something went wrong. Please try again or email us directly.';
            setErrorMsg(message);
        }
    };

    if (status === 'success') {
        return (
            <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-[#0B1F4A] mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Message received!
                </h3>
                <p className="text-slate-500 text-sm max-w-sm mx-auto mb-4">
                    Your inquiry has been submitted. We will review it and respond within one business day.
                </p>
                {leadRef && (
                    <div className="inline-block px-4 py-2 bg-blue-50 rounded-lg">
                        <span className="text-xs text-slate-500">Reference: </span>
                        <span className="text-sm font-bold text-[#0066FF]">{leadRef}</span>
                    </div>
                )}
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="contact-name" className="label">Full Name *</label>
                    <input
                        id="contact-name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className={`input ${errors.name ? 'border-red-400 focus:border-red-500' : ''}`}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && <p id="name-error" className="mt-1 text-xs text-red-600">{errors.name}</p>}
                </div>
                <div>
                    <label htmlFor="contact-email" className="label">Email Address *</label>
                    <input
                        id="contact-email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className={`input ${errors.email ? 'border-red-400 focus:border-red-500' : ''}`}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && <p id="email-error" className="mt-1 text-xs text-red-600">{errors.email}</p>}
                </div>
            </div>

            {/* Phone + Company */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="contact-phone" className="label">Phone Number</label>
                    <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                        className="input"
                    />
                </div>
                <div>
                    <label htmlFor="contact-company" className="label">Company / Organization</label>
                    <input
                        id="contact-company"
                        name="company"
                        type="text"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Your company (optional)"
                        className="input"
                    />
                </div>
            </div>

            {/* Service + Project Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="contact-service" className="label">Service Interested In</label>
                    <select id="contact-service" name="serviceInterest" value={form.serviceInterest} onChange={handleChange} className="input">
                        <option value="">Select a service...</option>
                        {services.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="contact-budget" className="label">Budget Range</label>
                    <select id="contact-budget" name="budgetRange" value={form.budgetRange} onChange={handleChange} className="input">
                        <option value="">Select budget...</option>
                        {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                </div>
            </div>

            {/* Preferred contact */}
            <div>
                <label htmlFor="contact-method" className="label">Preferred Contact Method</label>
                <select id="contact-method" name="preferredContactMethod" value={form.preferredContactMethod} onChange={handleChange} className="input">
                    <option value="">Select preference...</option>
                    {contactMethods.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
            </div>

            {/* Message */}
            <div>
                <label htmlFor="contact-message" className="label">Tell us about your project *</label>
                <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Describe what you're building, your current challenge, and what success looks like..."
                    className={`textarea ${errors.message ? 'border-red-400 focus:border-red-500' : ''}`}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && <p id="message-error" className="mt-1 text-xs text-red-600">{errors.message}</p>}
            </div>

            {/* Error banner */}
            {status === 'error' && (
                <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-100">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{errorMsg}</p>
                </div>
            )}

            {/* Submit */}
            <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#0066FF] text-white font-bold rounded-xl hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
            >
                {status === 'loading' ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending your message...
                    </>
                ) : (
                    <>
                        Send Message
                        <ArrowRight className="w-5 h-5" />
                    </>
                )}
            </button>

            <p className="text-center text-xs text-slate-400">
                By submitting, you agree to our{' '}
                <a href="/privacy-policy" className="underline hover:text-slate-600">Privacy Policy</a>.
                We never share your information.
            </p>
        </form>
    );
}
