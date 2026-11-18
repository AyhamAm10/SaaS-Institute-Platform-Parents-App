import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { NotificationCategory, NotificationSettings } from '@/core/api/types';
import { useIsFamily } from '@/core/auth/store';
import { fetchNotificationSettings, saveNotificationSettings } from '../api/notifications.api';

const KEY = ['notifications', 'settings'] as const;

/** Students receive no finance or family-note notifications, so they do not see those switches. */
const STUDENT_CATEGORIES: NotificationCategory[] = ['ATTENDANCE', 'STUDY', 'GENERAL'];

/** Per-category switches (all on by default), saved on the server for every device of the user. */
export function useNotificationSettings() {
  const client = useQueryClient();
  const isFamily = useIsFamily();
  const query = useQuery({ queryKey: KEY, queryFn: fetchNotificationSettings });
  const save = useMutation({
    mutationFn: saveNotificationSettings,
    onMutate: async (disabled) => {
      await client.cancelQueries({ queryKey: KEY });
      const previous = client.getQueryData<NotificationSettings>(KEY);
      if (previous) {
        client.setQueryData<NotificationSettings>(KEY, {
          categories: previous.categories.map((c) => ({ ...c, enabled: !disabled.includes(c.key) })),
        });
      }
      return { previous };
    },
    onError: (_e, _v, context) => client.setQueryData(KEY, context?.previous),
    onSuccess: (data) => client.setQueryData(KEY, data),
  });

  const all = query.data?.categories ?? [];
  const categories = isFamily ? all : all.filter((c) => STUDENT_CATEGORIES.includes(c.key));
  const toggle = (key: NotificationCategory, enabled: boolean) => {
    const disabled = all.filter((c) => (c.key === key ? !enabled : !c.enabled)).map((c) => c.key);
    save.mutate(disabled);
  };
  return { query, categories, toggle };
}
