import { BrandMark, Button, Card, Row, Stack, Text } from '@/components/controllers';
import { BRAND } from '@/core/brand';
import { useSession } from '@/core/auth/store';
import { ar } from '@/core/strings/ar';
import { openUrl, telUrl, whatsappUrl } from '../utils/contact';

/** Institute identity (from the brand module) plus contact actions (phone/address from the API). */
export function InstituteCard() {
  const inst = useSession((s) => s.me?.institute);
  if (!inst) return null;
  const hasContact = !!inst.phone || !!inst.address;
  return (
    <Card gap="md">
      <Row gap="md">
        <BrandMark />
        <Stack flex={1}>
          <Text variant="heading" accessibilityRole="header">{BRAND.name}</Text>
          {inst.address ? <Text variant="caption" tone="muted" accessibilityLabel={`${ar.more.address}: ${inst.address}`}>{inst.address}</Text> : null}
        </Stack>
      </Row>
      {inst.phone ? (
        <Row gap="md">
          <Stack flex={1}><Button compact label={ar.more.call} icon="call" onPress={() => void openUrl(telUrl(inst.phone ?? ''))} /></Stack>
          <Stack flex={1}><Button compact label={ar.more.whatsapp} icon="logo-whatsapp" variant="ghost" onPress={() => void openUrl(whatsappUrl(inst.phone ?? ''))} /></Stack>
        </Row>
      ) : null}
      {hasContact ? null : <Text tone="muted">{ar.more.noContact}</Text>}
    </Card>
  );
}
