import { Linking } from 'react-native';

export { telUrl, whatsappUrl } from './contact-format';

export async function openUrl(url: string): Promise<void> {
  try {
    await Linking.openURL(url);
  } catch {
    /* no handler available on this device */
  }
}
