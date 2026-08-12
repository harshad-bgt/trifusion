'use client';

import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, MoreVertical } from 'lucide-react';

export default function AdminServices() {
    const [services] = useState([
        { id: '1', title: 'Digital Platforms', status: 'Published', lastUpdated: 'Oct 24, 2023' },
        { id: '2', title: 'Smart GST & Accounting', status: 'Published', lastUpdated: 'Oct 21, 2023' },
        { id: '3', title: 'Mobile Applications', status: 'Draft', lastUpdated: 'Oct 15, 2023' },
        { id: '4', title: 'AI-Powered Systems', status: 'Published', lastUpdated: 'Oct 12, 2023' },
        { id: '5', title: 'Workflow Automation', status: 'Published', lastUpdated: 'Oct 10, 2023' },
        { id: '6', title: 'Data & Analytics', status: 'Published', lastUpdated: 'Oct 05, 2023' },
    ]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Services
                    </h1>
                    <p className="text-slate-500 mt-1">Manage the solutions you offer to clients.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-[#0066FF] text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                    <Plus className="w-4 h-4" />
                    New Service
                </button>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="relative max-w-md w-full">
                    <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                        type="text" 
                        placeholder="Search services..." 
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                    />
                </div>
                <div className="flex gap-2">
                    <select className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer">
                        <option>All Status</option>
                        <option>Published</option>
                        <option>Draft</option>
                    </select>
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Service Name</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold">Last Updated</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {services.map((service) => (
                                <tr key={service.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-6 py-4 font-medium text-slate-900">{service.title}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                                            service.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'
                                        }`}>
                                            {service.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500 text-xs">{service.lastUpdated}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-1.5 text-slate-400 hover:text-blue-600 rounded-md hover:bg-blue-50 transition-colors" title="Edit">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors" title="Delete">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                            <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100 transition-colors">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination (Mock) */}
                <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-sm text-slate-500">Showing 1 to 6 of 6 entries</span>
                    <div className="flex gap-1">
                        <button className="px-3 py-1 rounded border border-slate-200 text-slate-400 cursor-not-allowed text-sm">Prev</button>
                        <button className="px-3 py-1 rounded bg-blue-50 text-blue-600 font-medium text-sm border border-blue-100">1</button>
                        <button className="px-3 py-1 rounded border border-slate-200 text-slate-400 cursor-not-allowed text-sm">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
