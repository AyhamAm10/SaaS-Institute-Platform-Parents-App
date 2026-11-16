import { Controller } from 'react-hook-form';
import { BrandMark, Button, Card, Reveal, Screen, Stack, Text, TextField } from '@/components/controllers';
import { signOut } from '@/core/auth/actions';
import { ar } from '@/core/strings/ar';
import { useChangePasswordForm } from '../hooks/useChangePasswordForm';

/** First step on a default password: same ink canvas as the login, three password fields on a glass card. */
export function ChangePasswordScreen() {
  const { form, formError, submit, submitting } = useChangePasswordForm();
  const { control, formState: { errors } } = form;

  return (
    <Screen canvas="ink" ambient="login" form>
      <Reveal index={0}>
        <Stack align="center" gap="md">
          <BrandMark size="xl" glow />
          <Text variant="title" align="center" accessibilityRole="header">{ar.auth.changeTitle}</Text>
          <Text tone="muted" align="center">{ar.auth.changeSubtitle}</Text>
        </Stack>
      </Reveal>
      <Reveal index={2} stretch>
        <Card variant="hero" padding="xl" gap="lg">
          <Controller control={control} name="currentPassword" render={({ field }) => (
            <TextField label={ar.auth.currentPassword} value={field.value} onChangeText={field.onChange} onBlur={field.onBlur} password
              autoCapitalize="none" returnKeyType="next" error={errors.currentPassword?.message} />
          )} />
          <Controller control={control} name="newPassword" render={({ field }) => (
            <TextField label={ar.auth.newPassword} value={field.value} onChangeText={field.onChange} onBlur={field.onBlur} password
              textContentType="newPassword" autoCapitalize="none" returnKeyType="next" error={errors.newPassword?.message} />
          )} />
          <Controller control={control} name="confirmPassword" render={({ field }) => (
            <TextField label={ar.auth.confirmPassword} value={field.value} onChangeText={field.onChange} onBlur={field.onBlur} password
              textContentType="newPassword" autoCapitalize="none" returnKeyType="go" onSubmitEditing={submit}
              error={errors.confirmPassword?.message} />
          )} />
          {formError ? (
            <Stack accessibilityRole="alert" soft="danger" radius="md" padding="md">
              <Text variant="label" tone="danger">{formError}</Text>
            </Stack>
          ) : null}
          <Button label={ar.auth.changeSubmit} variant="accent" onPress={() => void submit()} loading={submitting} />
          <Button label={ar.auth.signOut} variant="ghost" onPress={() => void signOut()} />
        </Card>
      </Reveal>
    </Screen>
  );
}
