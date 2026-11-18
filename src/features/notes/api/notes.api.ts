import { get } from '@/core/api/client';
import type { FamilyNote } from '@/core/api/types';

export const fetchNotes = (studentId: number) => get<FamilyNote[]>(`/mobile/students/${studentId}/notes`);
