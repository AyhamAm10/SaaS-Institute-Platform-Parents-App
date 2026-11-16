import type { Currency, CurrencyTotals, Gender, IdName, InstallmentStatus } from './base';
export interface Installment {
  id: number;
  number: number;
  dueDate: string;
  amount: number;
  paid: number;
  remaining: number;
  status: InstallmentStatus;
}

export interface Contract {
  id: number;
  yearName: string;
  currency: Currency;
  total: number;
  discount: number;
  paid: number;
  remaining: number;
  installments: Installment[];
}

export interface PaymentRow {
  id: number;
  receiptNumber: string;
  date: string;
  amount: number;
  currency: Currency;
  method: string;
  status: 'ACTIVE' | 'CANCELLED';
}

export interface Finance {
  totals: CurrencyTotals[];
  contracts: Contract[];
  payments: PaymentRow[];
}

export interface Profile {
  fullName: string;
  gender: Gender;
  birthDate: string | null;
  section: IdName | null;
  branch: IdName;
  statusName: string | null;
  bus: { name: string; driverName: string | null; driverPhone: string | null } | null;
  family: null | { familyName: string; phone: string | null };
  institute: { name: string; phone: string | null; address: string | null };
}

export interface AuthTokens { accessToken: string; refreshToken: string }
/** `mustChangePassword`: still on the default password, only the change-password call works. */
export interface LoginResponse extends AuthTokens { user: { id: number; role: string; mustChangePassword?: boolean } }
export interface ChangePasswordInput { currentPassword: string; newPassword: string }
/** The part of GET /auth/me needed before the mobile profile can be read. */
export interface AccountState { mustChangePassword: boolean }
export interface LoginInput { phone: string; password: string; instituteCode?: string }
