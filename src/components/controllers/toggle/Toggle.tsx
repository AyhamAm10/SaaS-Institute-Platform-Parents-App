import { Pressable, View } from 'react-native';
import { useTheme } from '@/core/theme/ThemeProvider';

interface Props { value: boolean; onChange: (value: boolean) => void; label: string }

const TRACK_W = 52;
const TRACK_H = 30;
const THUMB = 24;
const PAD = 3;

/**
 * On/off switch drawn by hand so web, iOS and Android look identical: orange track + white thumb when on,
 * neutral track when off. `justifyContent` flips with the layout direction, so it is RTL-safe.
 */
export function Toggle({ value, onChange, label }: Props) {
  const theme = useTheme();
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityLabel={label}
      accessibilityState={{ checked: value }}
      hitSlop={8}
      onPress={() => onChange(!value)}
      style={{
        width: TRACK_W, height: TRACK_H, borderRadius: TRACK_H / 2, padding: PAD, flexDirection: 'row',
        justifyContent: value ? 'flex-end' : 'flex-start', alignItems: 'center',
        backgroundColor: value ? theme.brandAccent : theme.track,
      }}
    >
      <View style={{ width: THUMB, height: THUMB, borderRadius: THUMB / 2, backgroundColor: '#FFFFFF', boxShadow: theme.elev1 }} />
    </Pressable>
  );
}
