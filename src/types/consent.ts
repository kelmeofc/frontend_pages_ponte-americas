export type ConsentChoice = "accepted" | "essentials_only" | "denied";

export interface WindowWithGtag {
  gtag?: (...args: any[]) => void;
  clarity?: (command: string, value: boolean) => void;
}