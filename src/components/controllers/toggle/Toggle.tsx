import { Switch } from 'react-native';
import { useTheme } from '@/core/theme/ThemeProvider';

interface Props { value: boolean; onChange: (value: boolean) => void; label: string }

/** On/off switch in brand colors (orange when on). */
export function Toggle({ value, onChange, label }: Props) {
  const theme = useTheme();
  return (
    <Switch
      value={value}
      onValueChange={onChange}
      accessibilityLabel={label}
      trackColor={{ true: theme.brandAccent, false: theme.track }}
      thumbColor={theme.surfaceSolid}
    />
  );
}
