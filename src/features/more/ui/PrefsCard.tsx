import { useState } from 'react';
import { Switch, View } from 'react-native';
import { AppText } from '@/components/AppText';
import { Card } from '@/components/Card';
import { ar } from '@/core/strings/ar';
import { HIT, space } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';

const KEYS = ['attendance', 'marks', 'payments', 'announcements'] as const;

/** STATIC toggles (not persisted, not sent anywhere) until push notifications exist. */
export function PrefsCard() {
  const theme = useTheme();
  const [values, setValues] = useState<Record<(typeof KEYS)[number], boolean>>({
    attendance: true, marks: true, payments: true, announcements: false,
  });
  return (
    <Card style={{ gap: space.xs }}>
      <AppText variant="heading" accessibilityRole="header">{ar.more.prefs}</AppText>
      <AppText variant="caption" color="textMuted">{ar.more.prefsNote}</AppText>
      {KEYS.map((k) => (
        <View key={k} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', minHeight: HIT + 4 }}>
          <AppText>{ar.notifications.prefs[k]}</AppText>
          <Switch
            value={values[k]}
            onValueChange={(v) => setValues((s) => ({ ...s, [k]: v }))}
            accessibilityLabel={ar.notifications.prefs[k]}
            trackColor={{ true: theme.accent, false: theme.track }}
          />
        </View>
      ))}
    </Card>
  );
}
