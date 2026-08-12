'use client';

import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
    LayoutDashboard, 
    Users, 
    Briefcase, 
    FileText, 
    MessageSquare, 
    HelpCircle,
    Settings,
    LogOut,
    Menu,
    X,
    FolderGit2
} from 'lucide-react';
import { clsx } from 'clsx';

const adminLinks = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Leads', href: '/admin/leads', icon: Users },
    { name: 'Services', href: '/admin/services', icon: Briefcase },
    { name: 'Case Studies', href: '/admin/case-studies', icon: FolderGit2 },
    { name: 'Insights', href: '/admin/insights', icon: FileText },
    { name: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
    { name: 'FAQs', href: '/admin/faqs', icon: HelpCircle },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    // Simple auth check - if we're on the login page, don't show the dashboard shell
    const isLoginPage = pathname === '/admin/login';

    // Redirect to login if no token
    useEffect(() => {
        if (!isLoginPage) {
            const token = localStorage.getItem('admin_token');
            if (!token) {
                router.push('/admin/login');
            }
        }
    }, [isLoginPage, router]);

    if (isLoginPage) {
        return <>{children}</>;
    }

    const handleLogout = () => {
        // Clear token logic here
        localStorage.removeItem('admin_token');
        router.push('/admin/login');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className={clsx(
                "fixed inset-y-0 left-0 z-50 w-64 bg-[#0B1F4A] text-white transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:flex-shrink-0 flex flex-col",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="h-16 flex items-center justify-between px-6 border-b border-white/10 flex-shrink-0">
                    <Link href="/admin" className="flex items-center bg-white p-2 rounded-lg border border-white/20">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/logo-header.png" alt="Trifusion Admin" className="h-7 w-auto object-contain" />
                    </Link>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-300 hover:text-white">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
                    {adminLinks.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin');
                        
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={clsx(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium",
                                    isActive 
                                        ? "bg-[#0066FF] text-white" 
                                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                                )}
                            >
                                <Icon className="w-4 h-4" />
                                {item.name}
                            </Link>
                        );
                    })}
                </div>

                <div className="p-4 border-t border-white/10">
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-slate-300 hover:bg-white/10 hover:text-white transition-colors text-sm font-medium"
                    >
                        <LogOut className="w-4 h-4" />
                        Log Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="h-16 bg-white border-b border-slate-200 flex items-center px-4 sm:px-6 lg:px-8 flex-shrink-0">
                    <button 
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden p-2 -ml-2 text-slate-500 hover:text-slate-900 focus:outline-none"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <div className="ml-auto flex items-center gap-4">
                        <span className="text-sm font-medium text-slate-600">Admin User</span>
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
                            A
                        </div>
                    </div>
                </header>
                
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50">
                    {children}
                </main>
            </div>
            
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
}
