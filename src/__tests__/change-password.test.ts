import { ar } from '@/core/strings/ar';
import { toArabicMessage } from '@/core/api/errors';
import { DEFAULT_PASSWORD, changePasswordSchema } from '@/features/auth/utils/change-password.schema';

const values = (over = {}) => ({ currentPassword: DEFAULT_PASSWORD, newPassword: 'new-password-1', confirmPassword: 'new-password-1', ...over });
const errorsOf = async (v: object) => {
  try {
    await changePasswordSchema.validate(v, { abortEarly: false });
    return [];
  } catch (e) {
    return (e as { errors: string[] }).errors;
  }
};

describe('forced password change', () => {
  it('accepts a valid new password', async () => {
    expect(await errorsOf(values())).toEqual([]);
  });
  it('asks for the current password, a long enough new one and a matching confirmation', async () => {
    expect(await errorsOf(values({ currentPassword: '' }))).toContain(ar.auth.currentRequired);
    expect(await errorsOf(values({ newPassword: 'short', confirmPassword: 'short' }))).toContain(ar.auth.passwordShort);
    expect(await errorsOf(values({ confirmPassword: 'other-password' }))).toContain(ar.auth.passwordMismatch);
  });
  it('refuses the default password as the new one', async () => {
    expect(await errorsOf(values({ newPassword: DEFAULT_PASSWORD, confirmPassword: DEFAULT_PASSWORD }))).toContain(ar.auth.passwordIsDefault);
  });
  it('maps the backend text of a wrong current password', () => {
    const wrong = { isAxiosError: true, response: { status: 401, data: { message: 'The current password is incorrect' } } };
    expect(toArabicMessage(wrong)).toBe(ar.errors.currentPasswordWrong);
  });
});
