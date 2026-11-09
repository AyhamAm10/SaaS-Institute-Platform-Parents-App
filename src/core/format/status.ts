import { ar } from '@/core/strings/ar';
import type { AttendanceStatus, InstallmentStatus } from '@/core/api/types';

/** Semantic tone -> theme color role. Mapping to actual colors lives in the theme. */
export type Tone = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

export function attendanceTone(status: AttendanceStatus | null): Tone {
  switch (status) {
    case 'PRESENT': return 'success';
    case 'LATE': return 'warning';
    case 'ABSENT': return 'danger';
    case 'EXCUSED': return 'info';
    default: return 'neutral';
  }
}

export function attendanceLabel(status: AttendanceStatus | null): string {
  return status ? ar.attendanceStatus[status] : ar.attendanceStatus.NONE;
}

export function installmentTone(status: InstallmentStatus): Tone {
  switch (status) {
    case 'PAID': return 'success';
    case 'PARTIAL': return 'info';
    case 'OVERDUE': return 'danger';
    case 'DUE': return 'warning';
    default: return 'neutral';
  }
}

export function installmentLabel(status: InstallmentStatus): string {
  return ar.finance[status];
}

/** Grade tone from a 0-100 percent. */
export function percentTone(percent: number | null): Tone {
  if (percent === null) return 'neutral';
  if (percent >= 75) return 'success';
  if (percent >= 50) return 'warning';
  return 'danger';
}

/** Arabic label for the API's payment method enum name; unknown values fall back to "أخرى". */
export function paymentMethodLabel(method: string): string {
  return (ar.paymentMethods as Record<string, string>)[method] ?? ar.paymentMethods.OTHER;
}
