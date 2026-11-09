import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { ar } from '@/core/strings/ar';
import { BACK_ICON } from '@/core/layout/rtl';
import { space } from '@/core/theme/metrics';
import { AppText } from './AppText';
import { RoundIconButton } from './RoundIconButton';

interface Props {
  /** Centered title (sub screens). */
  title?: string;
  /** Show the round back button (sub screens). */
  back?: boolean;
  /** Content at the reading-start edge when there is no back button (e.g. child pill). */
  start?: React.ReactNode;
  /** Content at the reading-end edge (e.g. notifications bell). */
  end?: React.ReactNode;
}

const SLOT = 52;

/** Header: round back/start slot, centered title, round end slot. */
export function ScreenHeader({ title, back, start, end }: Props) {
  const router = useRouter();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.md, minHeight: SLOT }}>
      <View style={{ minWidth: SLOT, alignItems: 'flex-start', flexGrow: title ? 0 : 1 }}>
        {back ? (
          <RoundIconButton icon={BACK_ICON} label={ar.common.back} onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))} />
        ) : start}
      </View>
      {title ? <AppText variant="title" center numberOfLines={1} accessibilityRole="header" style={{ flex: 1 }}>{title}</AppText> : null}
      <View style={{ minWidth: SLOT, alignItems: 'flex-end' }}>{end}</View>
    </View>
  );
}
