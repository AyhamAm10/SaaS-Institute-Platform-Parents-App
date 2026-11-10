import type { ReactNode } from 'react';
import { Modal, Pressable, ScrollView, View, useWindowDimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ar } from '@/core/strings/ar';
import { MAX_WIDTH, radius, space } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';
import { GlassSurface } from '../glass';
import { IconButton } from '../icon-button';
import { Row, Stack } from '../layout';
import { Text } from '../text';
import { useSheetMotion } from './state/useSheetMotion';

interface Props {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

/** Glass bottom sheet with spring motion. Backdrop tap, close button and Android back all dismiss it. */
export function Sheet({ visible, title, onClose, children }: Props) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const { rendered, sheetStyle, backdropStyle } = useSheetMotion(visible);
  return (
    <Modal visible={rendered} transparent animationType="none" onRequestClose={onClose} statusBarTranslucent>
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <Animated.View style={[{ position: 'absolute', top: 0, bottom: 0, start: 0, end: 0, backgroundColor: theme.overlay }, backdropStyle]}>
          <Pressable accessibilityRole="button" accessibilityLabel={ar.common.close} onPress={onClose} style={{ flex: 1 }} />
        </Animated.View>
        <Animated.View
          accessibilityViewIsModal
          style={[{ alignSelf: 'center', width: '100%', maxWidth: MAX_WIDTH, maxHeight: height * 0.85, marginBottom: -radius.xl }, sheetStyle]}
        >
          <GlassSurface strength="strong" radius="xl" shadow="elev3">
            <View style={{ paddingTop: space.md, paddingBottom: insets.bottom + radius.xl + space.lg }}>
              <View style={{ alignSelf: 'center', width: 44, height: 5, borderRadius: 3, backgroundColor: theme.border, marginBottom: space.sm }} />
              <Row justify="between" px="xl" pb="sm">
                <Stack flex={1}><Text variant="title" accessibilityRole="header" numberOfLines={1}>{title}</Text></Stack>
                <IconButton icon="close" label={ar.common.close} onPress={onClose} />
              </Row>
              <ScrollView contentContainerStyle={{ paddingHorizontal: space.lg, paddingTop: space.xs, gap: space.xs }}>
                {children}
              </ScrollView>
            </View>
          </GlassSurface>
        </Animated.View>
      </View>
    </Modal>
  );
}
