import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
    title: 'Our Engineering Process — Trifusion Technology',
    description: 'Explore the 5-step engineering process Trifusion Technology uses to deliver production-ready software systems.',
};

export default function ProcessPage() {
    return (
        <>
            <section className="pt-10 pb-16 bg-gradient-to-b from-[#F8FAFF] to-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <span className="label-tag">Our Process</span>
                        <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-[#0B1F4A]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            Predictable, High-Quality Software Delivery
                        </h1>
                        <p className="mt-4 text-lg text-slate-500 max-w-2xl leading-relaxed">
                            Our 5-step engineering framework eliminates guesswork, aligns technical execution with business strategy, and ensures zero-downtime launches.
                        </p>
                    </div>
                </div>
            </section>

            <section className="section bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-12">
                        {siteConfig.process.map((step) => (
                            <div key={step.step} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start p-8 rounded-2xl bg-slate-50/70 border border-slate-100">
                                <div className="lg:col-span-2">
                                    <span className="text-5xl font-extrabold text-[#0066FF]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                        {step.step}
                                    </span>
                                </div>
                                <div className="lg:col-span-10">
                                    <h2 className="text-2xl font-bold text-[#0B1F4A] mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                        {step.title}
                                    </h2>
                                    <p className="text-slate-600 text-base leading-relaxed mb-4">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section bg-[#F9FAFB] border-t border-slate-100 text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-[#0B1F4A] mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Ready to Start Sprint Zero?
                    </h2>
                    <p className="text-slate-500 mb-8">
                        Let&apos;s map out your project discovery and architecture plan.
                    </p>
                    <Link href="/contact" className="btn-primary">
                        Discuss Your Roadmap <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>
        </>
    );
}
