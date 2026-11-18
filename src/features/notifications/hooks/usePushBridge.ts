import { useEffect } from 'react';
import { useGlobalSearchParams, useRouter, type Href } from 'expo-router';
import { useQueryClient } from '@tanstack/react-query';
import { selectChild } from '@/core/auth/actions';
import { useSession } from '@/core/auth/store';
import { listenPush } from '@/core/push/device';
import { NOTIFICATIONS_KEY } from './useNotifications';

const APP_PATHS = new Set(['/attendance', '/finance', '/marks', '/timetable', '/notes', '/notifications']);

/** Switches to the child a notification is about (guardians with several children). */
function useChildFromLink(): void {
  const { studentId } = useGlobalSearchParams<{ studentId?: string }>();
  const children = useSession((s) => s.me?.children);
  useEffect(() => {
    const id = Number(studentId);
    if (id > 0 && children?.some((c) => c.id === id)) selectChild(id);
  }, [studentId, children]);
}

/**
 * Connects pushes to the app while signed in: a push refreshes the inbox and
 * badge; tapping one opens its screen for the right child. A web push opens
 * the app at its link (`/attendance?studentId=..`), handled by useChildFromLink.
 */
export function usePushBridge(): void {
  const router = useRouter();
  const client = useQueryClient();
  useChildFromLink();

  useEffect(
    () =>
      listenPush({
        onReceive: () => void client.invalidateQueries({ queryKey: NOTIFICATIONS_KEY }),
        onTap: ({ path, studentId }) => {
          void client.invalidateQueries({ queryKey: NOTIFICATIONS_KEY });
          const target = path && APP_PATHS.has(path) ? path : '/notifications';
          router.push((studentId ? `${target}?studentId=${studentId}` : target) as Href);
        },
      }),
    [client, router],
  );
}
