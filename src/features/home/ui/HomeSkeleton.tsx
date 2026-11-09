import { View } from 'react-native';
import { Card } from '@/components/Card';
import { Skeleton } from '@/components/Skeleton';
import { space } from '@/core/theme/metrics';

export function HomeSkeleton() {
  return (
    <View style={{ gap: space.lg }} aria-hidden>
      <Card style={{ gap: space.xl, alignItems: 'center' }}>
        <Skeleton width={208} height={208} round={104} />
        <View style={{ flexDirection: 'row', gap: space.lg, width: '100%' }}>
          {[0, 1, 2].map((i) => <Skeleton key={i} height={28} style={{ flex: 1 }} />)}
        </View>
      </Card>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space.md }}>
        {[0, 1, 2, 3].map((i) => (
          <Card key={i} padding={space.lg} style={{ flexBasis: '47%', flexGrow: 1, minHeight: 176, gap: space.md }}>
            <Skeleton width={110} height={32} />
            <Skeleton height={14} />
            <Skeleton width="60%" height={14} />
          </Card>
        ))}
      </View>
    </View>
  );
}
