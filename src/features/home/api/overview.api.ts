import { get } from '@/core/api/client';
import type { Overview } from '@/core/api/types';

export const fetchOverview = (studentId: number) => get<Overview>(`/mobile/students/${studentId}/overview`);
