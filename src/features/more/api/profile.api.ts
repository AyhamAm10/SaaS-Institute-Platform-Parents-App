import { get } from '@/core/api/client';
import type { Profile } from '@/core/api/types';

export const fetchProfile = (studentId: number) => get<Profile>(`/mobile/students/${studentId}/profile`);
