import type { Finance } from '@/core/api/types';
import { formatFullDate } from '@/core/format/date';
import { formatMoney } from '@/core/format/number';
import { installmentLabel, paymentMethodLabel } from '@/core/format/status';
import { ar } from '@/core/strings/ar';

/** Plain-text statement for the share sheet. Currencies are listed separately, never summed. */
export function buildStatement(studentName: string, instituteName: string, f: Finance, today: string): string {
  const lines: string[] = [`${ar.finance.statement} - ${instituteName}`, `${studentName}`, formatFullDate(today), ''];
  lines.push(ar.finance.summary);
  for (const t of f.totals) {
    lines.push(
      `${t.currency === 'USD' ? 'USD' : 'SYP'}: ${ar.finance.total} ${formatMoney(t.total, t.currency)}` +
        ` | ${ar.finance.paid} ${formatMoney(t.paid, t.currency)}` +
        ` | ${ar.finance.remaining} ${formatMoney(t.remaining, t.currency)}` +
        (t.overdue > 0 ? ` | ${ar.finance.overdue} ${formatMoney(t.overdue, t.currency)}` : ''),
    );
  }
  for (const c of f.contracts) {
    lines.push('', `${ar.finance.contracts}: ${c.yearName} (${formatMoney(c.total, c.currency)})`);
    for (const i of c.installments) {
      lines.push(`  ${i.number}. ${formatFullDate(i.dueDate)} - ${formatMoney(i.amount, c.currency)} - ${installmentLabel(i.status)}`);
    }
  }
  const active = f.payments.filter((p) => p.status === 'ACTIVE');
  if (active.length) {
    lines.push('', ar.finance.payments);
    for (const p of active) lines.push(`  ${p.receiptNumber} - ${formatFullDate(p.date)} - ${formatMoney(p.amount, p.currency)} - ${paymentMethodLabel(p.method)}`);
  }
  return lines.join('\n');
}
