'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { StaggerContainer, StaggerItem } from '@/components/ui/AnimateIn';
import { DynamicCanvasBackground } from '@/components/ui/DynamicCanvasBackground';

const PHRASES = [
    "Scale With You",
    "Automate Operations",
    "Simplify GST",
    "Ensure Compliance",
    "Drive Growth"
];

export function HeroSection() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % PHRASES.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#F0F4FF] via-[#F8FAFF] to-white">
            {/* 60fps Dynamic Particle & Web Canvas */}
            <DynamicCanvasBackground />

            {/* Glowing background gradient spheres */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div
                    className="absolute -top-40 left-1/2 -translate-x-1/2 w-[850px] h-[850px] rounded-full opacity-40 blur-3xl"
                    style={{ background: 'radial-gradient(circle, rgba(0,102,255,0.25) 0%, rgba(59,130,246,0.08) 50%, transparent 70%)' }}
                />
                <div
                    className="absolute top-1/2 -right-40 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
                    style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.2) 0%, transparent 70%)' }}
                />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-16 sm:pb-24 text-center">
                <StaggerContainer staggerChildren={0.15}>
                    {/* Eyebrow badge */}
                    <StaggerItem>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/80 border border-blue-200/80 backdrop-blur-md mb-8 shadow-sm">
                            <Sparkles className="w-4 h-4 text-[#0066FF]" />
                            <span className="text-xs sm:text-sm tracking-[0.15em] font-bold text-[#0066FF] uppercase">
                                Custom Software & Smart GST Solutions
                            </span>
                        </div>
                    </StaggerItem>

                    {/* Headline */}
                    <StaggerItem>
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-[80px] font-bold text-[#0B1F4A] leading-[1.1] sm:leading-[1.08] mb-6 sm:mb-8"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.03em' }}>
                            We Build Digital Systems<br />
                            That <span className="inline-flex min-w-[300px] sm:min-w-[450px] justify-center sm:justify-start">
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={index}
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -20, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#00C8FF]"
                                    >
                                        {PHRASES[index]}
                                    </motion.span>
                                </AnimatePresence>
                            </span>
                        </h1>
                    </StaggerItem>

                    {/* Subheadline */}
                    <StaggerItem>
                        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed font-normal">
                            From bespoke software applications to audit-ready GST automation — we engineer technology that gives you operational control and seamless compliance.
                        </p>
                    </StaggerItem>

                    {/* CTAs */}
                    <StaggerItem>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                            <Link
                                href="/contact"
                                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0066FF] text-white font-bold rounded-xl hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-500/25 hover:shadow-2xl text-lg min-w-[210px] w-full sm:w-auto active:scale-95"
                            >
                                <span>Start a Project</span>
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <Link
                                href="/case-studies"
                                className="inline-flex items-center justify-center px-8 py-4 bg-white border border-slate-200 text-slate-900 font-bold rounded-xl hover:bg-slate-50 transition-all text-lg min-w-[210px] w-full sm:w-auto shadow-sm hover:shadow-md"
                            >
                                View Case Studies
                            </Link>
                        </div>
                    </StaggerItem>

                    {/* Social proof pill — clean, single verifiable claim */}
                    <StaggerItem>
                        <div className="flex items-center justify-center gap-3 text-sm text-slate-500 font-medium">
                            <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
                                Pune-based. India-focused.
                            </span>
                            <span className="text-slate-300" aria-hidden="true">•</span>
                            <span>Reply within 24 hours</span>
                        </div>
                    </StaggerItem>
                </StaggerContainer>
            </div>
        </section>
    );
}

