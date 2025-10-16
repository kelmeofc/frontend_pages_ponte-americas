'use client';

import { useEffect, useRef, useState } from 'react';

interface FadeInSectionProps {
    children: React.ReactNode;
    className?: string;
}

export function FadeInSection({ children, className = '' }: FadeInSectionProps) {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => setIsVisible(entry.isIntersecting));
        }, { threshold: 0.1 });

        const currentElement = domRef.current;
        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, []);

    return (
        <div
            ref={domRef}
            className={`transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'} ${className}`}
        >
            {children}
        </div>
    );
} 