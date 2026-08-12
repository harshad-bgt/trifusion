'use client';

import { useState } from 'react';
import { siteConfig } from '@/lib/config';
import { clsx } from 'clsx';

export function TechStackSection() {
    const categories = Object.keys(siteConfig.techStack);
    const [active, setActive] = useState(categories[0] || 'Frontend');
    const techs = siteConfig.techStack[active as keyof typeof siteConfig.techStack] || [];

    return (
        <section className="section bg-[#0B1F4A] text-white">
            <div className="container-tf">
                <div className="text-center mb-12">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-blue-300 text-xs font-semibold uppercase tracking-wider">
                        Technology
                    </span>
                    <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Built with the right tools
                    </h2>
                    <p className="mt-4 text-blue-300 max-w-xl mx-auto">
                        We choose the best technology for each context. No dogma — just what actually works in production.
                    </p>
                </div>

                {/* Category tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActive(cat)}
                            className={clsx(
                                'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                                active === cat
                                    ? 'bg-[#0066FF] text-white shadow-lg'
                                    : 'bg-white/10 text-blue-300 hover:bg-white/20 hover:text-white'
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Tech grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-w-4xl mx-auto">
                    {techs.map(tech => (
                        <div
                            key={tech}
                            className="flex items-center justify-center px-4 py-3 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 hover:border-white/20 transition-all duration-200 cursor-default"
                        >
                            <span className="text-sm font-medium text-white text-center">{tech}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
