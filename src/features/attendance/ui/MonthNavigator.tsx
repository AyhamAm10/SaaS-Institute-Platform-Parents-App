import { BACK_ICON, FORWARD_ICON, IconButton, Row, Stack, Text } from '@/components/controllers';
import { addMonths, compareMonths, monthKeyOf, monthLabel } from '@/core/format/month';
import { ar } from '@/core/strings/ar';

interface Props { month: string; onChange: (month: string) => void }

export function MonthNavigator({ month, onChange }: Props) {
  const isCurrent = compareMonths(month, monthKeyOf()) >= 0;
  return (
    <Row justify="between">
      <IconButton icon={BACK_ICON} label={ar.attendance.prevMonth} onPress={() => onChange(addMonths(month, -1))} />
      <Stack align="center">
        <Text variant="title" accessibilityRole="header" accessibilityLiveRegion="polite">{monthLabel(month)}</Text>
      </Stack>
      <IconButton icon={FORWARD_ICON} label={ar.attendance.nextMonth} disabled={isCurrent} onPress={() => onChange(addMonths(month, 1))} />
    </Row>
  );
}
