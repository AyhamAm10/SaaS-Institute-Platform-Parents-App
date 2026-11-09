import { useQuery } from '@tanstack/react-query';
import { useSelectedChildId } from '@/core/auth/hooks';
import { fetchTimetable } from '../api/timetable.api';

export function useTimetable() {
  const studentId = useSelectedChildId();
  return useQuery({
    queryKey: ['timetable', studentId],
    queryFn: () => fetchTimetable(studentId),
    enabled: studentId > 0,
    staleTime: 10 * 60_000,
  });
}
