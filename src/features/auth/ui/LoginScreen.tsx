import { Controller } from 'react-hook-form';
import { BrandMark, Button, Card, Reveal, Screen, Stack, Text, TextField } from '@/components/controllers';
import { BRAND } from '@/core/brand';
import { ar } from '@/core/strings/ar';
import { useLoginForm } from '../hooks/useLoginForm';

/** Ink canvas, big orange glow, logo + institute name, then a glass form card. */
export function LoginScreen() {
  const { form, needsCode, formError, submit, submitting } = useLoginForm();
  const { control, formState: { errors } } = form;

  return (
    <Screen canvas="ink" ambient="login" form>
      <Reveal index={0}>
        <Stack align="center" gap="md">
          <BrandMark size="xl" glow />
          <Text variant="title" align="center" accessibilityRole="header">{BRAND.name}</Text>
          <Text tone="muted" align="center">{ar.auth.subtitle}</Text>
        </Stack>
      </Reveal>
      <Reveal index={2} stretch>
        <Card variant="hero" padding="xl" gap="lg">
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
            <Stack accessibilityRole="alert" soft="danger" radius="md" padding="md">
              <Text variant="label" tone="danger">{formError}</Text>
            </Stack>
          ) : null}
          <Button label={ar.auth.submit} variant="accent" onPress={() => void submit()} loading={submitting} />
        </Card>
      </Reveal>
    </Screen>
  );
}
