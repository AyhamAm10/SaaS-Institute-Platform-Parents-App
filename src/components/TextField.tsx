import { useState } from 'react';
import { Pressable, TextInput, View, type TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ar } from '@/core/strings/ar';
import { HIT, radius, space, type } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';
import { AppText } from './AppText';

interface Props extends Omit<TextInputProps, 'style'> {
  label: string;
  error?: string;
  hint?: string;
  /** Adds a show/hide toggle for passwords. */
  password?: boolean;
}

export function TextField({ label, error, hint, password, ...input }: Props) {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(true);
  return (
    <View style={{ gap: space.xs + 2 }}>
      <AppText variant="captionStrong">{label}</AppText>
      <View
        style={{
          minHeight: 56, flexDirection: 'row', alignItems: 'center', borderRadius: radius.md, backgroundColor: theme.surface,
          borderWidth: 1.5, borderColor: error ? theme.danger : focused ? theme.accent : theme.border, paddingStart: space.lg,
        }}
      >
        <TextInput
          {...input}
          accessibilityLabel={label}
          secureTextEntry={password && hidden}
          onFocus={(e) => { setFocused(true); input.onFocus?.(e); }}
          onBlur={(e) => { setFocused(false); input.onBlur?.(e); }}
          placeholderTextColor={theme.textMuted}
          style={{ flex: 1, minHeight: 54, color: theme.text, fontSize: type.body.fontSize, textAlign: 'right', writingDirection: 'rtl' }}
        />
        {password ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={hidden ? ar.auth.show : ar.auth.hide}
            onPress={() => setHidden((v) => !v)}
            style={{ width: HIT + 4, height: HIT + 4, alignItems: 'center', justifyContent: 'center' }}
          >
            <Ionicons name={hidden ? 'eye-outline' : 'eye-off-outline'} size={22} color={theme.textMuted} />
          </Pressable>
        ) : null}
      </View>
      {error ? <AppText variant="caption" color="danger" accessibilityLiveRegion="polite">{error}</AppText>
        : hint ? <AppText variant="caption" color="textMuted">{hint}</AppText> : null}
    </View>
  );
}
