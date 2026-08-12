import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { api } from '@/lib/api';
import { ArrowRight, ExternalLink } from 'lucide-react';

interface Props {
    params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    try {
        const prod = await api.products.get(params.slug);
        return {
            title: `${prod.name} — Trifusion Technology Products`,
            description: prod.tagline || prod.description,
        };
    } catch {
        return { title: 'Product Details — Trifusion Technology' };
    }
}

export default async function ProductDetailPage({ params }: Props) {
    let prod;
    try {
        prod = await api.products.get(params.slug);
    } catch {
        notFound();
    }

    return (
        <>
            <section className="pt-10 pb-16 bg-gradient-to-b from-[#F8FAFF] to-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <Link href="/products" className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-[#0066FF] mb-4">
                            ← Back to Products
                        </Link>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 rounded-full bg-blue-50 text-[#0066FF] text-xs font-semibold uppercase tracking-wider">
                                {prod.category || 'Product'}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium">
                                {prod.status}
                            </span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold text-[#0B1F4A]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            {prod.name}
                        </h1>
                        {prod.tagline && (
                            <p className="mt-2 text-xl font-medium text-[#0066FF]">{prod.tagline}</p>
                        )}
                        <p className="mt-4 text-lg text-slate-500 max-w-2xl leading-relaxed">
                            {prod.description}
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link href="/contact" className="btn-primary">
                                Request Demo <ArrowRight className="w-4 h-4" />
                            </Link>
                            {prod.externalUrl && (
                                <a href={prod.externalUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex items-center gap-2">
                                    Visit Product Website <ExternalLink className="w-4 h-4" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            {prod.features && prod.features.length > 0 && (
                <section className="section bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-[#0B1F4A] mb-10" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            Key Platform Features
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {prod.features.map((f, i) => (
                                <div key={i} className="card p-6">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center font-bold text-lg mb-4">
                                        ✓
                                    </div>
                                    <h3 className="font-bold text-[#0B1F4A] text-lg mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                        {f.title}
                                    </h3>
                                    {f.desc && <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="section bg-[#F9FAFB] border-t border-slate-100 text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-[#0B1F4A] mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Interested in {prod.name}?
                    </h2>
                    <p className="text-slate-500 mb-8">
                        Speak with our product team to learn about custom deployments, integrations, or enterprise licensing.
                    </p>
                    <Link href="/contact" className="btn-primary">
                        Contact Product Team <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>
        </>
    );
}
