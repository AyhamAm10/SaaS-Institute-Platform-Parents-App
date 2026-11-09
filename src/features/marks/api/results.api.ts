import { get } from '@/core/api/client';
import type { Results } from '@/core/api/types';

export const fetchResults = (studentId: number) => get<Results>(`/mobile/students/${studentId}/results`);
