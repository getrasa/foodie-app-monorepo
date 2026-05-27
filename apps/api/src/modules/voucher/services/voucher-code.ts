// Voucher code generation. Pattern: `<VENUE-PREFIX>-<4 chars>` (e.g. "LUCIA-4KX9").
// Uses an unambiguous alphabet (no 0/O, 1/I, L) to keep handwritten/spoken codes legible.

const SAFE_CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
const BODY_LENGTH = 4;
const PREFIX_MAX = 6;
const FALLBACK_PREFIX = 'VOUCH';
// U+0300..U+036F are combining diacritical marks (strip after NFD).
const DIACRITICS = /[̀-ͯ]/g;

const sanitizePrefix = (venueName: string): string => {
  const cleaned = venueName
    .normalize('NFD')
    .replace(DIACRITICS, '')
    .replace(/[^A-Za-z0-9]/g, '')
    .toUpperCase()
    .slice(0, PREFIX_MAX);
  return cleaned || FALLBACK_PREFIX;
};

const randomBody = (): string => {
  let out = '';
  for (let i = 0; i < BODY_LENGTH; i += 1) {
    out += SAFE_CHARS[Math.floor(Math.random() * SAFE_CHARS.length)];
  }
  return out;
};

export const generateVoucherCode = (venueName: string): string => {
  return `${sanitizePrefix(venueName)}-${randomBody()}`;
};
