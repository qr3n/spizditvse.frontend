'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export function useStaggerAnimation<T extends HTMLElement = HTMLDivElement>(selector: string = '> *', staggerDelay: number = 0.05) {
    const containerRef = useRef<T>(null);

    useGSAP(() => {
        if (!containerRef.current) return;
        
        const safeSelector = selector.trim().startsWith('>') ? `:scope ${selector.trim()}` : selector;
        const elements = containerRef.current.querySelectorAll(safeSelector);
        if (elements.length === 0) return;

        // Force initial state to prevent flash
        gsap.set(elements, { opacity: 0, y: 10 });

        gsap.to(elements,
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: staggerDelay,
                ease: 'power3.out',
                clearProps: 'transform' // Do not clear everything, only transform, prevents jumping
            }
        );
    }, { scope: containerRef });

    return containerRef;
}
