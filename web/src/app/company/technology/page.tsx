import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Code2, Server, Database, Cloud, Smartphone, Cpu } from 'lucide-react';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
    title: 'Technology Stack — Trifusion Technology',
    description: 'Explore the modern engineering stack Trifusion Technology uses across Frontend, Backend, Mobile, Cloud, Databases, and AI/ML.',
};

export default function TechnologyPage() {
    const techCategories = [
        { title: 'Frontend Engineering', icon: Code2, items: siteConfig.techStack.Frontend },
        { title: 'Backend & APIs', icon: Server, items: siteConfig.techStack.Backend },
        { title: 'Mobile Applications', icon: Smartphone, items: siteConfig.techStack.Mobile },
        { title: 'Databases & Storage', icon: Database, items: siteConfig.techStack.Database },
        { title: 'Cloud & Infrastructure', icon: Cloud, items: siteConfig.techStack.Cloud },
        { title: 'AI & Machine Learning', icon: Cpu, items: siteConfig.techStack['AI / ML'] },
    ];

    return (
        <>
            <section className="pt-10 pb-16 bg-gradient-to-b from-[#F8FAFF] to-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <span className="label-tag">Technology Stack</span>
                        <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-[#0B1F4A]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            Modern, Pragmatic Engineering Stack
                        </h1>
                        <p className="mt-4 text-lg text-slate-500 max-w-2xl leading-relaxed">
                            We select frameworks and languages based on performance, ecosystem maturity, and long-term maintainability — never tech trends alone.
                        </p>
                    </div>
                </div>
            </section>

            <section className="section bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {techCategories.map((cat, i) => (
                            <div key={i} className="card p-7 border border-slate-100">
                                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center mb-6">
                                    <cat.icon className="w-6 h-6" />
                                </div>
                                <h2 className="text-xl font-bold text-[#0B1F4A] mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                    {cat.title}
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {cat.items.map((tech, ti) => (
                                        <span key={ti} className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-sm font-medium">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section bg-[#F9FAFB] border-t border-slate-100 text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-[#0B1F4A] mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Need Guidance on Stack Selection?
                    </h2>
                    <p className="text-slate-500 mb-8">
                        Our architects can review your current stack or recommend the optimal foundation for your new product.
                    </p>
                    <Link href="/contact" className="btn-primary">
                        Consult Our Architects <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>
        </>
    );
}
