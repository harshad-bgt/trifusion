import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Service } from '@/lib/api';

interface Props {
    services: Service[];
}

const iconMap: Record<string, string> = {
    'code-2': '⌨️',
    'globe': '🌐',
    'smartphone': '📱',
    'layers': '🧩',
    'brain': '🤖',
    'bar-chart-3': '📊',
    'cloud': '☁️',
    'plug': '🔌',
    'pen-tool': '🎨',
    'refresh-cw': '🔄',
};

const fallbackServices = [
    { id: '1', slug: 'custom-software-development', title: 'Custom Software Development', shortDesc: 'Bespoke software engineered around your exact business workflows.', icon: 'code-2', published: true, featured: true, sortOrder: 0 },
    { id: '2', slug: 'web-application-development', title: 'Web Application Development', shortDesc: 'High-performance web applications built for scale and conversion.', icon: 'globe', published: true, featured: true, sortOrder: 1 },
    { id: '3', slug: 'mobile-app-development', title: 'Mobile App Development', shortDesc: 'Native and cross-platform apps for iOS and Android.', icon: 'smartphone', published: true, featured: true, sortOrder: 2 },
    { id: '4', slug: 'smart-gst-accounting', title: 'Smart GST & Accounting Systems', shortDesc: 'Compliance made effortless, with audit‑ready records and automated filings built into your workflows.', icon: 'layers', published: true, featured: true, sortOrder: 3 },
    { id: '5', slug: 'ai-ml', title: 'AI & Machine Learning', shortDesc: 'Practical AI and custom ML that solves real business problems.', icon: 'brain', published: true, featured: true, sortOrder: 4 },
    { id: '6', slug: 'data-analytics', title: 'Data Analytics & BI', shortDesc: 'Transform raw data into clear, actionable business insights.', icon: 'bar-chart-3', published: true, featured: false, sortOrder: 5 },
];

export function SolutionsSection({ services }: Props) {
    const displayServices = services.length > 0 ? services.slice(0, 6) : fallbackServices;

    return (
        <section className="section bg-[#F8FAFF]">
            <div className="container-tf">
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8 sm:mb-12">
                    <div>
                        <span className="label-tag">Our Solutions</span>
                        <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-[#0B1F4A]">
                            Software &amp; GST Solutions Built to Scale
                        </h2>
                        <p className="mt-3 text-slate-500 max-w-xl">
                            From greenfield product development to GST automation and complex systems integration — we cover the full spectrum of modern software engineering.
                        </p>
                    </div>
                    <Link href="/solutions" className="btn-ghost flex-shrink-0">
                        View all solutions <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {displayServices.map((service) => (
                        <Link key={service.id} href={`/solutions/${service.slug}`} className="card-gradient p-6 group block">
                            <div className="text-3xl mb-4">{iconMap[service.icon || ''] || '⚙️'}</div>
                            <h3 className="text-[#0B1F4A] font-semibold text-lg mb-2 group-hover:text-[#0066FF] transition-colors"
                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                {service.title}
                            </h3>
                            <p className="text-slate-500 text-sm leading-relaxed">{service.shortDesc}</p>
                            <div className="mt-4 flex items-center gap-1 text-[#0066FF] text-sm font-medium opacity-0 group-hover:opacity-100 transition-all translate-x-0 group-hover:translate-x-1">
                                Learn more <ArrowRight className="w-3.5 h-3.5" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
