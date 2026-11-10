import type { TextProps } from 'react-native';
import type { ColorRole } from '@/core/theme/roles';
import type { TypeVariant } from '@/core/theme/metrics';

export type TextVariant = TypeVariant;
export type TextTone = ColorRole;

export interface AppTextProps extends Omit<TextProps, 'style'> {
  variant?: TextVariant;
  tone?: TextTone;
  align?: 'start' | 'center' | 'end';
  strike?: boolean;
  /** Fixed width digits for numbers that change (counters). */
  tabular?: boolean;
}
