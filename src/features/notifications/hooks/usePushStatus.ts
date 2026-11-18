import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { pushPermission } from '@/core/push/device';
import { enablePush } from '@/core/push/registration';

const KEY = ['push', 'permission'] as const;

/** Push state of this device and the "enable" action (a click, as browsers require). */
export function usePushStatus() {
  const client = useQueryClient();
  const status = useQuery({ queryKey: KEY, queryFn: pushPermission, staleTime: 0, refetchOnWindowFocus: true });
  const enable = useMutation({
    mutationFn: enablePush,
    onSuccess: (permission) => client.setQueryData(KEY, permission),
  });
  return {
    permission: status.data ?? null,
    enable: () => enable.mutate(),
    enabling: enable.isPending,
  };
}
