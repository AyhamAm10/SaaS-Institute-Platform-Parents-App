import { useMemo, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { isInstituteCodeRequired, toArabicMessage } from '@/core/api/errors';
import { signIn } from '@/core/auth/actions';
import { ar } from '@/core/strings/ar';
import { successHaptic } from '@/core/layout/haptics';
import { loginSchema, normalizeDigits, type LoginValues } from '../utils/schema';

export function useLoginForm() {
  const [needsCode, setNeedsCode] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const resolver = useMemo(() => yupResolver(loginSchema(needsCode)), [needsCode]);
  const form = useForm<LoginValues>({
    resolver,
    defaultValues: { phone: '', password: '', instituteCode: '' },
    mode: 'onSubmit',
  });

  const submit = form.handleSubmit(async (values) => {
    setFormError(null);
    try {
      await signIn({ ...values, phone: normalizeDigits(values.phone) });
      successHaptic();
    } catch (error) {
      if (isInstituteCodeRequired(error)) {
        setNeedsCode(true);
        setFormError(ar.errors.instituteCodeRequired);
      } else {
        setFormError(toArabicMessage(error));
      }
    }
  });

  return { form, needsCode, formError, submit, submitting: form.formState.isSubmitting };
}
