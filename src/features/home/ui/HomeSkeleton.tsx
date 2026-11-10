import { Card, Grid, Skeleton, Stack } from '@/components/controllers';

export function HomeSkeleton() {
  return (
    <Stack gap="lg" aria-hidden>
      <Card variant="hero" padding="xl" gap="xl">
        <Stack align="center"><Skeleton width={220} height={220} round="pill" /></Stack>
        <Skeleton height={28} />
      </Card>
      <Grid>
        {[0, 1, 2, 3].map((i) => (
          <Card key={i} fill gap="md">
            <Skeleton width={110} height={32} />
            <Skeleton height={14} />
            <Skeleton width="60%" height={14} />
          </Card>
        ))}
      </Grid>
    </Stack>
  );
}
