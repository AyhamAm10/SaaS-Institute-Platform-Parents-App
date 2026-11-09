import { useQuery } from '@tanstack/react-query';
import { useSelectedChildId } from '@/core/auth/hooks';
import { fetchOverview } from '../api/overview.api';

export function useOverview() {
  const studentId = useSelectedChildId();
  return useQuery({
    queryKey: ['overview', studentId],
    queryFn: () => fetchOverview(studentId),
    enabled: studentId > 0,
    staleTime: 60_000,
  });
}
