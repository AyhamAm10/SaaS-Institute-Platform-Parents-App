import { View } from 'react-native';
import { HIT, radius } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';
import { PressableScale } from '../_shared/PressableScale';
import { Icon, type IconName } from '../icon';

interface Props {
  icon: IconName;
  label: string;
  onPress: () => void;
  variant?: 'glass' | 'ink';
  /** Small orange dot (unread). */
  dot?: boolean;
  disabled?: boolean;
}

/** Round 48pt icon button. Glass by default, ink for emphasis. */
export function IconButton({ icon, label, onPress, variant = 'glass', dot, disabled }: Props) {
  const theme = useTheme();
  const ink = variant === 'ink';
  const size = HIT + 4;
  return (
    <PressableScale
      label={label} onPress={onPress} disabled={disabled} hitSlop={4} outer={{ opacity: disabled ? 0.35 : 1 }}
      inner={{
        width: size, height: size, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center',
        backgroundColor: ink ? theme.fab : theme.glassBgStrong, borderWidth: 1,
        borderColor: ink ? theme.brandAccentRing : theme.glassBorder, boxShadow: theme.elev1,
      }}
    >
      <Icon name={icon} tone={ink ? 'inverse' : 'primary'} />
      {dot ? (
        <View
          style={{
            position: 'absolute', top: 11, end: 12, width: 10, height: 10, borderRadius: 5,
            backgroundColor: theme.brandAccent, borderWidth: 2, borderColor: theme.surfaceSolid,
          }}
        />
      ) : null}
    </PressableScale>
  );
}
