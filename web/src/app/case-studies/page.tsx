import type { Metadata } from 'next';
import Link from 'next/link';
import { api } from '@/lib/api';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Case Studies — Real Projects, Real Results',
    description: 'Explore Trifusion Technology case studies. Real engineering challenges, real solutions, real outcomes.',
};

async function getCaseStudies() {
    try {
        const res = await api.caseStudies.list({ limit: 20 });
        return res.items;
    } catch {
        return [];
    }
}

export default async function CaseStudiesPage() {
    const caseStudies = await getCaseStudies();

    return (
        <>
            <section className="pt-10 pb-16 bg-gradient-to-b from-[#F8FAFF] to-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <span className="label-tag">Case Studies</span>
                        <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-[#0B1F4A]">
                            Real projects, real results
                        </h1>
                        <p className="mt-4 text-lg text-slate-500 max-w-2xl">
                            Each case study represents a real engineering challenge we took on, the approach we used, and the measurable outcomes we delivered.
                        </p>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {caseStudies.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="text-4xl mb-4">🔨</div>
                            <h2 className="text-2xl font-bold text-[#0B1F4A] mb-3">Case studies coming soon</h2>
                            <p className="text-slate-500 max-w-md mx-auto mb-8">
                                We&apos;re currently documenting our project outcomes. In the meantime, get in touch to discuss what we&apos;ve built.
                            </p>
                            <Link href="/contact" className="btn-primary">
                                Discuss a project <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {caseStudies.map(cs => (
                                <Link key={cs.id} href={`/case-studies/${cs.slug}`} className="card group block overflow-hidden">
                                    <div className="h-44 bg-gradient-to-br from-[#0B1F4A] to-[#1246A0] flex items-center justify-center p-6">
                                        <h2 className="text-white font-bold text-lg text-center leading-snug"
                                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                            {cs.title}
                                        </h2>
                                    </div>
                                    <div className="p-5">
                                        {cs.industry && (
                                            <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs font-medium mb-3">
                                                {cs.industry.title}
                                            </span>
                                        )}
                                        <p className="text-slate-500 text-sm line-clamp-2 mb-4">{cs.overview || cs.challenge}</p>
                                        {cs.metrics && cs.metrics.length > 0 && (
                                            <div className="grid grid-cols-2 gap-2 mb-4">
                                                {cs.metrics.slice(0, 2).map(m => (
                                                    <div key={m.id} className="bg-slate-50 rounded-lg p-2.5 text-center">
                                                        <div className="text-[#0066FF] font-bold">{m.value}</div>
                                                        <div className="text-slate-500 text-xs">{m.label}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        <div className="flex items-center gap-1 text-[#0066FF] text-sm font-medium group-hover:gap-2 transition-all">
                                            Read case study <ArrowRight className="w-3.5 h-3.5" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
