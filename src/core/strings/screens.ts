export const tabs = {
  home: 'الرئيسية',
  attendance: 'الحضور',
  marks: 'العلامات',
  more: 'المزيد',
  quick: 'إجراءات سريعة',
} as const;

export const quick = {
  title: 'إجراءات سريعة',
  switchChild: 'تبديل الطالب',
  timetable: 'برنامج الدوام',
  finance: 'المالية',
  notes: 'ملاحظات الإدارة',
  notifications: 'الإشعارات',
  contact: 'الاتصال بالمعهد',
} as const;

export const home = {
  greeting: 'مرحباً',
  heroCaption: 'نسبة الحضور خلال آخر 30 يوماً',
  present: 'حاضر',
  late: 'متأخر',
  absent: 'غائب',
  checkIn: 'الوصول',
  checkOut: 'المغادرة',
  leftAt: 'غادر المعهد',
  todayStatus: 'حالة اليوم',
  notWorkingDay: 'اليوم عطلة رسمية',
  timetable: 'البرنامج',
  lessonsToday: 'حصص اليوم',
  nextLesson: 'التالية',
  noLessons: 'لا حصص اليوم',
  marks: 'العلامات',
  average: 'المعدل',
  finance: 'المالية',
  remaining: 'المتبقي',
  nextDue: 'الاستحقاق القادم',
  settled: 'لا مبالغ مستحقة',
  upcomingExams: 'المذاكرات القادمة',
  noUpcoming: 'لا مذاكرات قريبة',
  attendanceMonth: 'الحضور',
  thisMonth: 'ملخص آخر 30 يوماً',
  rateUnknown: 'لا بيانات',
} as const;

export const attendance = {
  title: 'الحضور',
  rate: 'نسبة الحضور',
  absencesAndLates: 'الغيابات والتأخرات',
  none: 'لا غيابات ولا تأخرات هذا الشهر',
  empty: 'لا سجلات حضور لهذا الشهر',
  prevMonth: 'الشهر السابق',
  nextMonth: 'الشهر التالي',
  details: 'تفاصيل اليوم',
  note: 'ملاحظة',
  noNote: 'لا ملاحظات',
  excusedLabel: 'بعذر',
} as const;

export const timetable = {
  title: 'برنامج الدوام',
  empty: 'لا يوجد برنامج دوام بعد',
  emptyHint: 'سيظهر هنا عند إسناد الطالب إلى شعبة',
  emptyDay: 'لا حصص في هذا اليوم',
  teacher: 'المدرّس',
  room: 'القاعة',
} as const;

export const marks = {
  title: 'العلامات',
  overall: 'المعدل العام',
  subjects: 'المواد',
  upcoming: 'المذاكرات القادمة',
  empty: 'لا علامات بعد',
  noAverage: 'لا معدل بعد',
  absent: 'غائب',
  pending: 'بانتظار العلامة',
  noUpcoming: 'لا مذاكرات قادمة',
  exams: 'مذاكرات',
} as const;

export const notes = {
  title: 'ملاحظات الإدارة',
  empty: 'لا ملاحظات من الإدارة',
  emptyHint: 'ستظهر هنا أي ملاحظة ترسلها إدارة المعهد',
} as const;

export const finance = {
  title: 'المالية',
  summary: 'ملخص الرصيد',
  total: 'الإجمالي',
  paid: 'المدفوع',
  remaining: 'المتبقي',
  overdue: 'متأخر',
  contracts: 'العقود والأقساط',
  discount: 'الحسم',
  installment: 'القسط',
  payments: 'الدفعات',
  receipt: 'إيصال',
  empty: 'لا بيانات مالية',
  noPayments: 'لا دفعات مسجلة',
  share: 'مشاركة الملخص',
  statement: 'كشف حساب',
  cancelledPayment: 'ملغاة',
  PAID: 'مدفوع',
  PARTIAL: 'جزئي',
  DUE: 'قادم',
  OVERDUE: 'متأخر',
  CANCELLED: 'ملغى',
} as const;

export const more = {
  title: 'المزيد',
  profile: 'ملف الطالب',
  section: 'الشعبة',
  branch: 'الفرع',
  status: 'الحالة',
  birth: 'تاريخ الميلاد',
  bus: 'الباص',
  driver: 'السائق',
  callDriver: 'اتصال بالسائق',
  institute: 'المعهد',
  call: 'اتصال',
  whatsapp: 'واتساب',
  address: 'العنوان',
  noContact: 'لا بيانات تواصل',
  appearance: 'المظهر',
  appearanceNote: 'اختر مظهر التطبيق أو اتبع إعداد الجهاز',
  schemeSystem: 'الجهاز',
  schemeLight: 'فاتح',
  schemeDark: 'داكن',
  prefs: 'تفضيلات الإشعارات',
  prefsNote: 'تُحفظ لحسابك وتسري على كل أجهزتك',
  switchChild: 'تبديل الطالب',
  about: 'حول التطبيق',
  version: 'الإصدار',
  logout: 'تسجيل الخروج',
  logoutTitle: 'تسجيل الخروج',
  logoutMessage: 'هل تريد تسجيل الخروج من التطبيق؟',
  account: 'الحساب',
} as const;

export const children = {
  pick: 'اختر الطالب',
  switchLabel: 'تبديل الطالب',
} as const;
