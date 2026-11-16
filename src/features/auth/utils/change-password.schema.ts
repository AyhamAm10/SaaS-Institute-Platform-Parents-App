import * as yup from 'yup';
import { ar } from '@/core/strings/ar';

/** The password every new or reset account starts with: never accepted as the new one. */
export const DEFAULT_PASSWORD = '12345678';
export const PASSWORD_MIN = 8;

export interface ChangePasswordValues { currentPassword: string; newPassword: string; confirmPassword: string }

export const changePasswordSchema: yup.ObjectSchema<ChangePasswordValues> = yup.object({
  currentPassword: yup.string().required(ar.auth.currentRequired),
  newPassword: yup
    .string()
    .required(ar.auth.passwordShort)
    .min(PASSWORD_MIN, ar.auth.passwordShort)
    .notOneOf([DEFAULT_PASSWORD], ar.auth.passwordIsDefault),
  confirmPassword: yup
    .string()
    .required(ar.auth.passwordMismatch)
    .oneOf([yup.ref('newPassword')], ar.auth.passwordMismatch),
});
