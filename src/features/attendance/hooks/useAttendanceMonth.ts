import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useSelectedChildId } from '@/core/auth/hooks';
import { fetchAttendance } from '../api/attendance.api';

/** keepPreviousData: switching months keeps the old grid visible instead of flashing a skeleton. */
export function useAttendanceMonth(month: string) {
  const studentId = useSelectedChildId();
  return useQuery({
    queryKey: ['attendance', studentId, month],
    queryFn: () => fetchAttendance(studentId, month),
    enabled: studentId > 0,
    placeholderData: keepPreviousData,
    staleTime: 2 * 60_000,
  });
}
