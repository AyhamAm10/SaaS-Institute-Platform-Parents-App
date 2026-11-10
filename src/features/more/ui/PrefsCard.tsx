import { useState } from 'react';
import { Card, Row, Stack, Text, Toggle } from '@/components/controllers';
import { ar } from '@/core/strings/ar';

const KEYS = ['attendance', 'marks', 'payments', 'announcements'] as const;

/** STATIC toggles (not persisted, not sent anywhere) until push notifications exist. */
export function PrefsCard() {
  const [values, setValues] = useState<Record<(typeof KEYS)[number], boolean>>({
    attendance: true, marks: true, payments: true, announcements: false,
  });
  return (
    <Card gap="xs">
      <Stack gap="xs">
        <Text variant="heading" accessibilityRole="header">{ar.more.prefs}</Text>
        <Text variant="caption" tone="muted">{ar.more.prefsNote}</Text>
      </Stack>
      {KEYS.map((k) => (
        <Row key={k} justify="between" minHeight={48}>
          <Text>{ar.notifications.prefs[k]}</Text>
          <Toggle value={values[k]} onChange={(v) => setValues((s) => ({ ...s, [k]: v }))} label={ar.notifications.prefs[k]} />
        </Row>
      ))}
    </Card>
  );
}
