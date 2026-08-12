import type { Metadata } from 'next';
import Link from 'next/link';
import { api } from '@/lib/api';
import { ArrowRight, ExternalLink, Package } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Products — Enterprise Platforms & SaaS Solutions | Trifusion Technology',
    description: 'Explore Trifusion Technology software products, SaaS platforms, and enterprise digital solutions.',
};

async function getProducts() {
    try {
        const res = await api.products.list();
        return res.items;
    } catch {
        return [];
    }
}

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <>
            <section className="pt-10 pb-16 bg-gradient-to-b from-[#F8FAFF] to-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <span className="label-tag">Products</span>
                        <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-[#0B1F4A]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            Our Enterprise Software Portfolio
                        </h1>
                        <p className="mt-4 text-lg text-slate-500 max-w-2xl leading-relaxed">
                            Alongside custom engineering engagements, we build and maintain specialized SaaS products and workflow platforms built for performance and scale.
                        </p>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {products.length === 0 ? (
                        <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-100">
                            <Package className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-[#0B1F4A] mb-2">Product Portfolio Loading</h2>
                            <p className="text-slate-500 max-w-md mx-auto mb-6">
                                We are updating our product catalog. Check back shortly or discuss a custom SaaS build with our engineering team.
                            </p>
                            <Link href="/contact" className="btn-primary">
                                Discuss Custom SaaS Build <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {products.map(p => (
                                <Link key={p.id} href={`/products/${p.slug}`} className="card p-8 group flex flex-col justify-between hover:border-blue-200 hover:shadow-xl transition-all">
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="px-3 py-1 rounded-full bg-blue-50 text-[#0066FF] text-xs font-semibold uppercase tracking-wider">
                                                {p.category || 'Smart GST & Accounting'}
                                            </span>
                                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium">
                                                {p.status}
                                            </span>
                                        </div>

                                        <h2 className="text-[#0B1F4A] font-bold text-2xl mb-2 group-hover:text-[#0066FF] transition-colors" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                            {p.name}
                                        </h2>
                                        {p.tagline && (
                                            <p className="text-[#0066FF] font-medium text-sm mb-4">{p.tagline}</p>
                                        )}
                                        <p className="text-slate-500 text-sm leading-relaxed mb-6">{p.description}</p>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#0066FF] group-hover:gap-2 transition-all">
                                            Product Details <ArrowRight className="w-4 h-4" />
                                        </span>
                                        {p.externalUrl && (
                                            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#0066FF]" />
                                        )}
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
