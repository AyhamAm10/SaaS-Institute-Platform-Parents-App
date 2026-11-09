import { attendanceStatus, common, currency, errors, months, paymentMethods, weekdays, weekdaysShort } from './common';
import { notifications } from './notifications';
import { auth } from './auth';
import { attendance, children, finance, home, marks, more, quick, tabs, timetable } from './screens';

/** The single Arabic strings module: every user-facing string lives under `ar`. */
export const ar = {
  common, errors, attendanceStatus, currency, weekdays, weekdaysShort, months, paymentMethods,
  auth, tabs, quick, home, attendance, timetable, marks, finance, more, children, notifications,
} as const;
