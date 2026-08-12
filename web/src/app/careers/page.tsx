import type { Metadata } from 'next';
import Link from 'next/link';
import { api } from '@/lib/api';
import { ArrowRight, Briefcase, MapPin, Clock } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Careers — Join Trifusion Technology',
    description: 'Explore career opportunities at Trifusion Technology. Build high-impact digital platforms with a culture of engineering excellence.',
};

async function getJobs() {
    try {
        const res = await api.careers.list();
        return res.items;
    } catch {
        return [];
    }
}

export default async function CareersPage() {
    const jobs = await getJobs();

    return (
        <>
            <section className="pt-10 pb-16 bg-gradient-to-b from-[#F8FAFF] to-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <span className="label-tag">Careers</span>
                        <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-[#0B1F4A]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            Build Complex Software With Great Engineers
                        </h1>
                        <p className="mt-4 text-lg text-slate-500 max-w-2xl leading-relaxed">
                            We are a remote-first engineering firm. We value technical craft, ownership, low bureaucracy, and solving real client problems.
                        </p>
                    </div>
                </div>
            </section>

            <section className="section bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-[#0B1F4A] mb-8" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Open Engineering & Design Positions
                    </h2>

                    {jobs.length === 0 ? (
                        <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-100">
                            <Briefcase className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-[#0B1F4A] mb-2">No Active Openings Right Now</h3>
                            <p className="text-slate-500 max-w-md mx-auto mb-6">
                                We are always interested in exceptional engineers and product designers. Send us your resume for future opportunities.
                            </p>
                            <Link href="/contact" className="btn-primary">
                                Send Speculative Application <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {jobs.map(job => (
                                <Link key={job.id} href={`/careers/${job.slug}`} className="card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-blue-200 hover:shadow-md transition-all">
                                    <div>
                                        <div className="flex items-center gap-3 text-xs text-[#0066FF] font-semibold uppercase tracking-wider mb-2">
                                            <span>{job.department || 'Engineering'}</span>
                                            <span>•</span>
                                            <span>{job.experience || 'Full-time'}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-[#0B1F4A] mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                            {job.title}
                                        </h3>
                                        <div className="flex items-center gap-4 text-slate-500 text-sm">
                                            {job.location && (
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.location}
                                                </span>
                                            )}
                                            {job.employmentType && (
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-3.5 h-3.5 text-slate-400" /> {job.employmentType.replace('_', ' ')}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm font-semibold text-[#0066FF]">
                                        View Role Details <ArrowRight className="w-4 h-4" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
