import { Row, Text } from '@/components/controllers';

export function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <Row accessible accessibilityLabel={`${label}: ${value}`} justify="between" gap="md" py="sm">
      <Text tone="muted">{label}</Text>
      <Text variant="label" align="end">{value}</Text>
    </Row>
  );
}
