import type { Metadata } from 'next';
import { ContactForm } from '@/components/forms/ContactForm';
import { siteConfig } from '@/lib/config';
import { Mail, Phone, MapPin, Clock, CheckCircle2 } from 'lucide-react';

// Inline WhatsApp icon — no extra dependency
function WhatsAppIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
    );
}

export const metadata: Metadata = {
    title: 'Contact Us — TriFusion Tech LLP',
    description: 'Get in touch with TriFusion Tech LLP. Tell us about your project — custom software or GST system — and we will respond within one business day.',
};

export default function ContactPage() {
    return (
        <>
            {/* Page Header */}
            <section className="pt-8 pb-12 bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <span className="label-tag">Contact Us</span>
                        <h1
                            className="mt-4 text-4xl sm:text-5xl font-bold text-[#0B1F4A]"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                            Let&apos;s discuss your project
                        </h1>
                        <p className="mt-4 text-lg text-slate-500 leading-relaxed">
                            Tell us what you&apos;re building. We read every message and respond within one business day with a clear perspective on how we can help.
                        </p>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/*
                        Mobile: sidebar first (contact info top), form below
                        Desktop: form left (3 cols), sidebar right (2 cols)
                        Achieved with flex-col-reverse on mobile, lg:grid on desktop
                    */}
                    <div className="flex flex-col-reverse gap-10 lg:grid lg:grid-cols-5 lg:gap-12">

                        {/* Contact Form — main (col-span 3, appears second on mobile) */}
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8">
                                <h2
                                    className="text-2xl font-bold text-[#0B1F4A] mb-1"
                                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                >
                                    Project inquiry
                                </h2>
                                <p className="text-slate-500 text-sm mb-8">All fields marked * are required.</p>
                                <ContactForm />
                            </div>
                        </div>

                        {/* Sidebar (appears first on mobile — flex-col-reverse puts it on top) */}
                        <div className="lg:col-span-2 space-y-5">
                            {/* Contact Info Card */}
                            <div className="bg-[#0B1F4A] rounded-2xl p-6 text-white">
                                <h3 className="font-bold text-lg mb-5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                    Get in touch directly
                                </h3>
                                <div className="space-y-4">
                                    {/* Phone */}
                                    <a
                                        href="tel:+919309505277"
                                        className="flex items-start gap-3 text-blue-200 hover:text-white transition-colors"
                                        aria-label="Call TriFusion Tech LLP"
                                    >
                                        <Phone className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-400" aria-hidden="true" />
                                        <span className="text-sm">+91 93095 05277</span>
                                    </a>

                                    {/* WhatsApp — show actual number + correct icon */}
                                    <a
                                        href="https://wa.me/919309505277"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-start gap-3 text-blue-200 hover:text-green-400 transition-colors"
                                        aria-label="Chat on WhatsApp"
                                    >
                                        <WhatsAppIcon className="w-5 h-5 mt-0.5 flex-shrink-0 text-green-400" />
                                        <span className="text-sm">+91 93095 05277 <span className="text-blue-400">(WhatsApp)</span></span>
                                    </a>

                                    {/* Email */}
                                    <a
                                        href={`mailto:${siteConfig.contact.email}`}
                                        className="flex items-start gap-3 text-blue-200 hover:text-white transition-colors"
                                        aria-label={`Email ${siteConfig.contact.email}`}
                                    >
                                        <Mail className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-400" aria-hidden="true" />
                                        <span className="text-sm break-all">{siteConfig.contact.email}</span>
                                    </a>

                                    {/* Address */}
                                    <a
                                        href={siteConfig.contact.mapsUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-start gap-3 text-blue-200 hover:text-white transition-colors"
                                        aria-label="View office on Google Maps"
                                    >
                                        <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-400" aria-hidden="true" />
                                        <span className="text-sm">{siteConfig.contact.address}</span>
                                    </a>
                                </div>
                            </div>

                            {/* What to expect */}
                            <div className="card p-5">
                                <div className="flex items-center gap-3 mb-3">
                                    <Clock className="w-5 h-5 text-[#0066FF]" aria-hidden="true" />
                                    <h4 className="font-semibold text-[#0B1F4A] text-sm">What to expect</h4>
                                </div>
                                <ul className="space-y-2">
                                    {[
                                        'We read every message personally',
                                        'Response within 1 business day',
                                        'Initial call to understand your needs',
                                        'Clear proposal with timeline and scope',
                                        'No commitment required',
                                    ].map(item => (
                                        <li key={item} className="flex items-start gap-2 text-slate-500 text-xs">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* FAQ prompt */}
                            <div className="bg-blue-50 rounded-xl p-4">
                                <p className="text-sm text-slate-600">
                                    Have a quick question?{' '}
                                    <a href="/#faq" className="text-[#0066FF] font-medium hover:underline">
                                        Check our FAQ →
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
