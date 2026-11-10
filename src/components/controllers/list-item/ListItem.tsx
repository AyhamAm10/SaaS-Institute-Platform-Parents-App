import type { ReactNode } from 'react';
import { radius, space } from '@/core/theme/metrics';
import type { ToneKey } from '@/core/theme/tones';
import { useTheme } from '@/core/theme/ThemeProvider';
import { PressableScale } from '../_shared/PressableScale';
import { FORWARD_ICON, Icon, type IconName } from '../icon';
import { IconTile } from '../icon-tile';
import { Box, Row, Stack } from '../layout';
import { Text } from '../text';

interface Props {
  title: string;
  subtitle?: string;
  icon?: IconName;
  tone?: ToneKey;
  /** Custom leading node (avatar...) instead of an icon tile. */
  leading?: ReactNode;
  /** Short trailing text (time, amount). */
  meta?: string;
  selected?: boolean;
  chevron?: boolean;
  /** Replaces the default chevron (e.g. expand/collapse). */
  trailing?: IconName;
  /** Custom trailing node (pill...) instead of meta text. */
  end?: ReactNode;
  unread?: boolean;
  onPress?: () => void;
  label?: string;
}

/** Row used by sheets, settings and feeds: leading + title/subtitle + meta/chevron/check. */
export function ListItem({
  title, subtitle, icon, tone = 'accent', leading, meta, selected, chevron = true, trailing, end, unread, onPress, label,
}: Props) {
  const theme = useTheme();
  const content = (
    <Row gap="md" py="sm" px="md">
      {leading ?? (icon ? <IconTile icon={icon} tone={tone} size="md" /> : null)}
      <Stack flex={1}>
        <Text variant="label" numberOfLines={2}>{title}</Text>
        {subtitle ? <Text variant="caption" tone="muted">{subtitle}</Text> : null}
      </Stack>
      {end}
      {meta ? <Text variant="caption" tone="muted" tabular>{meta}</Text> : null}
      {unread ? <Box width={10} height={10} radius="pill" bg="brandAccent" aria-hidden /> : null}
      {selected ? <Icon name="checkmark-circle" tone="accentSolid" /> : onPress && chevron ? <Icon name={trailing ?? FORWARD_ICON} size="sm" tone="muted" duotone={false} /> : null}
    </Row>
  );
  if (!onPress) return <Stack minHeight={56} justify="center" accessible accessibilityLabel={label ?? (subtitle ? `${title}، ${subtitle}` : title)}>{content}</Stack>;
  return (
    <PressableScale
      label={label ?? (subtitle ? `${title}، ${subtitle}` : title)} state={{ selected: !!selected }} onPress={onPress} scaleTo={0.98}
      inner={{ minHeight: 56, justifyContent: 'center', borderRadius: radius.lg, backgroundColor: selected ? theme.brandAccentSoft : 'transparent', paddingHorizontal: space.xs }}
    >
      {content}
    </PressableScale>
  );
}
