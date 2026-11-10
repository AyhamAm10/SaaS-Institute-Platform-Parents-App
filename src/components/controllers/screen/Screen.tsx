import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, RefreshControl, ScrollView, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BRAND } from '@/core/brand';
import { MAX_WIDTH, space } from '@/core/theme/metrics';
import { ThemeScope, useTheme } from '@/core/theme/ThemeProvider';
import { AmbientBackground, type AmbientVariant } from '../ambient';
import { TAB_BAR_HEIGHT } from '../tab-bar/init/tab-bar.init';

interface Props {
  header?: ReactNode;
  children: ReactNode;
  /** Blob layout of the ambient background (differs per screen). */
  ambient?: AmbientVariant;
  /** Reserve room for the floating tab bar (tab screens only). */
  withTabBar?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
  /** `ink`: always-dark canvas (login). */
  canvas?: 'default' | 'ink';
  /** Vertically center the content and avoid the keyboard (forms). */
  form?: boolean;
}

function Body({ header, children, ambient = 'dawn', withTabBar, refreshing = false, onRefresh, canvas, form }: Props) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const bottom = insets.bottom + space.xl + (withTabBar ? TAB_BAR_HEIGHT + space.xl : 0);
  const column = { width: '100%', maxWidth: MAX_WIDTH, alignSelf: 'center', paddingHorizontal: space.lg } as const;
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, backgroundColor: canvas === 'ink' ? BRAND.ink : theme.bg }}>
      {canvas === 'ink' ? <StatusBar style="light" /> : null}
      <AmbientBackground variant={ambient} />
      <View style={{ flex: 1, paddingTop: insets.top }}>
        {header ? <View style={[column, { paddingVertical: space.sm }]}>{header}</View> : null}
        <ScrollView
          style={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[column, { paddingTop: space.sm, paddingBottom: bottom, gap: space.lg }, form ? { flexGrow: 1, justifyContent: 'center', gap: space.xxl } : null]}
          refreshControl={onRefresh ? <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.brandAccent} colors={[theme.brandAccent]} /> : undefined}
        >
          {children}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

/** Page shell: canvas + ambient blobs + safe-area header + centered scrolling column. */
export function Screen(props: Props) {
  if (props.canvas === 'ink') return <ThemeScope scheme="dark"><Body {...props} /></ThemeScope>;
  return <Body {...props} />;
}
