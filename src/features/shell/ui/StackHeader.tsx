import { useRouter } from 'expo-router';
import { Header } from '@/components/controllers';
import { HeaderBell } from '@/features/notifications/ui/HeaderBell';

/** Header of pushed screens: round back button, centered title, optional bell. */
export function StackHeader({ title, bell = true }: { title: string; bell?: boolean }) {
  const router = useRouter();
  return (
    <Header
      title={title}
      onBack={() => (router.canGoBack() ? router.back() : router.replace('/'))}
      end={bell ? <HeaderBell /> : undefined}
    />
  );
}
