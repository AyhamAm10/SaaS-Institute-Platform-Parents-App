import { useQuery } from '@tanstack/react-query';
import { useSelectedChildId } from '@/core/auth/hooks';
import { fetchProfile } from '../api/profile.api';

export function useProfile() {
  const studentId = useSelectedChildId();
  return useQuery({
    queryKey: ['profile', studentId],
    queryFn: () => fetchProfile(studentId),
    enabled: studentId > 0,
    staleTime: 10 * 60_000,
  });
}
