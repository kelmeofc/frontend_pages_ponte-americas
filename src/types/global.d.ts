import { WindowWithGtag } from "@/types/consent";

declare global {
  // Estende o tipo Window com as definições de WindowWithGtag
  interface Window extends WindowWithGtag {
    dataLayer?: any[];
  }
}

export {};