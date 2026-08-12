import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
    title: 'Privacy Policy | Trifusion Technology LLP',
    description: 'Privacy Policy for Trifusion Technology LLP.',
};

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-[#F8FAFF] flex flex-col pt-16">
            <Navbar />

            <main className="flex-grow py-16 lg:py-24">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-slate-100">
                        <h1 className="text-3xl sm:text-4xl font-bold text-[#0B1F4A] mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            Privacy Policy
                        </h1>
                        <p className="text-sm text-slate-500 mb-8">Last Updated: October 2023</p>

                        <div className="prose prose-slate prose-blue max-w-none">
                            <p>
                                At Trifusion Technology LLP, we are committed to protecting your privacy and ensuring the security of your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you interact with our website or engage our digital engineering services.
                            </p>

                            <h3>1. Information We Collect</h3>
                            <p>
                                We may collect personal information that you provide to us directly, such as when you fill out a contact form, request a quote, or subscribe to our insights. This may include your name, email address, phone number, company name, and project details.
                            </p>

                            <h3>2. How We Use Your Information</h3>
                            <p>
                                We use the collected information for the following purposes:
                            </p>
                            <ul>
                                <li>To provide and maintain our services</li>
                                <li>To respond to your inquiries and support requests</li>
                                <li>To send you administrative or marketing communications (you can opt out at any time)</li>
                                <li>To improve our website and services based on usage analytics</li>
                            </ul>

                            <h3>3. Data Security</h3>
                            <p>
                                We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or alteration. However, please be aware that no method of transmission over the internet or electronic storage is 100% secure.
                            </p>

                            <h3>4. Third-Party Services</h3>
                            <p>
                                We may use third-party tools and services (such as analytics providers or CRM platforms) to help us operate our business. These third parties have access to your personal information only to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose.
                            </p>

                            <h3>5. Your Rights</h3>
                            <p>
                                You have the right to request access to, correction of, or deletion of your personal data held by Trifusion Technology LLP. To exercise these rights, please contact us using the information provided below.
                            </p>

                            <h3>6. Contact Us</h3>
                            <p>
                                If you have any questions or concerns about this Privacy Policy, please contact us at:<br/>
                                <strong>Email:</strong> privacy@trifusion.com<br/>
                                <strong>Address:</strong> India
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
