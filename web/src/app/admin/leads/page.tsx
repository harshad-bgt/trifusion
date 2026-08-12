'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, Eye, RefreshCw } from 'lucide-react';
import { api, Lead, ApiError } from '@/lib/api';

export default function AdminLeads() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

    const [error, setError] = useState<string | null>(null);

    const fetchLeads = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('admin_token') || '';
            const res = await api.admin.leads(token, { search });
            setLeads(res.items || []);
        } catch (err: unknown) {
            console.error('Failed to fetch leads:', err);
            if (err instanceof ApiError && (err.status === 401 || err.code === 'INVALID_TOKEN' || err.code === 'NO_TOKEN')) {
                localStorage.removeItem('admin_token');
                window.location.href = '/admin/login';
                return;
            }
            setError(err instanceof Error ? err.message : String(err));
            setLeads([]);
        } finally {
            setLoading(false);
        }
    }, [search]);

    useEffect(() => {
        fetchLeads();
    }, [fetchLeads]);

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        try {
            const token = localStorage.getItem('admin_token') || '';
            await api.admin.updateLeadStatus(token, id, newStatus);
            setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
            if (selectedLead?.id === id) {
                setSelectedLead(prev => prev ? { ...prev, status: newStatus } : null);
            }
        } catch (e) {
            console.error('Failed to update lead status:', e);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Inquiries & Leads
                    </h1>
                    <p className="text-slate-500 mt-1">Manage project inquiries, visitor contacts, and lead statuses.</p>
                </div>
                <button
                    onClick={fetchLeads}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
                >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                </button>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="relative max-w-md w-full">
                    <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                        type="text" 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name, email, or company..." 
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                    />
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center text-slate-400 text-sm">Loading leads...</div>
                ) : error ? (
                    <div className="p-12 text-center text-red-500">
                        <div className="text-3xl mb-2">❌</div>
                        <h3 className="text-lg font-bold mb-1">Failed to Load</h3>
                        <p className="text-sm">{error}</p>
                    </div>
                ) : leads.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="text-3xl mb-2">📥</div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">No Leads Received Yet</h3>
                        <p className="text-slate-500 text-sm max-w-md mx-auto">
                            Inquiries submitted via the /contact page will appear here with lead tracking numbers.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Ref</th>
                                    <th className="px-6 py-4 font-semibold">Contact</th>
                                    <th className="px-6 py-4 font-semibold">Company</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                    <th className="px-6 py-4 font-semibold">Received</th>
                                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {leads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-slate-50 transition-colors group">
                                        <td className="px-6 py-4 font-mono text-xs font-semibold text-[#0066FF]">{lead.leadRef}</td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-slate-900">{lead.name}</div>
                                            <div className="text-slate-500 text-xs mt-0.5">{lead.email}</div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-700">{lead.company || '—'}</td>
                                        <td className="px-6 py-4">
                                            <select
                                                value={lead.status}
                                                onChange={(e) => handleStatusUpdate(lead.id, e.target.value)}
                                                className={`px-2.5 py-1 rounded-full text-xs font-semibold border-0 focus:ring-2 focus:ring-blue-500 ${
                                                    lead.status === 'NEW' ? 'bg-blue-100 text-blue-800' :
                                                    lead.status === 'CONTACTED' ? 'bg-yellow-100 text-yellow-800' :
                                                    lead.status === 'QUALIFIED' ? 'bg-purple-100 text-purple-800' :
                                                    lead.status === 'WON' ? 'bg-emerald-100 text-emerald-800' :
                                                    'bg-slate-100 text-slate-700'
                                                }`}
                                            >
                                                <option value="NEW">NEW</option>
                                                <option value="CONTACTED">CONTACTED</option>
                                                <option value="QUALIFIED">QUALIFIED</option>
                                                <option value="PROPOSAL">PROPOSAL</option>
                                                <option value="WON">WON</option>
                                                <option value="LOST">LOST</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 text-xs">
                                            {new Date(lead.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => setSelectedLead(lead)}
                                                className="p-1.5 text-slate-400 hover:text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                                                title="View Message"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Lead Modal */}
            {selectedLead && (
                <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <span className="font-mono text-xs font-semibold text-[#0066FF]">{selectedLead.leadRef}</span>
                                <h3 className="text-xl font-bold text-slate-900">{selectedLead.name}</h3>
                                <p className="text-xs text-slate-500">{selectedLead.email} • {selectedLead.company || 'No company'}</p>
                            </div>
                            <button onClick={() => setSelectedLead(null)} className="text-slate-400 hover:text-slate-600">✕</button>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-4 text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                            {selectedLead.message}
                        </div>
                        <div className="flex justify-end">
                            <button onClick={() => setSelectedLead(null)} className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-semibold rounded-lg">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
