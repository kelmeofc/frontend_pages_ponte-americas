export interface LegalPageMetadata {
  title: string;
  description: string;
  keywords: string[];
  lastUpdated: string;
  canonical: string;
}

export interface LegalPageConfig {
  title: string;
  description: string;
  lastUpdated: string;
  icon: string;
  metadata: LegalPageMetadata;
}
