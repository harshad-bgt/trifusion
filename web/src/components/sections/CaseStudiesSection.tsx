import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { CaseStudy } from '@/lib/api';

interface Props {
    caseStudies: CaseStudy[];
}

// Subtle on-brand accent variations — navy shifts, all consistent with brand palette
const CARD_HEADER_STYLES = [
    'bg-gradient-to-br from-[#0B1F4A] to-[#1246A0]',
    'bg-gradient-to-br from-[#0D2B5E] to-[#0055CC]',
    'bg-gradient-to-br from-[#132952] to-[#003D99]',
];

export function CaseStudiesSection({ caseStudies }: Props) {
    return (
        <section className="section bg-[#F8FAFF]">
            <div className="container-tf">
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
                    <div>
                        <span className="label-tag">Case Studies</span>
                        <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-[#0B1F4A]">
                            Work we&apos;re proud of
                        </h2>
                        <p className="mt-3 text-slate-500 max-w-xl">
                            Real projects, real outcomes. Each case study represents an engineering challenge we solved from the ground up.
                        </p>
                    </div>
                    <Link href="/case-studies" className="btn-ghost flex-shrink-0">
                        View all case studies <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {caseStudies.map((cs, index) => (
                        <Link key={cs.id} href={`/case-studies/${cs.slug}`} className="card group block overflow-hidden">
                            {/* Header — subtle color variation per card */}
                            <div className={`h-40 ${CARD_HEADER_STYLES[index % CARD_HEADER_STYLES.length]} flex items-center justify-center p-6`}>
                                <h3
                                    className="text-white font-bold text-lg text-center leading-snug"
                                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                >
                                    {cs.title}
                                </h3>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                {cs.industry && (
                                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs font-medium mb-3">
                                        {cs.industry.title}
                                    </span>
                                )}
                                <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-4">
                                    {cs.overview || cs.challenge}
                                </p>

                                {/* Metrics */}
                                {cs.metrics && cs.metrics.length > 0 && (
                                    <div className="grid grid-cols-2 gap-2 mb-4">
                                        {cs.metrics.slice(0, 2).map(m => (
                                            <div key={m.id} className="bg-slate-50 rounded-lg p-2.5 text-center">
                                                <div className="text-[#0066FF] font-bold text-lg">{m.value}</div>
                                                <div className="text-slate-500 text-xs mt-0.5">{m.label}</div>
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
            </div>
        </section>
    );
}
