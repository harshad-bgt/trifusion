import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service — Trifusion Technology LLP',
    description: 'Terms of Service for using Trifusion Technology LLP website and digital services.',
};

export default function TermsOfServicePage() {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-[#0B1F4A] mb-8" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Terms of Service
                </h1>
                <div className="prose prose-slate max-w-none text-slate-600 space-y-6 text-sm leading-relaxed">
                    <p>Last updated: August 2026</p>

                    <h2 className="text-xl font-bold text-[#0B1F4A]">1. Acceptance of Terms</h2>
                    <p>
                        By accessing or using the website and digital services provided by Trifusion Technology LLP (&quot;Trifusion&quot;, &quot;we&quot;, &quot;us&quot;), you agree to be bound by these Terms of Service.
                    </p>

                    <h2 className="text-xl font-bold text-[#0B1F4A]">2. Intellectual Property</h2>
                    <p>
                        All original content, designs, software branding, graphics, and custom source code published on this site remain the exclusive property of Trifusion Technology LLP. Customer project deliverables are governed by separate master services agreements (MSAs).
                    </p>

                    <h2 className="text-xl font-bold text-[#0B1F4A]">3. Project Engagement & Services</h2>
                    <p>
                        Information submitted through inquiry forms does not constitute a binding contract until formal statements of work (SOW) or master service agreements are signed by both parties.
                    </p>

                    <h2 className="text-xl font-bold text-[#0B1F4A]">4. Contact Information</h2>
                    <p>
                        For inquiries regarding these Terms, contact us at hello@trifusiontechnology.in.
                    </p>
                </div>
            </div>
        </section>
    );
}
