import { Controller } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { TextField } from '@/components/TextField';
import { ar } from '@/core/strings/ar';
import { MAX_WIDTH, space } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';
import { useLoginForm } from '../hooks/useLoginForm';

export function LoginScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { form, needsCode, formError, submit, submitting } = useLoginForm();
  const { control, formState: { errors } } = form;

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1, justifyContent: 'center', alignSelf: 'center', width: '100%', maxWidth: MAX_WIDTH,
          padding: space.lg, paddingTop: insets.top + space.xl, paddingBottom: insets.bottom + space.xl, gap: space.xxl,
        }}
      >
        <View style={{ alignItems: 'center', gap: space.md }}>
          <View style={{ width: 84, height: 84, borderRadius: 30, backgroundColor: theme.accent, alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="school" size={44} color={theme.onAccent} />
          </View>
          <AppText variant="title" accessibilityRole="header">{ar.auth.title}</AppText>
          <AppText color="textMuted" center>{ar.auth.subtitle}</AppText>
        </View>
        <Card style={{ gap: space.lg }}>
          <Controller control={control} name="phone" render={({ field }) => (
            <TextField label={ar.auth.phone} value={field.value} onChangeText={field.onChange} onBlur={field.onBlur}
              keyboardType="phone-pad" textContentType="telephoneNumber" autoComplete="tel" returnKeyType="next" error={errors.phone?.message} />
          )} />
          <Controller control={control} name="password" render={({ field }) => (
            <TextField label={ar.auth.password} value={field.value} onChangeText={field.onChange} onBlur={field.onBlur} password
              textContentType="password" autoComplete="current-password" autoCapitalize="none" returnKeyType={needsCode ? 'next' : 'go'}
              onSubmitEditing={needsCode ? undefined : submit} error={errors.password?.message} />
          )} />
          {needsCode ? (
            <Controller control={control} name="instituteCode" render={({ field }) => (
              <TextField label={ar.auth.instituteCode} hint={ar.auth.instituteCodeHint} value={field.value ?? ''} onChangeText={field.onChange}
                onBlur={field.onBlur} autoCapitalize="characters" returnKeyType="go" onSubmitEditing={submit} error={errors.instituteCode?.message} />
            )} />
          ) : null}
          {formError ? (
            <View accessibilityRole="alert" style={{ backgroundColor: theme.tints.danger, borderRadius: 16, padding: space.md }}>
              <AppText variant="captionStrong" color="danger">{formError}</AppText>
            </View>
          ) : null}
          <Button label={ar.auth.submit} onPress={() => void submit()} loading={submitting} />
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
