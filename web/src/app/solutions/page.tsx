import type { Metadata } from 'next';
import Link from 'next/link';
import { api } from '@/lib/api';
import { ArrowRight } from 'lucide-react';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
    title: 'Solutions — Software Engineering Services',
    description: 'Explore Trifusion Technology solutions: custom software, SaaS, mobile apps, AI/ML, cloud, and more.',
};

const iconMap: Record<string, string> = {
    'code-2': '⌨️', 'globe': '🌐', 'smartphone': '📱', 'layers': '🧩',
    'brain': '🤖', 'bar-chart-3': '📊', 'cloud': '☁️', 'plug': '🔌',
    'pen-tool': '🎨', 'refresh-cw': '🔄',
};

async function getServices() {
    try {
        const res = await api.services.list({ limit: 20 });
        return res.items;
    } catch {
        return siteConfig.nav.solutions.map((s, i) => ({
            id: String(i),
            slug: s.href.replace('/solutions/', ''),
            title: s.label,
            shortDesc: '',
            description: '',
            icon: '',
            published: true,
            featured: false,
            sortOrder: i,
        }));
    }
}

export default async function SolutionsPage() {
    const services = await getServices();

    return (
        <>
            {/* Hero */}
            <section className="pt-10 pb-16 bg-gradient-to-b from-[#F8FAFF] to-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <span className="label-tag">Solutions</span>
                        <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-[#0B1F4A]">
                            Software built for your exact problem
                        </h1>
                        <p className="mt-4 text-lg text-slate-500 leading-relaxed max-w-2xl">
                            We cover the full spectrum of modern software engineering — from greenfield product development to complex systems integration.
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="section">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map(service => (
                            <Link key={service.id} href={`/solutions/${service.slug}`} className="card-gradient p-7 group block">
                                <div className="text-3xl mb-4">{iconMap[service.icon || ''] || '⚙️'}</div>
                                <h2 className="text-[#0B1F4A] font-bold text-xl mb-2 group-hover:text-[#0066FF] transition-colors"
                                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                    {service.title}
                                </h2>
                                {service.shortDesc && (
                                    <p className="text-slate-500 text-sm leading-relaxed mb-4">{service.shortDesc}</p>
                                )}
                                <div className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0066FF] group-hover:gap-2.5 transition-all">
                                    Learn more <ArrowRight className="w-4 h-4" />
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-16 text-center">
                        <p className="text-slate-500 mb-4">Not sure which solution fits your needs?</p>
                        <Link href="/contact" className="btn-primary">
                            Tell us about your project <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
