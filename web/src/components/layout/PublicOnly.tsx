'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export function PublicOnly({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    
    // Hide these elements on all admin routes
    if (pathname?.startsWith('/admin')) {
        return null;
    }
    
    return <>{children}</>;
}

export function MainWrapper({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith('/admin');
    
    return (
        <main className={`flex-1 ${isAdmin ? '' : 'pt-16'}`}>
            {children}
        </main>
    );
}
