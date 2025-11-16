"use client";

import React from "react";
import { Header } from "@/components/header";
import Footer from "@/components/footer";
import { cn } from "@/common/lib/utils";
import { useSmoothScroll } from "@/common/hooks/use-smooth-scroll";
import { useLenisScroll } from "@/common/hooks/use-lenis-scroll";
import type { INavItem, IActionButtons, ILanguageOptions, HeaderVariant, FooterVariant } from "@/types/header";

export interface SiteLayoutProps {
  children: React.ReactNode;
  navItems?: INavItem[];
  actionButtons?: IActionButtons;
  languageOptions?: ILanguageOptions;
  footerNavLinks?: { label: string; href: string }[];
  className?: string;
  style?: React.CSSProperties;
  variant?: HeaderVariant;
  footerVariant?: FooterVariant;
}

export default function SiteLayout({
  children,
  navItems,
  actionButtons,
  languageOptions,
  footerNavLinks,
  className,
  style,
  variant,
  footerVariant,
}: SiteLayoutProps) {
  // Scroll aesthetic com Lenis (inércia e easing suave)
  useLenisScroll({
    duration: 1.2,
    smoothness: 0.1,
    wheelMultiplier: 1,
  });
  
  // Scroll suave para anchor links com offset para header fixo
  useSmoothScroll({ offset: 80 });

  return (
    <div className="h-full">
      <Header navItems={navItems} actionButtons={actionButtons} languageOptions={languageOptions} variant={variant} />

      {/* Espaço superior para compensar header fixo */}
      <main className={cn("pt-0", className)} style={style}>
        {children}
      </main>

      <Footer navLinks={footerNavLinks} variant={footerVariant} />
    </div>
  );
}


