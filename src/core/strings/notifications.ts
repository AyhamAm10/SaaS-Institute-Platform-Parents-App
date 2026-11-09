export const notifications = {
  title: 'الإشعارات',
  empty: 'لا إشعارات حالياً',
  emptyHint: 'ستصلك هنا تنبيهات الحضور والعلامات والمدفوعات',
  placeholder: 'بيانات تجريبية: الإشعارات غير مفعّلة بعد',
  unreadOnly: 'غير المقروءة فقط',
  markAllRead: 'تحديد الكل كمقروء',
  types: {
    absence: 'غياب',
    late: 'تأخر',
    mark: 'علامة جديدة',
    payment: 'دفعة مستلمة',
    installment: 'قسط مستحق',
    exam: 'مذاكرة قريبة',
    announcement: 'إعلان',
  },
  prefs: {
    attendance: 'تنبيهات الحضور',
    marks: 'العلامات الجديدة',
    payments: 'المدفوعات والأقساط',
    announcements: 'إعلانات المعهد',
  },
} as const;
