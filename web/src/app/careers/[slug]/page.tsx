import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { api } from '@/lib/api';
import { ArrowRight, CheckCircle2, MapPin, Clock } from 'lucide-react';

interface Props {
    params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    try {
        const job = await api.careers.get(params.slug);
        return {
            title: `${job.title} — Careers | Trifusion Technology`,
            description: job.description || `${job.title} position at Trifusion Technology.`,
        };
    } catch {
        return { title: 'Career Opportunity — Trifusion Technology' };
    }
}

export default async function JobDetailPage({ params }: Props) {
    let job;
    try {
        job = await api.careers.get(params.slug);
    } catch {
        notFound();
    }

    const responsibilities = job.responsibilities ? JSON.parse(job.responsibilities) as string[] : [];
    const requirements = job.requirements ? JSON.parse(job.requirements) as string[] : [];
    const benefits = job.benefits ? JSON.parse(job.benefits) as string[] : [];

    return (
        <>
            <section className="pt-10 pb-16 bg-gradient-to-b from-[#F8FAFF] to-white border-b border-slate-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link href="/careers" className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-[#0066FF] mb-6">
                        ← Back to Open Roles
                    </Link>
                    <div className="flex items-center gap-3 text-xs text-[#0066FF] font-semibold uppercase tracking-wider mb-3">
                        <span>{job.department || 'Engineering'}</span>
                        <span>•</span>
                        <span>{job.experience || 'Full-time'}</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold text-[#0B1F4A]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {job.title}
                    </h1>
                    <div className="mt-4 flex flex-wrap gap-6 text-sm text-slate-500">
                        {job.location && (
                            <span className="flex items-center gap-1.5">
                                <MapPin className="w-4 h-4 text-blue-500" /> {job.location}
                            </span>
                        )}
                        {job.employmentType && (
                            <span className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4 text-blue-500" /> {job.employmentType.replace('_', ' ')}
                            </span>
                        )}
                    </div>
                </div>
            </section>

            <section className="section bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                    {/* Role Overview */}
                    {job.description && (
                        <div>
                            <h2 className="text-2xl font-bold text-[#0B1F4A] mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                Role Overview
                            </h2>
                            <p className="text-slate-600 text-base leading-relaxed">{job.description}</p>
                        </div>
                    )}

                    {/* Responsibilities */}
                    {responsibilities.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-bold text-[#0B1F4A] mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                Key Responsibilities
                            </h2>
                            <ul className="space-y-3">
                                {responsibilities.map((r, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-700 text-sm">
                                        <div className="w-2 h-2 rounded-full bg-[#0066FF] mt-2 flex-shrink-0" />
                                        {r}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Requirements */}
                    {requirements.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-bold text-[#0B1F4A] mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                Requirements & Skills
                            </h2>
                            <ul className="space-y-3">
                                {requirements.map((req, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-700 text-sm">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                        {req}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Benefits */}
                    {benefits.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-bold text-[#0B1F4A] mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                What We Offer
                            </h2>
                            <ul className="space-y-3">
                                {benefits.map((b, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-700 text-sm">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                                        {b}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </section>

            {/* Application Section */}
            <section className="section bg-[#F9FAFB] border-t border-slate-100 text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-[#0B1F4A] mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Apply for {job.title}
                    </h2>
                    <p className="text-slate-500 mb-8">
                        Send your resume, GitHub/portfolio link, and a short message to our talent team.
                    </p>
                    <Link href="/contact" className="btn-primary">
                        Apply Now <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>
        </>
    );
}
