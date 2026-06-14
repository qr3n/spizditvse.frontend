'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { usePathname } from 'next/navigation';

export function PageTransition({ children }: { children: React.ReactNode }) {
    const container = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    useGSAP(() => {
        if (!container.current) return;
        
        // Use fromTo but clear only transform to prevent Layout Thrashing/Jumping
        gsap.fromTo(container.current.children, 
            { opacity: 0, y: 10 }, 
            { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', clearProps: 'transform' }
        );
    }, { dependencies: [pathname] });

    return (
        <div ref={container} style={{ width: '100%', height: '100%' }}>
            {children}
        </div>
    );
}
