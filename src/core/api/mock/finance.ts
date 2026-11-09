import type { Finance, Installment } from '../types';
import { daysFromToday } from './dates';

const inst = (id: number, number: number, off: number, amount: number, paid: number, status: Installment['status']): Installment => ({
  id, number, dueDate: daysFromToday(off), amount, paid, remaining: amount - paid, status,
});

export function financeFor(): Finance {
  return {
    totals: [
      { currency: 'SYP', total: 4500000, paid: 3000000, remaining: 1500000, overdue: 500000 },
      { currency: 'USD', total: 600, paid: 400, remaining: 200, overdue: 0 },
    ],
    contracts: [
      {
        id: 1, yearName: '2026 - 2027', currency: 'SYP', total: 4500000, discount: 250000, paid: 3000000, remaining: 1500000,
        installments: [
          inst(1, 1, -90, 1500000, 1500000, 'PAID'),
          inst(2, 2, -45, 1500000, 1000000, 'PARTIAL'),
          inst(3, 3, -10, 500000, 0, 'OVERDUE'),
          inst(4, 4, 9, 750000, 0, 'DUE'),
          inst(5, 5, 60, 250000, 0, 'CANCELLED'),
        ],
      },
      {
        id: 2, yearName: 'النقل المدرسي', currency: 'USD', total: 600, discount: 0, paid: 400, remaining: 200,
        installments: [inst(6, 1, -60, 400, 400, 'PAID'), inst(7, 2, 30, 200, 0, 'DUE')],
      },
    ],
    payments: [
      { id: 1, receiptNumber: '412', date: daysFromToday(-45), amount: 1000000, currency: 'SYP', method: 'CASH', status: 'ACTIVE' },
      { id: 2, receiptNumber: '233', date: daysFromToday(-90), amount: 1500000, currency: 'SYP', method: 'BANK_TRANSFER', status: 'ACTIVE' },
      { id: 3, receiptNumber: '301', date: daysFromToday(-60), amount: 400, currency: 'USD', method: 'CASH', status: 'ACTIVE' },
      { id: 4, receiptNumber: '350', date: daysFromToday(-50), amount: 300000, currency: 'SYP', method: 'CASH', status: 'CANCELLED' },
    ],
  };
}
