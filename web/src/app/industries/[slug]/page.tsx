import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { api } from '@/lib/api';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

interface Props {
    params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    try {
        const ind = await api.industries.get(params.slug);
        return {
            title: `${ind.title} Software Solutions — Trifusion Technology`,
            description: ind.shortDesc || `Custom software engineering for ${ind.title}.`,
        };
    } catch {
        return { title: 'Industry — Trifusion Technology' };
    }
}

export default async function IndustryDetailPage({ params }: Props) {
    let ind;
    try {
        ind = await api.industries.get(params.slug);
    } catch {
        notFound();
    }

    const challenges = ind.challenges ? JSON.parse(ind.challenges) as string[] : [];
    const outcomes = ind.outcomes ? JSON.parse(ind.outcomes) as string[] : [];

    return (
        <>
            {/* Hero */}
            <section className="pt-10 pb-16 bg-gradient-to-b from-[#F8FAFF] to-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <Link href="/industries" className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-[#0066FF] mb-4">
                            ← Back to Industries
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-bold text-[#0B1F4A]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            Software Engineering for {ind.title}
                        </h1>
                        <p className="mt-4 text-lg text-slate-500 max-w-2xl leading-relaxed">
                            {ind.description || ind.shortDesc}
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link href="/contact" className="btn-primary">
                                Discuss Your {ind.title} Project <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Challenges & Outcomes */}
            <section className="section bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Challenges */}
                        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                                    <AlertCircle className="w-5 h-5" />
                                </div>
                                <h2 className="text-2xl font-bold text-[#0B1F4A]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                    Industry Challenges
                                </h2>
                            </div>
                            <ul className="space-y-4">
                                {challenges.map((c, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-700 font-medium text-sm">
                                        <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                                        {c}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Outcomes */}
                        <div className="bg-blue-50/60 rounded-2xl p-8 border border-blue-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0066FF] flex items-center justify-center">
                                    <CheckCircle2 className="w-5 h-5" />
                                </div>
                                <h2 className="text-2xl font-bold text-[#0B1F4A]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                    Trifusion Measurable Outcomes
                                </h2>
                            </div>
                            <ul className="space-y-4">
                                {outcomes.map((o, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-800 font-medium text-sm">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                                        {o}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section bg-[#F9FAFB] border-t border-slate-100 text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-[#0B1F4A] mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Ready to innovate in {ind.title}?
                    </h2>
                    <p className="text-slate-500 mb-8">
                        Let&apos;s map out your technical architecture and project timeline.
                    </p>
                    <Link href="/contact" className="btn-primary">
                        Start a Conversation <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>
        </>
    );
}
