import type { Profile } from '../types';

export function profileFor(studentId: number, isFamily: boolean): Profile {
  const sara = studentId === 11;
  return {
    fullName: sara ? 'سارة أحمد الخطيب' : 'عمر أحمد الخطيب',
    gender: sara ? 'FEMALE' : 'MALE',
    birthDate: sara ? '2011-04-12' : '2015-09-03',
    section: { id: sara ? 1 : 2, name: sara ? 'التاسع - أ' : 'الخامس - ب' },
    branch: { id: 1, name: 'فرع المزة' },
    statusName: 'مستمر',
    bus: { name: 'باص رقم 4 - المزة', driverName: 'أبو محمد', driverPhone: '0933445566' },
    family: isFamily ? { familyName: 'عائلة الخطيب', phone: '0911111111' } : null,
    institute: { name: 'معهد النور التعليمي', phone: '0112223344', address: 'دمشق، المزة، شارع الجلاء' },
  };
}
