'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { clsx } from 'clsx';

interface AnimateInProps {
    children: ReactNode;
    delay?: number;
    className?: string;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    duration?: number;
}

export function AnimateIn({ children, delay = 0, className, direction = 'up', duration = 0.5 }: AnimateInProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-50px 0px' });

    const getDirectionOffset = () => {
        switch (direction) {
            case 'up': return { y: 40 };
            case 'down': return { y: -40 };
            case 'left': return { x: 40 };
            case 'right': return { x: -40 };
            case 'none': return { y: 0, x: 0 };
        }
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, ...getDirectionOffset() }}
            animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, ...getDirectionOffset() }}
            transition={{
                duration: duration,
                delay: delay,
                ease: 'easeOut',
            }}
            className={clsx(className)}
        >
            {children}
        </motion.div>
    );
}

// For staggered children lists
export function StaggerContainer({ children, className, delayChildren = 0.1, staggerChildren = 0.1 }: { children: ReactNode, className?: string, delayChildren?: number, staggerChildren?: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-50px 0px' });

    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren,
                delayChildren
            }
        }
    };

    return (
        <motion.div
            ref={ref}
            variants={container}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className={clsx(className)}
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({ children, className }: { children: ReactNode, className?: string }) {
    const item: Variants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
    };

    return (
        <motion.div variants={item} className={clsx(className)}>
            {children}
        </motion.div>
    );
}
