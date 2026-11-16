import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toArabicMessage } from '@/core/api/errors';
import { changePasswordAndContinue } from '@/core/auth/actions';
import { successHaptic } from '@/core/layout/haptics';
import { changePasswordSchema, type ChangePasswordValues } from '../utils/change-password.schema';

/** The forced first step on the default password; on success the session store flips and the gate leaves the screen. */
export function useChangePasswordForm() {
  const [formError, setFormError] = useState<string | null>(null);
  const form = useForm<ChangePasswordValues>({
    resolver: yupResolver(changePasswordSchema),
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
    mode: 'onSubmit',
  });

  const submit = form.handleSubmit(async ({ currentPassword, newPassword }) => {
    setFormError(null);
    try {
      await changePasswordAndContinue({ currentPassword, newPassword });
      successHaptic();
    } catch (error) {
      setFormError(toArabicMessage(error));
    }
  });

  return { form, formError, submit, submitting: form.formState.isSubmitting };
}
