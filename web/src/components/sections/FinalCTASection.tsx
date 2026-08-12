'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { AnimateIn } from '@/components/ui/AnimateIn';
import { openProjectDrawer } from '@/components/ui/ProjectDrawer';

export function FinalCTASection() {
    return (
        <section className="section">
            <div className="container-tf">
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0B1F4A] via-[#1246A0] to-[#0066FF] px-6 sm:px-12 py-14 sm:py-20 text-center">
                    {/* Subtle dot pattern */}
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: 'radial-gradient(circle at 25% 50%, white 1px, transparent 1px), radial-gradient(circle at 75% 50%, white 1px, transparent 1px)',
                            backgroundSize: '60px 60px',
                        }}
                        aria-hidden="true"
                    />

                    <AnimateIn>
                        <h2
                            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                            Let&apos;s solve your next technology challenge.
                        </h2>
                        <p className="text-blue-200 max-w-xl mx-auto mb-10 text-base sm:text-lg leading-relaxed">
                            Tell us about your project — custom software, GST system, or anything in between. We&apos;ll respond within one business day with a clear plan.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button
                                id="final-cta-discuss"
                                onClick={openProjectDrawer}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#0066FF] font-bold rounded-xl hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95"
                            >
                                Discuss Your Project
                                <ArrowRight className="w-4 h-4" />
                            </button>
                            <Link
                                href="/case-studies"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all border border-white/20 hover:scale-105 active:scale-95"
                            >
                                Explore Our Work
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-blue-200 text-sm">
                            {['No commitment required', 'Response within 1 business day', 'Free initial consultation'].map(text => (
                                <div key={text} className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" aria-hidden="true" />
                                    {text}
                                </div>
                            ))}
                        </div>
                    </AnimateIn>
                </div>
            </div>
        </section>
    );
}
