import { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
}

export interface NavLinkItem {
  label: string;
  href: string;
}

export interface HeroCardItem {
  id: string | number;
  title: string;
  description: string;
  imageUrl: string;
  href: string;
}


export interface AboutSectionProps {
  sectionTagline?: string;
  title?: string;
  description?: string;
  
  // Accept asset objects (imported directly from folder) or simple path strings
  leftFeaturedImage?: string | unknown;
  backgroundImageUrl?: string | unknown;
  
  ctaText?: string;
  ctaHref?: string;

  // Stats Configuration
  stats?: {
    value: string;
    label: string;
  }[];
}