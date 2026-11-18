import { useQuery } from '@tanstack/react-query';
import { useSelectedChildId } from '@/core/auth/hooks';
import { useIsFamily } from '@/core/auth/store';
import { fetchNotes } from '../api/notes.api';

/** Notes for the family are FAMILY-only: the query never fires for students. */
export function useNotes() {
  const studentId = useSelectedChildId();
  const isFamily = useIsFamily();
  return useQuery({
    queryKey: ['notes', studentId],
    queryFn: () => fetchNotes(studentId),
    enabled: studentId > 0 && isFamily,
    staleTime: 60_000,
  });
}
