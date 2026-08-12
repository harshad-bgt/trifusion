'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Mail, MapPin, Loader2, CheckCircle2, AlertCircle, Send } from 'lucide-react';

// ── Business Constants ──────────────────────────────────────────
const BUSINESS = {
    name: 'TriFusion Tech LLP',
    phone: '+91 93095 05277',
    phoneTel: 'tel:+919309505277',
    whatsapp: '+91 93095 05277',
    whatsappNum: '919309505277',
    email: 'trifusiontech.llp@gmail.com',
    addressShort: 'Katraj-Kondhwa Road, Katraj, Pune - 411046',
    mapsUrl: 'https://maps.google.com/?q=Katraj-Kondhwa+Road,+Katraj,+Pune+411046',
};

// ── WhatsApp SVG Icon ───────────────────────────────────────────
function WhatsAppIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
    );
}

interface WidgetFormData {
    name: string;
    phone: string;
    email: string;
    message: string;
}

const emptyForm: WidgetFormData = { name: '', phone: '', email: '', message: '' };
type FormErrors = Partial<Record<keyof WidgetFormData, string>>;
type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

function validateForm(form: WidgetFormData): FormErrors {
    const errs: FormErrors = {};
    if (!form.name.trim() || form.name.trim().length < 2) errs.name = 'Please enter your name (min 2 chars)';
    if (!form.phone.trim() || !/^[+\d\s()-]{7,20}$/.test(form.phone.trim())) errs.phone = 'Enter a valid phone/WhatsApp number';
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = 'Please enter a valid email';
    if (!form.message.trim() || form.message.trim().length < 5) errs.message = 'Please describe your requirement (min 5 chars)';
    return errs;
}

function buildWhatsAppUrl(form: WidgetFormData): string {
    const lines = [
        `Hello ${BUSINESS.name},`,
        '',
        'I would like to discuss a requirement.',
        '',
        `Name: ${form.name}`,
        `Phone: ${form.phone}`,
        form.email ? `Email: ${form.email}` : null,
        `Requirement: ${form.message}`,
        '',
        'Thank you.',
    ].filter((l): l is string => l !== null);
    return `https://wa.me/${BUSINESS.whatsappNum}?text=${encodeURIComponent(lines.join('\n'))}`;
}

function buildMailtoUrl(form: WidgetFormData): string {
    const subject = encodeURIComponent(`New Requirement from ${form.name}`);
    const body = encodeURIComponent(
        `Hello TriFusion Tech LLP,\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email || 'N/A'}\n\nRequirement:\n${form.message}\n\nThank you.`
    );
    return `mailto:${BUSINESS.email}?subject=${subject}&body=${body}`;
}

async function captureLeadSilently(data: WidgetFormData) {
    try {
        const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        await fetch(`${API}/api/leads`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: data.name,
                email: data.email || 'not-provided@widget.trifusion',
                phone: data.phone,
                message: data.message,
            }),
        });
    } catch { /* non-blocking */ }
}

