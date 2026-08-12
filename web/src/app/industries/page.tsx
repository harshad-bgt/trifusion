import type { Metadata } from 'next';
import Link from 'next/link';
import { api } from '@/lib/api';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Industries — Specialized Domain Engineering | Trifusion Technology',
    description: 'Explore Trifusion Technology industry expertise across Healthcare, FinTech, E-Commerce, Logistics, Education, Real Estate, and Manufacturing.',
};

const industryIcons: Record<string, string> = {
    healthcare: '🏥',
    education: '🎓',
    fintech: '💳',
    ecommerce: '🛍️',
    logistics: '🚚',
    'real-estate': '🏢',
    manufacturing: '🏭',
    retail: '🏪',
};

async function getIndustries() {
    try {
        const res = await api.industries.list();
        return res.items;
    } catch {
        return [];
    }
}

export default async function IndustriesPage() {
    const industries = await getIndustries();

    return (
        <>
            <section className="pt-10 pb-16 bg-gradient-to-b from-[#F8FAFF] to-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <span className="label-tag">Industries</span>
                        <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-[#0B1F4A]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            Domain Expertise That Moves Your Industry Forward
                        </h1>
                        <p className="mt-4 text-lg text-slate-500 max-w-2xl leading-relaxed">
                            We bring deep technical capability combined with domain awareness to build software that complies with regulatory requirements, scales smoothly, and solves real operational challenges.
                        </p>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {industries.map(ind => {
                            const challenges = ind.challenges ? JSON.parse(ind.challenges) as string[] : [];

                            return (
                                <Link key={ind.id} href={`/industries/${ind.slug}`} className="card p-7 group flex flex-col justify-between hover:border-blue-200 hover:shadow-lg transition-all">
                                    <div>
                                        <div className="text-4xl mb-4">{industryIcons[ind.slug] || '🏢'}</div>
                                        <h2 className="text-[#0B1F4A] font-bold text-2xl mb-3 group-hover:text-[#0066FF] transition-colors" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                            {ind.title}
                                        </h2>
                                        <p className="text-slate-500 text-sm leading-relaxed mb-6">{ind.shortDesc}</p>

                                        {challenges.length > 0 && (
                                            <div className="mb-6 bg-slate-50 rounded-xl p-4">
                                                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Key Challenges Solved</div>
                                                <ul className="space-y-1.5">
                                                    {challenges.slice(0, 2).map((c, i) => (
                                                        <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1 flex-shrink-0" />
                                                            {c}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-1.5 text-sm font-semibold text-[#0066FF] group-hover:gap-2.5 transition-all">
                                        Explore {ind.title} Solutions <ArrowRight className="w-4 h-4" />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}
