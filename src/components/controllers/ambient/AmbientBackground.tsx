import { View } from 'react-native';
import { AMBIENT, type AmbientVariant } from './init/ambient.init';
import { AmbientBlob } from './ui/AmbientBlob';

/** Non-interactive layer of 2-3 soft orange blobs, drawn behind the glass UI. Positions differ per variant. */
export function AmbientBackground({ variant = 'dawn' }: { variant?: AmbientVariant }) {
  return (
    <View
      aria-hidden
      pointerEvents="none"
      style={{ position: 'absolute', top: 0, bottom: 0, start: 0, end: 0, overflow: 'hidden' }}
    >
      {AMBIENT[variant].map((blob, i) => <AmbientBlob key={`${variant}-${i}`} blob={blob} />)}
    </View>
  );
}
