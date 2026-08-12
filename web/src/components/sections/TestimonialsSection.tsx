import { Star } from 'lucide-react';
import type { Testimonial } from '@/lib/api';

interface Props {
    testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: Props) {
    if (testimonials.length === 0) return null;

    return (
        <section className="section bg-[#F8FAFF]">
            <div className="container-tf">
                <div className="text-center mb-12">
                    <span className="label-tag">Testimonials</span>
                    <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-[#0B1F4A]">
                        What clients say
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map(t => (
                        <div key={t.id} className="card p-6 flex flex-col">
                            {/* Stars */}
                            {t.rating && (
                                <div className="flex items-center gap-1 mb-4">
                                    {Array.from({ length: t.rating }).map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                                    ))}
                                </div>
                            )}

                            {/* Quote */}
                            <blockquote className="text-slate-600 text-sm leading-relaxed flex-1 mb-5">
                                &ldquo;{t.quote}&rdquo;
                            </blockquote>

                            {/* Author */}
                            <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0B1F4A] to-[#0066FF] flex items-center justify-center flex-shrink-0">
                                    <span className="text-white font-bold text-sm">{t.name[0]}</span>
                                </div>
                                <div>
                                    <div className="font-semibold text-[#0B1F4A] text-sm">{t.name}</div>
                                    {(t.title || t.company) && (
                                        <div className="text-slate-500 text-xs">{[t.title, t.company].filter(Boolean).join(', ')}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
