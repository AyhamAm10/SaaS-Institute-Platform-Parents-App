import { useEffect, useState } from 'react';
import { Modal, Pressable, ScrollView, View, useWindowDimensions } from 'react-native';
import Animated, {
  Easing, useAnimatedStyle, useReducedMotion, useSharedValue, withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ar } from '@/core/strings/ar';
import { HIT, MAX_WIDTH, radius, space } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';
import { AppText } from './AppText';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

/** Modal bottom sheet: backdrop tap, close button and Android back all dismiss it. */
export function BottomSheet({ visible, title, onClose, children }: Props) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const progress = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      progress.value = reduce ? 1 : withTiming(1, { duration: 260, easing: Easing.out(Easing.cubic) });
      const t = setTimeout(() => setMounted(true), 0);
      return () => clearTimeout(t);
    }
    progress.value = reduce ? 0 : withTiming(0, { duration: 200 });
    const t = setTimeout(() => setMounted(false), reduce ? 0 : 210);
    return () => clearTimeout(t);
  }, [visible, reduce, progress]);

  const sheet = useAnimatedStyle(() => ({ transform: [{ translateY: (1 - progress.value) * 320 }], opacity: 0.4 + progress.value * 0.6 }));
  const backdrop = useAnimatedStyle(() => ({ opacity: progress.value }));

  return (
    <Modal visible={visible || mounted} transparent animationType="none" onRequestClose={onClose} statusBarTranslucent>
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <Animated.View style={[{ position: 'absolute', top: 0, bottom: 0, start: 0, end: 0, backgroundColor: theme.overlay }, backdrop]}>
          <Pressable accessibilityRole="button" accessibilityLabel={ar.common.close} onPress={onClose} style={{ flex: 1 }} />
        </Animated.View>
        <Animated.View
          accessibilityViewIsModal
          style={[{
            alignSelf: 'center', width: '100%', maxWidth: MAX_WIDTH, maxHeight: height * 0.82,
            backgroundColor: theme.surface, borderTopStartRadius: radius.card, borderTopEndRadius: radius.card,
            paddingTop: space.md, paddingBottom: insets.bottom + space.lg,
          }, sheet]}
        >
          <View style={{ alignSelf: 'center', width: 40, height: 4, borderRadius: 2, backgroundColor: theme.border, marginBottom: space.sm }} />
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: space.xl }}>
            <AppText variant="title" accessibilityRole="header">{title}</AppText>
            <Pressable accessibilityRole="button" accessibilityLabel={ar.common.close} onPress={onClose}
              style={{ width: HIT, height: HIT, alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name="close" size={24} color={theme.textMuted} />
            </Pressable>
          </View>
          <ScrollView contentContainerStyle={{ paddingHorizontal: space.xl, paddingTop: space.sm, gap: space.sm }}>
            {children}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}
