import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistanceToNow } from 'date-fns'
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
export function getDelayColor(delay: number | string): string {
  const d = typeof delay === 'string' ? parseInt(delay, 10) : delay;
  if (d <= 5) return 'text-emerald-500';
  if (d <= 15) return 'text-amber-500';
  return 'text-red-500';
}
export function getRelativeTime(timestamp?: string | number): string {
  if (!timestamp) return 'Just now';
  try {
    const date = new Date(timestamp);
    return formatDistanceToNow(date, { addSuffix: true });
  } catch {
    return 'Recently';
  }
}
export function getIntensity(score: number, base: number = 0.2): number {
  return Math.max(base, Math.min(1.0, score));
}
export function truncateString(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}