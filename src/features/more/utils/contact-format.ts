/** Keeps digits only (and a leading +). */
export function cleanPhone(phone: string): string {
  const trimmed = phone.trim();
  return (trimmed.startsWith('+') ? '+' : '') + trimmed.replace(/\D/g, '');
}

/** International number for wa.me (Syria: a leading 0 becomes 963). */
export function whatsappNumber(phone: string): string {
  const digits = cleanPhone(phone).replace('+', '');
  if (digits.startsWith('00')) return digits.slice(2);
  if (digits.startsWith('0')) return `963${digits.slice(1)}`;
  return digits;
}

export const telUrl = (phone: string) => `tel:${cleanPhone(phone)}`;
export const whatsappUrl = (phone: string) => `https://wa.me/${whatsappNumber(phone)}`;

