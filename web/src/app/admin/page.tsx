'use client';

import { useState, useEffect } from 'react';
import { Users, Briefcase, FileText, FolderGit2, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { api, AdminStats, ApiError } from '@/lib/api';

export default function AdminDashboard() {
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchStats = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('admin_token') || '';
            const data = await api.admin.stats(token);
            setStats(data);
        } catch (err: unknown) {
            console.error('Failed to fetch stats:', err);
            if (err instanceof ApiError && (err.status === 401 || err.code === 'INVALID_TOKEN' || err.code === 'NO_TOKEN')) {
                localStorage.removeItem('admin_token');
                window.location.href = '/admin/login';
                return;
            }
            setStats(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const cards = [
        { name: 'Total Leads', value: stats?.leads?.total ?? 0, label: `${stats?.leads?.new ?? 0} new`, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
        { name: 'Published Services', value: stats?.services?.published ?? 0, label: `Out of ${stats?.services?.total ?? 0}`, icon: Briefcase, color: 'text-indigo-600', bg: 'bg-indigo-100' },
        { name: 'Published Case Studies', value: stats?.caseStudies?.published ?? 0, label: 'Featured projects', icon: FolderGit2, color: 'text-emerald-600', bg: 'bg-emerald-100' },
        { name: 'Published Blog Posts', value: stats?.blog?.published ?? 0, label: `Out of ${stats?.blog?.total ?? 0}`, icon: FileText, color: 'text-purple-600', bg: 'bg-purple-100' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Dashboard Overview
                    </h1>
                    <p className="text-slate-500 mt-1">Live metrics from your backend database.</p>
                </div>
                <button
                    onClick={fetchStats}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
                >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    Refresh Stats
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((stat) => (
                    <div key={stat.name} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 rounded-lg ${stat.bg} flex items-center justify-center`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <span className="text-xs font-medium text-slate-500">{stat.label}</span>
                        </div>
                        <h3 className="text-slate-500 text-sm font-medium">{stat.name}</h3>
                        <p className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Quick Management Links
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Link href="/admin/leads" className="p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-all">
                        <div className="font-bold text-slate-900 text-sm mb-1">Manage Leads</div>
                        <div className="text-xs text-slate-500">View incoming project inquiries</div>
                    </Link>
                    <Link href="/admin/services" className="p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-all">
                        <div className="font-bold text-slate-900 text-sm mb-1">Manage Services</div>
                        <div className="text-xs text-slate-500">Update solutions and features</div>
                    </Link>
                    <Link href="/contact" target="_blank" className="p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-all">
                        <div className="font-bold text-slate-900 text-sm mb-1">Public Site Live View</div>
                        <div className="text-xs text-slate-500">Open main website in new tab</div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
