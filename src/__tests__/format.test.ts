import { daysBetween, formatLongDate, parseYmd, relativeDay, weekdayOf } from '@/core/format/date';
import { addMonths, calendarCells, compareMonths, daysInMonth, firstWeekdayIndex, monthLabel } from '@/core/format/month';
import { clampPercent, formatMoney, formatNumber, formatPercent } from '@/core/format/number';
import { ringGeometry, sparklinePoints } from '@/core/format/ring';
import { attendanceLabel, attendanceTone, installmentTone, percentTone } from '@/core/format/status';

describe('dates', () => {
  it('parses YYYY-MM-DD as a local date', () => {
    const d = parseYmd('2026-11-08');
    expect([d.getFullYear(), d.getMonth(), d.getDate()]).toEqual([2026, 10, 8]);
  });
  it('finds weekday and day distance', () => {
    expect(weekdayOf('2026-11-08')).toBe('SUNDAY');
    expect(daysBetween('2026-02-27', '2026-03-02')).toBe(3);
  });
  it('formats Arabic dates with Western digits', () => {
    expect(formatLongDate('2026-11-08')).toBe('الأحد، 8 تشرين الثاني');
  });
  it('labels relative days', () => {
    expect(relativeDay('2026-11-08', '2026-11-08')).toBe('اليوم');
    expect(relativeDay('2026-11-09', '2026-11-08')).toBe('غداً');
    expect(relativeDay('2026-11-07', '2026-11-08')).toBe('أمس');
    expect(relativeDay('2026-11-20', '2026-11-08')).toBe('20 تشرين الثاني');
  });
});

describe('month math', () => {
  it('adds months across years', () => {
    expect(addMonths('2026-12', 1)).toBe('2027-01');
    expect(addMonths('2026-01', -1)).toBe('2025-12');
    expect(addMonths('2026-05', 0)).toBe('2026-05');
  });
  it('knows month length and first weekday', () => {
    expect(daysInMonth('2024-02')).toBe(29);
    expect(daysInMonth('2026-11')).toBe(30);
    expect(firstWeekdayIndex('2026-11')).toBe(0);
  });
  it('builds calendar cells with leading blanks', () => {
    const cells = calendarCells('2026-10');
    expect(cells.slice(0, 4)).toEqual([null, null, null, null]);
    expect(cells[4]).toBe('2026-10-01');
    expect(cells).toHaveLength(4 + 31);
  });
  it('compares and labels', () => {
    expect(compareMonths('2026-11', '2026-10')).toBe(1);
    expect(monthLabel('2026-11')).toBe('تشرين الثاني 2026');
  });
});

describe('numbers and money', () => {
  it('uses Western digits and never mixes currencies', () => {
    expect(formatNumber(1500000)).toBe('1,500,000');
    expect(formatMoney(1500000, 'SYP')).toBe('1,500,000 ل.س');
    expect(formatMoney(200, 'USD')).toBe('$200');
  });
  it('formats and clamps percent', () => {
    expect(formatPercent(91.6)).toBe('92٪');
    expect(formatPercent(null)).toBe('—');
    expect(clampPercent(150)).toBe(100);
    expect(clampPercent(-5)).toBe(0);
    expect(clampPercent(null)).toBe(0);
  });
});

describe('ring math', () => {
  it('computes dash offset', () => {
    const g = ringGeometry(100, 10, 25);
    expect(g.radius).toBe(45);
    expect(g.offset).toBeCloseTo(g.circumference * 0.75);
    expect(ringGeometry(100, 10, 100).offset).toBeCloseTo(0);
    expect(ringGeometry(100, 10, null).offset).toBeCloseTo(ringGeometry(100, 10, 0).circumference);
  });
  it('builds sparkline points', () => {
    expect(sparklinePoints([0, 100], 10, 10)).toBe('0.0,10.0 10.0,0.0');
    expect(sparklinePoints([], 10, 10)).toBe('');
  });
});

describe('status mapping', () => {
  it('maps attendance', () => {
    expect(attendanceTone('PRESENT')).toBe('success');
    expect(attendanceTone('LATE')).toBe('warning');
    expect(attendanceTone('ABSENT')).toBe('danger');
    expect(attendanceTone('EXCUSED')).toBe('info');
    expect(attendanceTone(null)).toBe('neutral');
    expect(attendanceLabel(null)).toBe('لم يُسجَّل');
    expect(attendanceLabel('EXCUSED')).toBe('بعذر');
  });
  it('maps installments and grades', () => {
    expect(installmentTone('OVERDUE')).toBe('danger');
    expect(installmentTone('CANCELLED')).toBe('neutral');
    expect(percentTone(80)).toBe('success');
    expect(percentTone(60)).toBe('warning');
    expect(percentTone(30)).toBe('danger');
  });
});

describe('clock and payment method', () => {
  it('formats HH:mm strings and ISO instants', () => {
    const { formatClock } = jest.requireActual('@/core/format/date');
    expect(formatClock('08:25')).toBe('08:25');
    expect(formatClock(null)).toBe('—');
    expect(formatClock('2026-11-08T05:30:00.000Z')).toMatch(/^\d{2}:\d{2}$/);
  });
  it('maps method enum names to Arabic with a fallback', () => {
    const { paymentMethodLabel } = jest.requireActual('@/core/format/status');
    expect(paymentMethodLabel('CASH')).toBe('نقداً');
    expect(paymentMethodLabel('BANK_TRANSFER')).toBe('تحويل بنكي');
    expect(paymentMethodLabel('WHATEVER')).toBe('أخرى');
  });
});
