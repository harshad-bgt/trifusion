import type { Metadata } from 'next';
import Link from 'next/link';
import { api } from '@/lib/api';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Insights & Engineering Blog — Trifusion Technology',
    description: 'Articles, architecture guides, and technical perspectives from the engineering team at Trifusion Technology LLP.',
};

async function getBlogPosts() {
    try {
        const res = await api.blog.list({ limit: 20 });
        return res.items;
    } catch {
        return [];
    }
}

export default async function InsightsPage() {
    const posts = await getBlogPosts();

    return (
        <>
            <section className="pt-10 pb-16 bg-gradient-to-b from-[#F8FAFF] to-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <span className="label-tag">Engineering Insights</span>
                        <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-[#0B1F4A]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            Perspectives on Software Architecture & Product Engineering
                        </h1>
                        <p className="mt-4 text-lg text-slate-500 max-w-2xl leading-relaxed">
                            Practical guides, lessons learned from production systems, and architectural patterns for building scalable software.
                        </p>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {posts.length === 0 ? (
                        <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-100">
                            <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-[#0B1F4A] mb-2">New Articles Coming Soon</h2>
                            <p className="text-slate-500 max-w-md mx-auto mb-6">
                                Our technical writing team is publishing new architecture breakdowns. Subscribe or check back soon.
                            </p>
                            <Link href="/contact" className="btn-primary">
                                Discuss Engineering Strategy <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {posts.map(post => (
                                <Link key={post.id} href={`/insights/${post.slug}`} className="card p-8 group flex flex-col justify-between hover:border-blue-200 hover:shadow-lg transition-all">
                                    <div>
                                        <div className="flex items-center gap-3 text-xs text-slate-400 mb-4">
                                            {post.category && (
                                                <span className="px-2.5 py-1 rounded-full bg-blue-50 text-[#0066FF] font-semibold">
                                                    {post.category.name}
                                                </span>
                                            )}
                                            {post.readingTime && (
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-3.5 h-3.5" /> {post.readingTime} min read
                                                </span>
                                            )}
                                        </div>

                                        <h2 className="text-[#0B1F4A] font-bold text-2xl mb-3 group-hover:text-[#0066FF] transition-colors" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                            {post.title}
                                        </h2>
                                        <p className="text-slate-500 text-sm leading-relaxed mb-6">{post.excerpt}</p>
                                    </div>

                                    <div className="flex items-center gap-1.5 text-sm font-semibold text-[#0066FF] group-hover:gap-2.5 transition-all pt-4 border-t border-slate-100">
                                        Read Article <ArrowRight className="w-4 h-4" />
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
