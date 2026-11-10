import { Card, SegmentedChips, Stack, Text, type ChipItem } from '@/components/controllers';
import { useSchemePreference, type SchemePreference } from '@/core/theme/preference';
import { ar } from '@/core/strings/ar';

const ITEMS: ChipItem[] = [
  { key: 'system', label: ar.more.schemeSystem },
  { key: 'light', label: ar.more.schemeLight },
  { key: 'dark', label: ar.more.schemeDark },
];

/** Lets the user force light or dark, or follow the device. Applies at once and is remembered. */
export function AppearanceCard() {
  const preference = useSchemePreference((s) => s.preference);
  const setPreference = useSchemePreference((s) => s.setPreference);
  return (
    <Card gap="xs">
      <Stack gap="xs">
        <Text variant="heading" accessibilityRole="header">{ar.more.appearance}</Text>
        <Text variant="caption" tone="muted">{ar.more.appearanceNote}</Text>
      </Stack>
      <SegmentedChips items={ITEMS} value={preference} onChange={(key) => setPreference(key as SchemePreference)} />
    </Card>
  );
}
