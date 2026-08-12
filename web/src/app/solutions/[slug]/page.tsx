import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { FAQSection } from '@/components/sections/FAQSection';

interface Props {
    params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    try {
        const service = await api.services.get(params.slug);
        return {
            title: service.seoTitle || `${service.title} Services`,
            description: service.seoDesc || service.shortDesc,
        };
    } catch {
        return { title: 'Service Not Found' };
    }
}

export default async function ServicePage({ params }: Props) {
    let service;
    try {
        service = await api.services.get(params.slug);
    } catch {
        notFound();
    }

    return (
        <>
            {/* Hero */}
            <section className="pt-10 pb-16 bg-gradient-to-br from-[#0B1F4A] via-[#1246A0] to-[#0066FF] text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-blue-300 text-sm mb-8">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link href="/solutions" className="hover:text-white transition-colors">Solutions</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white">{service.title}</span>
                    </nav>

                    <div className="max-w-3xl">
                        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            {service.title}
                        </h1>
                        <p className="text-xl text-blue-200 mb-8 leading-relaxed">{service.shortDesc}</p>
                        <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0066FF] font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg">
                            Discuss Your Project <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Problem Statement */}
            {service.problemStatement && (
                <section className="section bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <span className="label-tag">The Problem</span>
                                <h2 className="mt-4 text-3xl font-bold text-[#0B1F4A]">
                                    Why businesses need this
                                </h2>
                                <p className="mt-4 text-slate-500 leading-relaxed">{service.problemStatement}</p>
                            </div>
                            <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-8">
                                <p className="text-slate-700 leading-relaxed italic">&ldquo;{service.description}&rdquo;</p>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Features */}
            {service.features && service.features.length > 0 && (
                <section className="section bg-[#F8FAFF]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <span className="label-tag">Capabilities</span>
                            <h2 className="mt-4 text-3xl font-bold text-[#0B1F4A]">What we deliver</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {service.features.map(f => (
                                <div key={f.id} className="card p-5 flex items-start gap-4">
                                    <CheckCircle2 className="w-5 h-5 text-[#0066FF] flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-[#0B1F4A] text-sm mb-1">{f.title}</h3>
                                        {f.desc && <p className="text-slate-500 text-xs leading-relaxed">{f.desc}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Technologies */}
            {service.technologies && service.technologies.length > 0 && (
                <section className="section bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-10">
                            <span className="label-tag">Technologies</span>
                            <h2 className="mt-4 text-3xl font-bold text-[#0B1F4A]">Built with</h2>
                        </div>
                        <div className="flex flex-wrap justify-center gap-3">
                            {service.technologies.map(t => (
                                <span key={t.id} className="px-4 py-2 rounded-lg bg-slate-50 border border-slate-200 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:border-blue-200 hover:text-[#0066FF] transition-colors">
                                    {t.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* FAQs */}
            {service.faqs && service.faqs.length > 0 && <FAQSection faqs={service.faqs} />}

            {/* CTA */}
            <section className="section bg-[#F8FAFF]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-[#0B1F4A] rounded-2xl p-10 text-center text-white">
                        <h2 className="text-3xl font-bold mb-3">Ready to get started?</h2>
                        <p className="text-blue-300 mb-8 max-w-xl mx-auto">
                            Tell us about your project and we&apos;ll respond within one business day with a clear plan.
                        </p>
                        <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0066FF] font-bold rounded-xl hover:bg-blue-50 transition-all">
                            Discuss {service.title} <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
