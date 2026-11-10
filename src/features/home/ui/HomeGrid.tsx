import { useRouter } from 'expo-router';
import { Grid, MiniRing, Reveal, Sparkline, StatTile, Text } from '@/components/controllers';
import type { Overview } from '@/core/api/types';
import { useIsFamily } from '@/core/auth/store';
import { nowHm, relativeDay } from '@/core/format/date';
import { formatNumber, formatPercent } from '@/core/format/number';
import { percentTone } from '@/core/format/status';
import { ar } from '@/core/strings/ar';
import { financeSentence, nextLesson, scheduleSentence, trendValues } from '../utils/home';
import { FinanceVisual } from './FinanceVisual';
import { SegmentBar } from './SegmentBar';

/** 2-column grid of tinted tiles: timetable, marks, finance (guardian) or exams (student), month attendance. */
export function HomeGrid({ data }: { data: Overview }) {
  const router = useRouter();
  const isFamily = useIsFamily();
  const { lessons } = data.today;
  const next = nextLesson(lessons, nowHm());
  const c = data.attendance30d;
  const avg = data.marks.averagePercent;
  const fin = data.finance;
  const upcoming = data.marks.upcoming;
  const tone = percentTone(avg);

  return (
    <Grid>
      <Reveal index={2} fill>
        <StatTile icon="time" tone="accent" title={ar.home.timetable} sentence={scheduleSentence(lessons, next)} onPress={() => router.push('/timetable')}
          visual={<Text variant="number" tone="accent">{formatNumber(lessons.length, 0)}</Text>} />
      </Reveal>
      <Reveal index={3} fill>
        <StatTile icon="ribbon" tone="success" title={ar.home.marks}
          sentence={avg === null ? ar.marks.noAverage : `${ar.home.average} ${formatPercent(avg)}`} onPress={() => router.push('/marks')}
          visual={data.marks.latest.length > 1
            ? <Sparkline values={trendValues(data.marks.latest)} tone={tone === 'neutral' ? 'accent' : tone} />
            : <MiniRing percent={avg} tone="success" />} />
      </Reveal>
      <Reveal index={4} fill>
        {isFamily && fin ? (
          <StatTile icon="wallet" tone="info" title={ar.home.finance} sentence={financeSentence(fin)} onPress={() => router.push('/finance')}
            visual={<FinanceVisual finance={fin} />} />
        ) : (
          <StatTile icon="document-text" tone="danger" title={ar.home.upcomingExams}
            sentence={upcoming.length ? `${upcoming[0].subject}، ${relativeDay(upcoming[0].date)}` : ar.home.noUpcoming}
            onPress={() => router.push('/marks')}
            visual={<Text variant="number" tone="danger">{formatNumber(upcoming.length, 0)}</Text>} />
        )}
      </Reveal>
      <Reveal index={5} fill>
        <StatTile icon="calendar" tone="warning" title={ar.home.attendanceMonth} sentence={ar.home.thisMonth} onPress={() => router.push('/attendance')}
          visual={<SegmentBar present={c.present} late={c.late} absent={c.absent} excused={c.excused} />} />
      </Reveal>
    </Grid>
  );
}
