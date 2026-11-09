import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { AppText } from '@/components/AppText';
import { MiniRing } from '@/components/MiniRing';
import { Sparkline } from '@/components/Sparkline';
import { nowHm, relativeDay } from '@/core/format/date';
import { formatMoney, formatNumber, formatPercent } from '@/core/format/number';
import { percentTone } from '@/core/format/status';
import type { Overview } from '@/core/api/types';
import { useIsFamily } from '@/core/auth/store';
import { ar } from '@/core/strings/ar';
import { space } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';
import { nextLesson, trendValues } from '../utils/home';
import { GridCard } from './GridCard';
import { SegmentBar } from './SegmentBar';

export function HomeGrid({ data }: { data: Overview }) {
  const router = useRouter();
  const theme = useTheme();
  const isFamily = useIsFamily();
  const { lessons } = data.today;
  const next = nextLesson(lessons, nowHm());
  const c = data.attendance30d;
  const avg = data.marks.averagePercent;
  const fin = data.finance;
  const upcoming = data.marks.upcoming;
  const tone = percentTone(avg);

  const scheduleText = lessons.length === 0
    ? ar.home.noLessons
    : `${formatNumber(lessons.length, 0)} ${ar.home.lessonsToday}${next ? `، ${ar.home.nextLesson}: ${next.lesson.subject} ${next.lesson.startTime}` : ''}`;

  const financeText = !fin || fin.currencies.every((x) => x.remaining === 0)
    ? ar.home.settled
    : `${ar.home.nextDue}: ${fin.nextDue ? `${formatMoney(fin.nextDue.amount, fin.nextDue.currency)} ${relativeDay(fin.nextDue.dueDate)}` : '—'}`;

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space.md }}>
      <GridCard icon="time" tone="info" title={ar.home.timetable} sentence={scheduleText} onPress={() => router.push('/timetable')}
        visual={<AppText variant="title" color="info">{formatNumber(lessons.length, 0)}</AppText>} />
      <GridCard icon="ribbon" tone="success" title={ar.home.marks}
        sentence={avg === null ? ar.marks.noAverage : `${ar.home.average} ${formatPercent(avg)}`}
        onPress={() => router.push('/marks')}
        visual={data.marks.latest.length > 1
          ? <Sparkline values={trendValues(data.marks.latest)} color={theme[tone === 'neutral' ? 'accent' : tone]} />
          : <MiniRing percent={avg} color={theme.success} />} />
      {isFamily && fin ? (
        <GridCard icon="wallet" tone="warning" title={ar.home.finance} sentence={financeText} onPress={() => router.push('/finance')}
          visual={
            <View style={{ gap: 2 }}>
              {fin.currencies.map((x) => (
                <AppText key={x.currency} variant="bodyStrong">{formatMoney(x.remaining, x.currency)}</AppText>
              ))}
            </View>
          } />
      ) : (
        <GridCard icon="document-text" tone="warning" title={ar.home.upcomingExams}
          sentence={upcoming.length ? `${upcoming[0].subject}، ${relativeDay(upcoming[0].date)}` : ar.home.noUpcoming}
          onPress={() => router.push('/marks')}
          visual={<AppText variant="title" color="warning">{formatNumber(upcoming.length, 0)}</AppText>} />
      )}
      <GridCard icon="calendar" tone="accent" title={ar.home.attendanceMonth} sentence={ar.home.thisMonth} onPress={() => router.push('/attendance')}
        visual={<SegmentBar present={c.present} late={c.late} absent={c.absent} excused={c.excused} />} />
    </View>
  );
}
