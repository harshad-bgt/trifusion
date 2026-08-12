import { siteConfig } from '@/lib/config';

export function ProcessSection() {
    return (
        <section className="section" style={{ background: 'linear-gradient(180deg, #F8FAFF 0%, #fff 100%)' }}>
            <div className="container-tf">
                <div className="text-center mb-14">
                    <span className="label-tag">Our Process</span>
                    <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-[#0B1F4A]">
                        How we build
                    </h2>
                    <p className="mt-4 text-slate-500 max-w-xl mx-auto">
                        A disciplined process is what separates products that ship on time and within budget from those that don&apos;t.
                    </p>
                </div>

                {/* Desktop: horizontal timeline */}
                <div className="hidden lg:block">
                    <div className="relative">
                        {/* Connector line */}
                        <div className="absolute top-10 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0B1F4A] via-[#1246A0] to-[#0066FF] mx-16" />

                        <div className="grid grid-cols-5 gap-4">
                            {siteConfig.process.map((step, i) => (
                                <div key={step.step} className="relative flex flex-col items-center">
                                    {/* Node */}
                                    <div className="relative z-10 w-20 h-20 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
                                        style={{ background: `linear-gradient(135deg, #0B1F4A ${i * 20}%, #0066FF 100%)` }}>
                                        <span className="text-white font-bold text-lg" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                            {step.step}
                                        </span>
                                    </div>
                                    <h3 className="text-[#0B1F4A] font-bold text-base mb-2 text-center" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                        {step.title}
                                    </h3>
                                    <p className="text-slate-500 text-xs text-center leading-relaxed">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mobile: vertical list */}
                <div className="lg:hidden space-y-6">
                    {siteConfig.process.map((step, i) => (
                        <div key={step.step} className="flex gap-4">
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md"
                                    style={{ background: `linear-gradient(135deg, #0B1F4A ${i * 20}%, #0066FF 100%)` }}>
                                    <span className="text-white font-bold text-sm">{step.step}</span>
                                </div>
                                {i < siteConfig.process.length - 1 && <div className="w-0.5 flex-1 bg-slate-200 mt-2 min-h-[2rem]" />}
                            </div>
                            <div className="pb-6">
                                <h3 className="text-[#0B1F4A] font-bold text-base mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                    {step.title}
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
