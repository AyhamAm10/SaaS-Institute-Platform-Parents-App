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

export function formatPercent(value: number | null): string {
  return value === null ? '—' : `${Math.round(value)}${ar.common.percent}`;
}

export function clampPercent(value: number | null | undefined): number {
  if (value === null || value === undefined || Number.isNaN(value)) return 0;
  return Math.min(100, Math.max(0, value));
}
