import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { api } from '@/lib/api';
import { ArrowRight, Clock, User } from 'lucide-react';

interface Props {
    params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    try {
        const post = await api.blog.get(params.slug);
        return {
            title: `${post.title} — Trifusion Insights`,
            description: post.excerpt || post.title,
        };
    } catch {
        return { title: 'Engineering Insight — Trifusion Technology' };
    }
}

export default async function InsightDetailPage({ params }: Props) {
    let post;
    try {
        post = await api.blog.get(params.slug);
    } catch {
        notFound();
    }

    return (
        <>
            <section className="pt-10 pb-16 bg-gradient-to-b from-[#F8FAFF] to-white border-b border-slate-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link href="/insights" className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-[#0066FF] mb-6">
                        ← Back to Insights
                    </Link>
                    {post.category && (
                        <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-[#0066FF] text-xs font-semibold uppercase tracking-wider mb-4">
                            {post.category.name}
                        </span>
                    )}
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1F4A] leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {post.title}
                    </h1>
                    <div className="mt-6 flex items-center gap-6 text-sm text-slate-500">
                        {post.author && (
                            <span className="flex items-center gap-2">
                                <User className="w-4 h-4 text-blue-500" /> {post.author}
                            </span>
                        )}
                        {post.readingTime && (
                            <span className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-blue-500" /> {post.readingTime} min read
                            </span>
                        )}
                    </div>
                </div>
            </section>

            <section className="section bg-white">
                <div className="max-w-3xl mx-auto px-4 sm:px-6">
                    <div className="prose prose-slate lg:prose-lg max-w-none leading-relaxed text-slate-700">
                        {post.content.split('\n\n').map((paragraph, index) => {
                            if (paragraph.startsWith('# ')) {
                                return <h1 key={index} className="text-3xl font-bold text-[#0B1F4A] mt-8 mb-4">{paragraph.replace('# ', '')}</h1>;
                            }
                            if (paragraph.startsWith('## ')) {
                                return <h2 key={index} className="text-2xl font-bold text-[#0B1F4A] mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
                            }
                            return <p key={index} className="mb-4 text-slate-600 leading-relaxed">{paragraph}</p>;
                        })}
                    </div>
                </div>
            </section>

            <section className="section bg-[#F9FAFB] border-t border-slate-100 text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-[#0B1F4A] mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Want to discuss this topic?
                    </h2>
                    <p className="text-slate-500 mb-8">
                        Connect with our engineering leadership to talk architecture, scaling, or product design.
                    </p>
                    <Link href="/contact" className="btn-primary">
                        Get in Touch <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>
        </>
    );
}
