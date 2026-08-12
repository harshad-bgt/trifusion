import type { Metadata } from 'next';
import { api } from '@/lib/api';
import { HeroSection } from '@/components/sections/HeroSection';
import { SolutionsSection } from '@/components/sections/SolutionsSection';
import { IndustriesSection } from '@/components/sections/IndustriesSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { TechStackSection } from '@/components/sections/TechStackSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { CaseStudiesSection } from '@/components/sections/CaseStudiesSection';
import { EngagementModelsSection } from '@/components/sections/EngagementModelsSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { FinalCTASection } from '@/components/sections/FinalCTASection';

export const metadata: Metadata = {
    title: 'TriFusion Tech LLP | Custom Software & GST Accounting Systems',
    description: 'TriFusion Tech LLP builds custom software, GST accounting systems, mobile applications, and AI-powered solutions for businesses ready to scale.',
    openGraph: {
        title: 'TriFusion Tech LLP | Custom Software & GST Accounting Systems',
        description: 'From bespoke software to audit-ready GST automation — we engineer technology that gives you operational control and seamless compliance.',
    },
};

// Server-side data fetching
async function getHomepageData() {
    try {
        const [servicesRes, caseStudiesRes, testimonialsRes, faqsRes] = await Promise.allSettled([
            api.services.list({ limit: 6 }),
            api.caseStudies.list({ featured: 'true', limit: 3 }),
            api.testimonials.list(),
            api.faqs.list(),
        ]);

        return {
            services: servicesRes.status === 'fulfilled' ? servicesRes.value.items : [],
            caseStudies: caseStudiesRes.status === 'fulfilled' ? caseStudiesRes.value.items : [],
            testimonials: testimonialsRes.status === 'fulfilled' ? testimonialsRes.value : [],
            faqs: faqsRes.status === 'fulfilled' ? faqsRes.value : [],
        };
    } catch {
        return { services: [], caseStudies: [], testimonials: [], faqs: [] };
    }
}

export default async function HomePage() {
    const { services, caseStudies, testimonials, faqs } = await getHomepageData();

    return (
        <>
            {/* 1. Hero — immediate value proposition */}
            <HeroSection />

            {/* 2. Stats Bar — compact social proof, no fake logos */}
            <StatsBar />

            {/* 3. Solutions — data-driven, replaces duplicate WhatWeBuild */}
            <SolutionsSection services={services} />

            {/* 4. Industries — who we serve */}
            <IndustriesSection />

            {/* 5. Process — HOW we work (before engagement models) */}
            <ProcessSection />

            {/* 6. Engagement Models — WHICH model fits (after process) */}
            <EngagementModelsSection />

            {/* 7. Case Studies — proof of delivery */}
            {caseStudies.length > 0 && <CaseStudiesSection caseStudies={caseStudies} />}

            {/* 8. Tech Stack */}
            <TechStackSection />

            {/* 9. Testimonials */}
            {testimonials.length > 0 && <TestimonialsSection testimonials={testimonials} />}

            {/* 10. FAQ */}
            {faqs.length > 0 && <FAQSection faqs={faqs} />}

            {/* 11. Final CTA */}
            <FinalCTASection />
        </>
    );
}

// ── Inline Sections ──────────────────────────────────────────

function StatsBar() {
    const stats = [
        { value: '10+', label: 'Happy Clients' },
        { value: '15+', label: 'Projects Shipped' },
        { value: '1.5+', label: 'Years Experience' },
        { value: '5★', label: 'Client Rating' },
    ];

    return (
        <section className="bg-white border-y border-slate-100" aria-label="Company statistics">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-slate-100">
                    {stats.map((stat) => (
                        <div key={stat.label} className="text-center px-4">
                            <div
                                className="text-3xl sm:text-4xl font-bold text-[#0B1F4A]"
                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.03em' }}
                            >
                                {stat.value}
                            </div>
                            <div className="text-sm text-slate-500 mt-1 font-medium">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

