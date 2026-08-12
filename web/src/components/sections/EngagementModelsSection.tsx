import { siteConfig } from '@/lib/config';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function EngagementModelsSection() {
    return (
        <section className="section bg-white">
            <div className="container-tf">
                <div className="text-center mb-14">
                    <span className="label-tag">Engagement Models</span>
                    <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-[#0B1F4A]">
                        How we work together
                    </h2>
                    <p className="mt-4 text-slate-500 max-w-xl mx-auto">
                        Every project is different. We adapt our engagement model to fit your context, not the other way around.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {siteConfig.engagementModels.map((model, i) => (
                        <div key={model.title} className={`card-gradient p-7 flex flex-col ${i === 1 ? 'border-[#0066FF]/30 ring-2 ring-[#0066FF]/10' : ''}`}>
                            {i === 1 && (
                                <div className="mb-4">
                                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold">Most Popular</span>
                                </div>
                            )}
                            <h3 className="text-[#0B1F4A] font-bold text-xl mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                {model.title}
                            </h3>
                            <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1">{model.description}</p>

                            <div className="space-y-2 mb-5">
                                <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Ideal for</div>
                                <div className="text-sm font-medium text-slate-700">{model.idealFor}</div>
                            </div>

                            <div className="space-y-1.5 mb-6">
                                {model.highlights.map(h => (
                                    <div key={h} className="flex items-center gap-2 text-sm text-slate-600">
                                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                                        {h}
                                    </div>
                                ))}
                            </div>

                            <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0066FF] hover:gap-3 transition-all">
                                Get started <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
