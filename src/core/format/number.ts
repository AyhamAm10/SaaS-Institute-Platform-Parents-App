import { ar } from '@/core/strings/ar';
import type { Currency } from '@/core/api/types';

/** Western digits with thousands separators, regardless of device locale. */
export function formatNumber(value: number, maxFraction = 2): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: maxFraction }).format(value);
}

/** SYP -> "1,500,000 ل.س"; USD -> "$200". Currencies are never mixed or converted. */
export function formatMoney(amount: number, currency: Currency): string {
  const n = formatNumber(amount, currency === 'USD' ? 2 : 0);
  return currency === 'USD' ? `$${n}` : `${n} ${ar.currency.SYP}`;
}

/** Arabic noun forms by count: 1, 2, 3-10, 11+ (e.g. مذاكرة واحدة / مذاكرتان / 3 مذاكرات / 12 مذاكرة). */
export interface CountForms { one: string; two: string; few: string; many: string }

export function countText(n: number, forms: CountForms): string {
  if (n === 1) return forms.one;
  if (n === 2) return forms.two;
  const m = n % 100;
  return `${formatNumber(n, 0)} ${m >= 3 && m <= 10 ? forms.few : forms.many}`;
}

export function formatPercent(value: number | null): string {
  return value === null ? '—' : `${Math.round(value)}${ar.common.percent}`;
}

export function clampPercent(value: number | null | undefined): number {
  if (value === null || value === undefined || Number.isNaN(value)) return 0;
  return Math.min(100, Math.max(0, value));
}
