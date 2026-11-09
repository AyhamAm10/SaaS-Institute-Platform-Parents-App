import type { Child, MobileMe } from '../types';

const institute = {
  id: 1,
  name: 'معهد النور التعليمي',
  logoUrl: null,
  primaryColor: '#1a73e8',
  secondaryColor: '#34a853',
  phone: '0112223344',
  address: 'دمشق، المزة، شارع الجلاء',
};

const branch = { id: 1, name: 'فرع المزة' };

export const children: Child[] = [
  { id: 11, fullName: 'سارة أحمد الخطيب', gender: 'FEMALE', section: { id: 1, name: 'التاسع - أ' }, branch, statusName: 'مستمر' },
  { id: 12, fullName: 'عمر أحمد الخطيب', gender: 'MALE', section: { id: 2, name: 'الخامس - ب' }, branch, statusName: 'مستمر' },
];

export const familyMe: MobileMe = {
  role: 'FAMILY',
  userId: 101,
  phone: '0911111111',
  displayName: 'أحمد الخطيب',
  institute,
  children,
};

export const studentMe: MobileMe = {
  role: 'STUDENT',
  userId: 102,
  phone: '0922222222',
  displayName: 'سارة أحمد الخطيب',
  institute,
  children: [children[0]],
};
