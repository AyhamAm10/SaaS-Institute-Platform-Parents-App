import { get } from '@/core/api/client';
import type { Timetable } from '@/core/api/types';

export const fetchTimetable = (studentId: number) => get<Timetable>(`/mobile/students/${studentId}/timetable`);
