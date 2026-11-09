import { useQuery } from '@tanstack/react-query';
import { useSelectedChildId, } from '@/core/auth/hooks';
import { useIsFamily } from '@/core/auth/store';
import { fetchFinance } from '../api/finance.api';

/** Finance is FAMILY-only: the query never fires for students. */
export function useFinance() {
  const studentId = useSelectedChildId();
  const isFamily = useIsFamily();
  return useQuery({
    queryKey: ['finance', studentId],
    queryFn: () => fetchFinance(studentId),
    enabled: studentId > 0 && isFamily,
    staleTime: 60_000,
  });
}
