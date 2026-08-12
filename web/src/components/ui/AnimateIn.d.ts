import { ReactNode } from 'react';
interface AnimateInProps {
    children: ReactNode;
    delay?: number;
    className?: string;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    duration?: number;
}
export declare function AnimateIn({ children, delay, className, direction, duration }: AnimateInProps): import("react").JSX.Element;
export declare function StaggerContainer({ children, className, delayChildren, staggerChildren }: {
    children: ReactNode;
    className?: string;
    delayChildren?: number;
    staggerChildren?: number;
}): import("react").JSX.Element;
export declare function StaggerItem({ children, className }: {
    children: ReactNode;
    className?: string;
}): import("react").JSX.Element;
export {};
//# sourceMappingURL=AnimateIn.d.ts.map