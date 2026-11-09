import { useQuery } from '@tanstack/react-query';
import { useSelectedChildId } from '@/core/auth/hooks';
import { fetchResults } from '../api/results.api';

export function useResults() {
  const studentId = useSelectedChildId();
  return useQuery({
    queryKey: ['results', studentId],
    queryFn: () => fetchResults(studentId),
    enabled: studentId > 0,
    staleTime: 2 * 60_000,
  });
}
