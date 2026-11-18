import { Redirect } from 'expo-router';
import { Card, EmptyState, QueryBoundary, Reveal, Screen, Skeleton, Stack, Text } from '@/components/controllers';
import { useIsFamily } from '@/core/auth/store';
import { formatFullDate } from '@/core/format/date';
import { ar } from '@/core/strings/ar';
import { StackHeader } from '@/features/shell/ui/StackHeader';
import { useNotes } from '../hooks/useNotes';

/** Notes the institute wrote for the family, newest first (guardians only). */
export function NotesScreen() {
  const isFamily = useIsFamily();
  const query = useNotes();
  if (!isFamily) return <Redirect href="/" />;

  return (
    <Screen
      ambient="ember"
      header={<StackHeader title={ar.notes.title} />}
      refreshing={query.isRefetching}
      onRefresh={() => void query.refetch()}
    >
      <QueryBoundary
        query={query}
        skeleton={<Stack gap="lg">{[0, 1].map((i) => <Card key={i}><Skeleton height={90} round="lg" /></Card>)}</Stack>}
      >
        {(notes) =>
          notes.length === 0 ? (
            <Card><EmptyState art="bell" title={ar.notes.empty} hint={ar.notes.emptyHint} /></Card>
          ) : (
            <Stack gap="md">
              {notes.map((n, i) => (
                <Reveal key={n.id} index={i}>
                  <Card>
                    <Text>{n.body}</Text>
                    <Text variant="caption" tone="muted">
                      {formatFullDate(n.createdAt.slice(0, 10))}{n.author ? ` · ${n.author}` : ''}
                    </Text>
                  </Card>
                </Reveal>
              ))}
            </Stack>
          )
        }
      </QueryBoundary>
    </Screen>
  );
}
