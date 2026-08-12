'use client';

import { useState, useEffect } from 'react';
import { X, ArrowRight, Loader2, CheckCircle2, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '@/lib/api';

interface FormData {
    name: string;
    email: string;
    phone: string;
    company: string;
    serviceInterest: string;
    budgetRange: string;
    message: string;
}

const initialState: FormData = {
    name: '', email: '', phone: '', company: '',
    serviceInterest: '', budgetRange: '', message: '',
};

const services = [
    'Custom Software Development',
    'Web Application Development',
    'Mobile App Development',
    'Smart GST & Accounting Systems',
    'AI & Machine Learning',
    'UI/UX Engineering',
    'Other / Not sure yet',
];

const budgets = [
    'Under ₹30K', '₹30K – ₹50K', '₹50K – ₹1L',
    '₹1L – ₹2L', '₹2L – ₹5L', "Let's discuss",
];

// ── Global event to open the drawer from anywhere ────────────
export function openProjectDrawer() {
    window.dispatchEvent(new CustomEvent('open-project-drawer'));
}

export function ProjectDrawer() {
    const [open, setOpen]     = useState(false);
    const [form, setForm]     = useState<FormData>(initialState);
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [leadRef, setLeadRef] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    // Listen for global open event
    useEffect(() => {
        const handler = () => setOpen(true);
        window.addEventListener('open-project-drawer', handler);
        return () => window.removeEventListener('open-project-drawer', handler);
    }, []);

    // Lock body scroll when open
    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    // Close on Escape
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, []);

    const close = () => {
        setOpen(false);
        // Reset after animation
        setTimeout(() => {
            setForm(initialState);
            setErrors({});
            setStatus('idle');
            setLeadRef('');
            setErrorMsg('');
        }, 300);
    };

    const validate = (): boolean => {
        const e: Partial<FormData> = {};
        if (!form.name.trim() || form.name.trim().length < 2) e.name = 'Name must be at least 2 characters';
        if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email is required';
        if (!form.message.trim() || form.message.trim().length < 10) e.message = 'Message must be at least 10 characters';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormData]) setErrors(prev => ({ ...prev, [name]: undefined }));
    };

    const handleSubmit = async (ev: React.FormEvent) => {
        ev.preventDefault();
        if (!validate()) return;
        setStatus('loading');
        setErrorMsg('');
        try {
            const result = await api.leads.submit(form);
            setLeadRef(result.leadRef);
            setStatus('success');
        } catch (err: unknown) {
            setStatus('error');
            setErrorMsg(err instanceof Error ? err.message : "We couldn't send your message. Please try again.");
        }
    };

    const inputClass = (err?: string) =>
        `w-full px-3.5 py-2.5 text-sm rounded-xl border ${err ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-[#0066FF]'} focus:outline-none focus:ring-2 ${err ? 'focus:ring-red-100' : 'focus:ring-blue-100'} bg-white transition-all placeholder:text-slate-400 text-slate-800`;

    return (
        <>
            {/* Backdrop */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
                        onClick={close}
                        aria-hidden="true"
                    />
                )}
            </AnimatePresence>

            {/* Drawer */}
            <AnimatePresence>
                {open && (
                    <motion.aside
                        key="drawer"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 340, damping: 38 }}
                        className="fixed top-0 right-0 bottom-0 w-full sm:w-[480px] bg-white z-[70] flex flex-col shadow-2xl"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Discuss Your Project"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-[#0B1F4A] to-[#0066FF]">
                            <div>
                                <p className="text-xs text-blue-200 font-medium tracking-wider uppercase">Quick Enquiry</p>
                                <h2 className="text-lg font-bold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                    Discuss Your Project
                                </h2>
                            </div>
                            <button
                                onClick={close}
                                aria-label="Close"
                                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="flex-1 overflow-y-auto px-6 py-5">
                            {status === 'success' ? (
                                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                                    <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
                                        <CheckCircle2 className="w-8 h-8 text-green-500" />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#0B1F4A] mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                        Message received!
                                    </h3>
                                    <p className="text-slate-500 text-sm max-w-xs mb-4">
                                        We&apos;ll review your enquiry and respond within one business day.
                                    </p>
                                    {leadRef && (
                                        <div className="inline-block px-4 py-2 bg-blue-50 rounded-lg mb-6">
                                            <span className="text-xs text-slate-500">Reference: </span>
                                            <span className="text-sm font-bold text-[#0066FF]">{leadRef}</span>
                                        </div>
                                    )}
                                    <button
                                        onClick={close}
                                        className="px-6 py-2.5 bg-[#0066FF] text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                                    >
                                        Close
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                                    {/* Name */}
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-600 mb-1.5">Full Name *</label>
                                        <input name="name" type="text" value={form.name} onChange={handleChange}
                                            placeholder="Your full name" className={inputClass(errors.name)} />
                                        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                                    </div>

                                    {/* Email + Phone */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Email *</label>
                                            <input name="email" type="email" value={form.email} onChange={handleChange}
                                                placeholder="your@email.com" className={inputClass(errors.email)} />
                                            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Phone</label>
                                            <input name="phone" type="tel" value={form.phone} onChange={handleChange}
                                                placeholder="+91 XXXXX XXXXX" className={inputClass()} />
                                        </div>
                                    </div>

                                    {/* Company */}
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-600 mb-1.5">Company</label>
                                        <input name="company" type="text" value={form.company} onChange={handleChange}
                                            placeholder="Your company (optional)" className={inputClass()} />
                                    </div>

                                    {/* Service + Budget */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Service</label>
                                            <select name="serviceInterest" value={form.serviceInterest} onChange={handleChange} className={inputClass()}>
                                                <option value="">Select...</option>
                                                {services.map(s => <option key={s} value={s}>{s}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Budget</label>
                                            <select name="budgetRange" value={form.budgetRange} onChange={handleChange} className={inputClass()}>
                                                <option value="">Select...</option>
                                                {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-600 mb-1.5">Tell us about your project *</label>
                                        <textarea name="message" value={form.message} onChange={handleChange} rows={4}
                                            placeholder="What are you building? What&apos;s your timeline and main challenge?"
                                            className={inputClass(errors.message)} />
                                        {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
                                    </div>

                                    {status === 'error' && (
                                        <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">{errorMsg}</p>
                                    )}

                                    <button type="submit" disabled={status === 'loading'}
                                        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0066FF] text-white font-bold rounded-xl hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg text-sm"
                                    >
                                        {status === 'loading' ? (
                                            <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                                        ) : (
                                            <>Send Enquiry <ArrowRight className="w-4 h-4" /></>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Footer — quick contacts */}
                        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50">
                            <p className="text-xs text-slate-400 mb-2 font-medium">Or reach us directly</p>
                            <div className="flex flex-col gap-1.5">
                                <a href="tel:+919309505277" className="flex items-center gap-2 text-xs text-slate-600 hover:text-[#0066FF] transition-colors">
                                    <Phone className="w-3.5 h-3.5 text-[#0066FF]" /> +91 93095 05277
                                </a>
                                <a href="mailto:trifusiontech.llp@gmail.com" className="flex items-center gap-2 text-xs text-slate-600 hover:text-[#0066FF] transition-colors">
                                    <Mail className="w-3.5 h-3.5 text-[#0066FF]" /> trifusiontech.llp@gmail.com
                                </a>
                            </div>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    );
}
