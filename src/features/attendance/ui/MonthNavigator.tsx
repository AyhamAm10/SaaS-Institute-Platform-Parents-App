import { View } from 'react-native';
import { AppText } from '@/components/AppText';
import { RoundIconButton } from '@/components/RoundIconButton';
import { addMonths, compareMonths, monthKeyOf, monthLabel } from '@/core/format/month';
import { BACK_ICON, FORWARD_ICON } from '@/core/layout/rtl';
import { ar } from '@/core/strings/ar';

interface Props { month: string; onChange: (month: string) => void }

export function MonthNavigator({ month, onChange }: Props) {
  const isCurrent = compareMonths(month, monthKeyOf()) >= 0;
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <RoundIconButton icon={BACK_ICON} label={ar.attendance.prevMonth} onPress={() => onChange(addMonths(month, -1))} />
      <AppText variant="title" accessibilityRole="header" accessibilityLiveRegion="polite">{monthLabel(month)}</AppText>
      <View style={{ opacity: isCurrent ? 0.35 : 1 }} pointerEvents={isCurrent ? 'none' : 'auto'}>
        <RoundIconButton icon={FORWARD_ICON} label={ar.attendance.nextMonth} onPress={() => onChange(addMonths(month, 1))} />
      </View>
    </View>
  );
}