function ContactInfoBar() {
    return (
        <div className="border-t border-slate-100 pt-4 mt-4 space-y-2">
            <a href={BUSINESS.phoneTel} className="flex items-center gap-3 text-sm text-slate-600 hover:text-[#0066FF] transition-colors group" aria-label={`Call us at ${BUSINESS.phone}`}>
                <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                    <Phone className="w-3.5 h-3.5 text-[#0066FF]" />
                </span>
                <span>{BUSINESS.phone}</span>
            </a>
            <a href={`https://wa.me/${BUSINESS.whatsappNum}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-slate-600 hover:text-green-600 transition-colors group" aria-label={`WhatsApp us at ${BUSINESS.whatsapp}`}>
                <span className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0 group-hover:bg-green-100 transition-colors">
                    <WhatsAppIcon className="w-3.5 h-3.5 text-green-600" />
                </span>
                <span>{BUSINESS.whatsapp}</span>
            </a>
            <a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-3 text-sm text-slate-600 hover:text-[#0066FF] transition-colors group" aria-label={`Email us at ${BUSINESS.email}`}>
                <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                    <Mail className="w-3.5 h-3.5 text-[#0066FF]" />
                </span>
                <span className="truncate">{BUSINESS.email}</span>
            </a>
            <a href={BUSINESS.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-sm text-slate-600 hover:text-[#0066FF] transition-colors group" aria-label="View our location on Google Maps">
                <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-blue-100 transition-colors">
                    <MapPin className="w-3.5 h-3.5 text-[#0066FF]" />
                </span>
                <span className="leading-snug">{BUSINESS.addressShort}</span>
            </a>
        </div>
    );
}

export function FloatingContactWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [form, setForm] = useState<WidgetFormData>(emptyForm);
    const [errors, setErrors] = useState<FormErrors>({});
    const [status, setStatus] = useState<SubmitStatus>('idle');
    const [apiError, setApiError] = useState('');
    const firstInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) setTimeout(() => firstInputRef.current?.focus(), 100);
    }, [isOpen]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false); };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof WidgetFormData]) setErrors(prev => ({ ...prev, [name]: undefined }));
    };

    const handleWhatsApp = () => {
        const errs = validateForm(form);
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }
        captureLeadSilently(form);
        window.open(buildWhatsAppUrl(form), '_blank', 'noopener,noreferrer');
    };

    const handleEmail = () => {
        const errs = validateForm(form);
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }
        captureLeadSilently(form);
        window.location.href = buildMailtoUrl(form);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errs = validateForm(form);
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }
        setStatus('loading');
        setApiError('');
        try {
            const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
            const res = await fetch(`${API}/api/leads`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: form.name, email: form.email || 'not-provided@widget.trifusion', phone: form.phone, message: form.message }),
            });
            const json = await res.json();
            if (!json.success) throw new Error(json.error?.message || 'Submission failed');
            setStatus('success');
            setForm(emptyForm);
        } catch (err) {
            setStatus('error');
            setApiError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        if (status === 'success') setTimeout(() => { setStatus('idle'); setForm(emptyForm); }, 400);
        else { setErrors({}); setApiError(''); }
    };

    const inputClass = (field: keyof WidgetFormData) =>
        `w-full px-4 py-3 rounded-xl border text-sm bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
            errors[field]
                ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
                : 'border-slate-200 focus:border-[#0066FF] focus:ring-[#0066FF]/20'
        }`;

    return (
        <>
            {/* Backdrop */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[998]"
                        onClick={handleClose}
                        aria-hidden="true"
                    />
                )}
            </AnimatePresence>

            {/* Popup */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="popup"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Contact TriFusion Tech LLP"
                        initial={{ opacity: 0, y: 24, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 16, scale: 0.96 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed bottom-24 right-4 sm:right-6 z-[999] w-[calc(100vw-2rem)] max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[calc(100dvh-7rem)]"
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between px-5 pt-5 pb-4 border-b border-slate-100 flex-shrink-0">
                            <div>
                                <h2 className="text-xl font-bold text-[#0B1F4A]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                    Let&apos;s Talk 👋
                                </h2>
                                <p className="mt-1 text-sm text-slate-500 leading-snug max-w-xs">
                                    Have a requirement or want to discuss a project? Send us a message and we&apos;ll get back to you.
                                </p>
                            </div>
                            <button
                                onClick={handleClose}
                                aria-label="Close contact popup"
                                className="ml-3 mt-0.5 flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF]"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="overflow-y-auto flex-1 px-5 py-4">
                            {status === 'success' ? (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="py-8 text-center">
                                    <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle2 className="w-8 h-8 text-green-500" />
                                    </div>
                                    <h3 className="text-lg font-bold text-[#0B1F4A] mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                        Thanks! Message Received 🎉
                                    </h3>
                                    <p className="text-sm text-slate-500 max-w-xs mx-auto">
                                        We&apos;ve received your requirement and will get back to you shortly — usually within a business day.
                                    </p>
                                    <button onClick={handleClose} className="mt-6 px-6 py-2.5 bg-[#0066FF] text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                                        Close
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
                                    {/* Name */}
                                    <div>
                                        <label htmlFor="widget-name" className="block text-sm font-medium text-slate-700 mb-1">
                                            Full Name <span className="text-red-500" aria-hidden="true">*</span>
                                        </label>
                                        <input ref={firstInputRef} id="widget-name" name="name" type="text" autoComplete="name" value={form.name} onChange={handleChange} placeholder="Rahul Sharma" aria-required="true" aria-describedby={errors.name ? 'wn-err' : undefined} className={inputClass('name')} />
                                        {errors.name && <p id="wn-err" role="alert" className="mt-1 text-xs text-red-600">{errors.name}</p>}
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label htmlFor="widget-phone" className="block text-sm font-medium text-slate-700 mb-1">
                                            Phone / WhatsApp <span className="text-red-500" aria-hidden="true">*</span>
                                        </label>
                                        <input id="widget-phone" name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" aria-required="true" aria-describedby={errors.phone ? 'wp-err' : undefined} className={inputClass('phone')} />
                                        {errors.phone && <p id="wp-err" role="alert" className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label htmlFor="widget-email" className="block text-sm font-medium text-slate-700 mb-1">
                                            Email <span className="text-slate-400 text-xs font-normal">(optional)</span>
                                        </label>
                                        <input id="widget-email" name="email" type="email" autoComplete="email" value={form.email} onChange={handleChange} placeholder="rahul@company.com" aria-describedby={errors.email ? 'we-err' : undefined} className={inputClass('email')} />
                                        {errors.email && <p id="we-err" role="alert" className="mt-1 text-xs text-red-600">{errors.email}</p>}
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label htmlFor="widget-message" className="block text-sm font-medium text-slate-700 mb-1">
                                            Your Requirement <span className="text-red-500" aria-hidden="true">*</span>
                                        </label>
                                        <textarea id="widget-message" name="message" rows={3} value={form.message} onChange={handleChange} placeholder="Tell us about your project or requirement..." aria-required="true" aria-describedby={errors.message ? 'wm-err' : undefined} className={inputClass('message')} style={{ resize: 'none' }} />
                                        {errors.message && <p id="wm-err" role="alert" className="mt-1 text-xs text-red-600">{errors.message}</p>}
                                    </div>

                                    {/* API Error */}
                                    {status === 'error' && apiError && (
                                        <div className="flex items-start gap-2.5 p-3 bg-red-50 rounded-xl border border-red-100" role="alert">
                                            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                                            <p className="text-xs text-red-700">{apiError}</p>
                                        </div>
                                    )}

                                    {/* WhatsApp CTA */}
                                    <button
                                        type="button"
                                        onClick={handleWhatsApp}
                                        className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3.5 bg-[#25D366] text-white text-sm font-bold rounded-xl hover:bg-green-500 active:scale-[0.98] transition-all shadow-md shadow-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                                        aria-label="Send requirement via WhatsApp"
                                    >
                                        <WhatsAppIcon className="w-[18px] h-[18px]" />
                                        Send on WhatsApp
                                    </button>

                                    {/* Email + Submit row */}
                                    <div className="grid grid-cols-2 gap-2.5">
                                        <button
                                            type="button"
                                            onClick={handleEmail}
                                            className="inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF]"
                                            aria-label="Send requirement via Email"
                                        >
                                            <Mail className="w-4 h-4" aria-hidden="true" />
                                            Send Email
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={status === 'loading'}
                                            className="inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-[#0066FF] text-white text-sm font-bold rounded-xl hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98] transition-all shadow-md shadow-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                                        >
                                            {status === 'loading' ? (
                                                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                                            ) : (
                                                <>
                                                    <Send className="w-3.5 h-3.5" aria-hidden="true" />
                                                    Submit
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    {/* Contact Info */}
                                    <ContactInfoBar />
                                </form>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Button */}
            <div className="fixed bottom-6 right-4 sm:right-6 z-[997]">
                {/* Tooltip */}
                <AnimatePresence>
                    {!isOpen && (
                        <motion.span
                            key="tooltip"
                            initial={{ opacity: 0, x: 8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 8 }}
                            transition={{ delay: 2, duration: 0.3 }}
                            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#0B1F4A] text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg pointer-events-none select-none"
                            aria-hidden="true"
                        >
                            Let&apos;s Talk 💬
                            <span className="absolute right-[-5px] top-1/2 -translate-y-1/2 border-t-4 border-b-4 border-l-[5px] border-t-transparent border-b-transparent border-l-[#0B1F4A]" />
                        </motion.span>
                    )}
                </AnimatePresence>

                <button
                    onClick={() => setIsOpen(prev => !prev)}
                    aria-label={isOpen ? 'Close contact popup' : "Open contact popup — Let's Talk"}
                    aria-expanded={isOpen}
                    aria-haspopup="dialog"
                    className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/50 ${
                        isOpen
                            ? 'bg-[#0B1F4A] rotate-90'
                            : 'bg-[#25D366] hover:bg-green-500 hover:scale-110 active:scale-95'
                    }`}
                >
                    {!isOpen && (
                        <>
                            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" aria-hidden="true" />
                            <span className="absolute inset-[-4px] rounded-full border-2 border-[#25D366]/40" aria-hidden="true" />
                        </>
                    )}
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.span key="x" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                                <X className="w-6 h-6 text-white" />
                            </motion.span>
                        ) : (
                            <motion.span key="wa" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }} transition={{ duration: 0.2 }}>
                                <WhatsAppIcon className="w-7 h-7 text-white" />
                            </motion.span>
                        )}
                    </AnimatePresence>
                </button>
            </div>
        </>
    );
}
