"use client";

import React from "react";
import { Header } from "@/components/header";
import Footer from "@/components/footer";
import { cn } from "@/common/lib/utils";
import type { INavItem, IActionButtons, ILanguageOptions } from "@/types/header";

export interface SiteLayoutProps {
  children: React.ReactNode;
  navItems?: INavItem[];
  actionButtons?: IActionButtons;
  languageOptions?: ILanguageOptions;
  footerNavLinks?: { label: string; href: string }[];
  className?: string;
  style?: React.CSSProperties;
}

export default function SiteLayout({
  children,
  navItems,
  actionButtons,
  languageOptions,
  footerNavLinks,
  className,
  style,
}: SiteLayoutProps) {
  return (
    <div className="min-h-screen">
      <Header navItems={navItems} actionButtons={actionButtons} languageOptions={languageOptions} />

      {/* Espaço superior para compensar header fixo */}
      <main className={cn("pt-0", className)} style={style}>
        {children}
      </main>

      <Footer navLinks={footerNavLinks} />
    </div>
  );
}


