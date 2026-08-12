import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Shield, Zap, Target, Users } from 'lucide-react';

export const metadata: Metadata = {
    title: 'About TriFusion Tech LLP — Custom Software & GST Accounting Systems',
    description: 'Learn about TriFusion Tech LLP — our engineering principles, mission, and how we build custom software and GST systems for businesses ready to scale.',
};

export default function AboutPage() {
    return (
        <>
            {/* Hero */}
            <section className="pt-10 pb-16 bg-gradient-to-b from-[#F8FAFF] to-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <span className="label-tag">Company</span>
                        <h1
                            className="mt-4 text-4xl sm:text-5xl font-bold text-[#0B1F4A]"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                            Building Technology That Gives Businesses Real Control
                        </h1>
                        <p className="mt-4 text-lg text-slate-500 max-w-2xl leading-relaxed">
                            TriFusion Tech LLP is a full-service software engineering firm based in Pune. We design, build, and scale custom software products, GST accounting systems, mobile applications, and AI-powered business automation.
                        </p>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="section bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="label-tag">Our Culture</span>
                        <h2
                            className="text-3xl sm:text-4xl font-bold text-[#0B1F4A] mt-3"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                            Engineering Principles We Live By
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: Shield,
                                title: 'Clean Architecture First',
                                desc: "We don't cut architectural corners. Scalability and maintainability are designed in from sprint one.",
                            },
                            {
                                icon: Target,
                                title: 'Business Outcome Focus',
                                desc: 'Code is a tool to solve business problems. We measure success by real operational outcomes.',
                            },
                            {
                                icon: Zap,
                                title: 'Transparent Delivery',
                                desc: 'No black boxes. Weekly demos, clear roadmaps, and open communication lines at every phase.',
                            },
                            {
                                icon: Users,
                                title: 'Ownership Mindset',
                                desc: 'We act as true technology partners, taking active ownership of technical decisions and platform longevity.',
                            },
                        ].map((v, i) => (
                            <div key={i} className="card p-7">
                                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center mb-6">
                                    <v.icon className="w-6 h-6" aria-hidden="true" />
                                </div>
                                <h3
                                    className="text-[#0B1F4A] font-bold text-xl mb-3"
                                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                >
                                    {v.title}
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section bg-[#F9FAFB] border-t border-slate-100 text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <h2
                        className="text-3xl font-bold text-[#0B1F4A] mb-4"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        Partner with TriFusion Tech LLP
                    </h2>
                    <p className="text-slate-500 mb-8">
                        Ready to build technology that actually solves your business problems? Let&apos;s discuss your roadmap.
                    </p>
                    <Link href="/contact" className="btn-primary">
                        Discuss Your Project <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>
        </>
    );
}
