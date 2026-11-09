import { get } from '@/core/api/client';
import type { Finance } from '@/core/api/types';

export const fetchFinance = (studentId: number) => get<Finance>(`/mobile/students/${studentId}/finance`);
