import * as yup from 'yup';
import { ar } from '@/core/strings/ar';

/** Converts Arabic-Indic and Persian digits to Western digits (keyboards may type either). */
export function normalizeDigits(value: string): string {
  return value
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0));
}

export interface LoginValues { phone: string; password: string; instituteCode?: string }

export function loginSchema(needsCode: boolean): yup.ObjectSchema<LoginValues> {
  return yup.object({
    phone: yup
      .string()
      .required(ar.auth.phoneRequired)
      .transform((v: string) => normalizeDigits(v ?? '').replace(/[\s-]/g, ''))
      .matches(/^\+?\d{7,15}$/, ar.auth.phoneInvalid),
    password: yup.string().required(ar.auth.passwordRequired),
    instituteCode: needsCode
      ? yup.string().trim().required(ar.auth.codeRequired)
      : yup.string().trim().optional(),
  });
}
