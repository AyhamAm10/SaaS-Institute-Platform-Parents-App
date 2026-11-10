import type { ReactNode } from 'react';
import { Stack } from '../layout';
import { Text } from '../text';
import { Illustration, type Art } from './ui/Illustration';

interface Props {
  art: Art;
  title: string;
  hint?: string;
  action?: ReactNode;
}

/** Friendly empty state: brand illustration, Arabic title, optional hint and action. */
export function EmptyState({ art, title, hint, action }: Props) {
  return (
    <Stack accessible align="center" gap="sm" py="xl" px="xl">
      <Illustration art={art} />
      <Text variant="heading" align="center">{title}</Text>
      {hint ? <Text tone="muted" align="center">{hint}</Text> : null}
      {action}
    </Stack>
  );
}
