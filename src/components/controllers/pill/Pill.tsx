import type { ReactNode } from 'react';
import { View } from 'react-native';
import { HIT, radius, space } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';
import { PressableScale } from '../_shared/PressableScale';
import { Icon } from '../icon';
import { Row } from '../layout';
import { Text } from '../text';

interface Props {
  label: string;
  /** Leading node (avatar). */
  leading?: ReactNode;
  /** Pressable pill shows a chevron; without onPress it is a static badge. */
  onPress?: () => void;
  a11yLabel?: string;
}

/** Glass capsule (child switcher). 48pt tall, name truncates, chevron when pressable. */
export function Pill({ label, leading, onPress, a11yLabel }: Props) {
  const theme = useTheme();
  const body = (
    <Row gap="sm" maxWidth={240} accessible={!onPress} accessibilityLabel={onPress ? undefined : a11yLabel}>
      {leading}
      <Text variant="label" numberOfLines={1}>{label}</Text>
      {onPress ? <Icon name="chevron-down" size="xs" tone="muted" duotone={false} /> : null}
    </Row>
  );
  const surface = {
    minHeight: HIT + 4, justifyContent: 'center', paddingStart: space.sm, paddingEnd: space.md, borderRadius: radius.pill,
    backgroundColor: theme.glassBgStrong, borderWidth: 1, borderColor: theme.glassBorder, boxShadow: theme.elev1,
  } as const;
  if (!onPress) return <View style={surface}>{body}</View>;
  return <PressableScale label={a11yLabel} onPress={onPress} inner={surface}>{body}</PressableScale>;
}
