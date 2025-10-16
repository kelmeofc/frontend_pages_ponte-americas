"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface AnimationOptions {
  duration?: number;
  ease?: string;
  y?: number;
  autoAlpha?: number;
  force3D?: boolean;
}

export const useGSAPAnimation = (
  shouldAnimate: boolean,
  options: AnimationOptions = {}
) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shouldAnimate || !elementRef.current) return;

    const element = elementRef.current;
    const {
      duration = 0.6,
      ease = "power4.out",
      y = 0,
      autoAlpha = 1,
      force3D = true,
    } = options;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        { y: 40, autoAlpha: 0, force3D: true },
        { y, autoAlpha, duration, ease, force3D }
      );
    }, element);

    return () => ctx.revert();
  }, [shouldAnimate, options]);

  return elementRef;
};
