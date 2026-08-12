'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import { api } from '@/lib/api';

export default function AdminLogin() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            const res = await api.admin.login(email as string, password as string);
            localStorage.setItem('admin_token', res.token);
            router.push('/admin');
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Invalid email or password');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="p-8 text-center bg-[#0B1F4A]">
                    <div className="inline-block bg-white px-4 py-2 rounded-xl mb-4 shadow-sm border border-white/20">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/logo-header.png" alt="Trifusion Technology LLP" className="h-9 w-auto object-contain mx-auto" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Admin Portal
                    </h1>
                    <p className="text-blue-200 text-sm">Sign in to manage Trifusion content</p>
                </div>
                
                <div className="p-8">
                    {error && (
                        <div className="mb-6 p-3 rounded-lg bg-red-50 text-red-600 text-sm font-medium border border-red-100">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                            <div className="relative">
                                <Mail className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input 
                                    type="email" 
                                    name="email"
                                    required
                                    defaultValue="admin@trifusion.com"
                                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#0066FF] focus:border-[#0066FF] outline-none transition-all"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                            <div className="relative">
                                <Lock className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input 
                                    type="password" 
                                    name="password"
                                    required
                                    defaultValue="admin123"
                                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#0066FF] focus:border-[#0066FF] outline-none transition-all"
                                    placeholder="Enter your password"
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2 py-3 bg-[#0066FF] text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70"
                        >
                            {isLoading ? 'Signing in...' : 'Sign In'}
                            {!isLoading && <ArrowRight className="w-4 h-4" />}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
