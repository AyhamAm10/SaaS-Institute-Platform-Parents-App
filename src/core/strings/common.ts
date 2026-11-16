export const common = {
  appName: 'المعهد',
  retry: 'إعادة المحاولة',
  cancel: 'إلغاء',
  close: 'إغلاق',
  back: 'رجوع',
  ok: 'حسناً',
  loading: 'جارٍ التحميل',
  seeAll: 'عرض الكل',
  noData: 'لا توجد بيانات',
  today: 'اليوم',
  tomorrow: 'غداً',
  yesterday: 'أمس',
  min: 'د',
  percent: '٪',
} as const;

export const errors = {
  generic: 'حدث خطأ غير متوقع. حاول مرة أخرى.',
  network: 'تعذر الاتصال بالخادم. تحقق من الإنترنت ثم أعد المحاولة.',
  invalidCredentials: 'رقم الهاتف أو كلمة المرور غير صحيحة.',
  instituteCodeRequired: 'هذا الرقم مسجل في أكثر من معهد. أدخل رمز المعهد للمتابعة.',
  sessionExpired: 'انتهت الجلسة. سجّل الدخول من جديد.',
  currentPasswordWrong: 'كلمة المرور الحالية غير صحيحة.',
  passwordSameAsDefault: 'اختر كلمة مرور مختلفة عن الافتراضية.',
  forbidden: 'ليس لديك صلاحية لعرض هذه البيانات.',
  notFound: 'لم يتم العثور على البيانات المطلوبة.',
  tooMany: 'محاولات كثيرة. انتظر قليلاً ثم أعد المحاولة.',
  server: 'الخادم غير متاح حالياً. حاول لاحقاً.',
  loadFailed: 'تعذر تحميل البيانات',
} as const;

export const attendanceStatus = {
  PRESENT: 'حاضر',
  LATE: 'متأخر',
  ABSENT: 'غائب',
  EXCUSED: 'بعذر',
  NONE: 'لم يُسجَّل',
} as const;

export const currency = { SYP: 'ل.س', USD: '$' } as const;

export const weekdays = {
  SUNDAY: 'الأحد',
  MONDAY: 'الاثنين',
  TUESDAY: 'الثلاثاء',
  WEDNESDAY: 'الأربعاء',
  THURSDAY: 'الخميس',
  FRIDAY: 'الجمعة',
  SATURDAY: 'السبت',
} as const;

export const months = [
  'كانون الثاني', 'شباط', 'آذار', 'نيسان', 'أيار', 'حزيران',
  'تموز', 'آب', 'أيلول', 'تشرين الأول', 'تشرين الثاني', 'كانون الأول',
] as const;

export const weekdaysShort = ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'] as const;

export const paymentMethods = { CASH: 'نقداً', BANK_TRANSFER: 'تحويل بنكي', OTHER: 'أخرى' } as const;
