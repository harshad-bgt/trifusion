import Link from 'next/link';
import { ArrowRight, Home } from 'lucide-react';

export default function NotFound() {
    return (
        <section className="min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-[#F8FAFF] to-white py-20 px-4">
            <div className="text-center max-w-xl">
                <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-[#0066FF] font-bold text-sm mb-6">
                    404 — Page Not Found
                </span>
                <h1 className="text-4xl sm:text-5xl font-bold text-[#0B1F4A] mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Looking for a specific route?
                </h1>
                <p className="text-slate-500 mb-8 text-base leading-relaxed">
                    The page you are looking for doesn&apos;t exist or has been moved. Return to the homepage or explore our software solutions.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/" className="btn-primary inline-flex items-center gap-2">
                        <Home className="w-4 h-4" /> Go to Homepage
                    </Link>
                    <Link href="/solutions" className="btn-secondary inline-flex items-center gap-2">
                        Explore Solutions <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
