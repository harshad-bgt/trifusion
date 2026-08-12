import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { api } from '@/lib/api';
import { ArrowRight, ChevronRight } from 'lucide-react';

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    try {
        const cs = await api.caseStudies.get(params.slug);
        return { title: cs.seoTitle || cs.title, description: cs.seoDesc || cs.overview || '' };
    } catch { return { title: 'Case Study' }; }
}

export default async function CaseStudyPage({ params }: Props) {
    let cs;
    try { cs = await api.caseStudies.get(params.slug); }
    catch { notFound(); }

    return (
        <>
            {/* Hero */}
            <section className="pt-10 pb-16 bg-gradient-to-br from-[#0B1F4A] to-[#1246A0] text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 text-blue-300 text-sm mb-8">
                        <Link href="/" className="hover:text-white">Home</Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link href="/case-studies" className="hover:text-white">Case Studies</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white">{cs.title}</span>
                    </nav>
                    <div className="max-w-3xl">
                        {cs.industry && <span className="label-tag mb-4 bg-white/10 text-blue-200">{cs.industry.title}</span>}
                        <h1 className="text-4xl sm:text-5xl font-bold text-white mt-4 mb-4">{cs.title}</h1>
                        {cs.overview && <p className="text-xl text-blue-200 leading-relaxed">{cs.overview}</p>}
                    </div>
                </div>
            </section>

            {/* Metrics */}
            {cs.metrics && cs.metrics.length > 0 && (
                <section className="section-sm bg-white border-b border-slate-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                            {cs.metrics.map(m => (
                                <div key={m.id} className="text-center">
                                    <div className="text-3xl font-bold text-[#0066FF] mb-1">{m.value}</div>
                                    <div className="text-slate-500 text-sm">{m.label}</div>
                                    {m.description && <div className="text-slate-400 text-xs mt-1">{m.description}</div>}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Content */}
            <section className="section bg-[#F8FAFF]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-10">
                            {cs.challenge && (
                                <div>
                                    <h2 className="text-2xl font-bold text-[#0B1F4A] mb-4">The Challenge</h2>
                                    <p className="text-slate-600 leading-relaxed">{cs.challenge}</p>
                                </div>
                            )}
                            {cs.solution && (
                                <div>
                                    <h2 className="text-2xl font-bold text-[#0B1F4A] mb-4">Our Solution</h2>
                                    <p className="text-slate-600 leading-relaxed">{cs.solution}</p>
                                </div>
                            )}
                            {cs.architecture && (
                                <div>
                                    <h2 className="text-2xl font-bold text-[#0B1F4A] mb-4">Technical Architecture</h2>
                                    <p className="text-slate-600 leading-relaxed">{cs.architecture}</p>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {cs.technologies && cs.technologies.length > 0 && (
                                <div className="card p-5">
                                    <h3 className="font-bold text-[#0B1F4A] mb-3 text-sm">Technologies Used</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {cs.technologies.map((t, i) => (
                                            <span key={i} className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium">{t.name}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {cs.testimonial && (
                                <div className="card p-5 bg-blue-50">
                                    <blockquote className="text-slate-700 text-sm leading-relaxed italic mb-4">
                                        &ldquo;{cs.testimonial.quote}&rdquo;
                                    </blockquote>
                                    <div className="font-semibold text-[#0B1F4A] text-sm">{cs.testimonial.name}</div>
                                    {cs.testimonial.title && <div className="text-slate-500 text-xs">{cs.testimonial.title}</div>}
                                </div>
                            )}

                            <div className="card p-5">
                                <h3 className="font-bold text-[#0B1F4A] mb-3 text-sm">Have a similar challenge?</h3>
                                <p className="text-slate-500 text-xs mb-4">Let&apos;s discuss how we can help your business.</p>
                                <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0066FF]">
                                    Start a conversation <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
