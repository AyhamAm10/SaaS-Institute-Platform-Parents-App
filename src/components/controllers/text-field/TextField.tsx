import { useState } from 'react';
import { Pressable, TextInput, View, type TextInputProps } from 'react-native';
import { ar } from '@/core/strings/ar';
import { HIT, radius, space, type } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';
import { Icon } from '../icon';
import { Stack } from '../layout';
import { Text } from '../text';

interface Props extends Omit<TextInputProps, 'style' | 'placeholderTextColor'> {
  label: string;
  error?: string;
  hint?: string;
  /** Adds a show/hide toggle for passwords. */
  password?: boolean;
}

/** Glass input with a label above; orange focus ring, red on error. */
export function TextField({ label, error, hint, password, ...input }: Props) {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(true);
  return (
    <Stack gap="xs" align="stretch">
      <Text variant="label" tone="secondary">{label}</Text>
      <View
        style={{
          minHeight: 56, flexDirection: 'row', alignItems: 'center', borderRadius: radius.lg, backgroundColor: theme.inputBg,
          borderWidth: 1.5, borderColor: error ? theme.dangerSolid : focused ? theme.inputFocusBorder : theme.inputBorder,
          paddingStart: space.lg, boxShadow: focused ? `0 0 0 4px ${theme.brandAccentRing}` : undefined,
        }}
      >
        <TextInput
          {...input}
          accessibilityLabel={label}
          secureTextEntry={password && hidden}
          onFocus={(e) => { setFocused(true); input.onFocus?.(e); }}
          onBlur={(e) => { setFocused(false); input.onBlur?.(e); }}
          placeholderTextColor={theme.inputPlaceholder}
          style={{ flex: 1, minHeight: 54, color: theme.textPrimary, ...type.body, textAlign: 'right', writingDirection: 'rtl' }}
        />
        {password ? (
          <Pressable
            accessibilityRole="button" accessibilityLabel={hidden ? ar.auth.show : ar.auth.hide} onPress={() => setHidden((v) => !v)}
            style={{ width: HIT + 4, height: HIT + 4, alignItems: 'center', justifyContent: 'center' }}
          >
            <Icon name={hidden ? 'eye' : 'eye-off'} tone="muted" duotone={false} />
          </Pressable>
        ) : null}
      </View>
      {error ? <Text variant="caption" tone="danger" accessibilityLiveRegion="polite">{error}</Text>
        : hint ? <Text variant="caption" tone="muted">{hint}</Text> : null}
    </Stack>
  );
}
