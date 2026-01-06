import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function formatPercent(value: number, decimals: number = 0): string {
  return `${(value * 100).toFixed(decimals)}%`;
}
export function getScoreColor(score: number): string {
  if (score >= 0.8) return '#10b981'; // Emerald
  if (score >= 0.5) return '#f59e0b'; // Amber
  if (score >= 0.3) return '#f97316'; // Orange
  return '#ef4444'; // Red
}
export function getIntensity(score: number, base: number = 0.2): number {
  return Math.max(base, Math.min(1.0, score));
}
export function truncateString(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}