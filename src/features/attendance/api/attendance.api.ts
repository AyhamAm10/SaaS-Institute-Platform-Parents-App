import { get } from '@/core/api/client';
import type { AttendanceMonth } from '@/core/api/types';

export const fetchAttendance = (studentId: number, month: string) =>
  get<AttendanceMonth>(`/mobile/students/${studentId}/attendance`, { month });
