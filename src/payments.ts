import {readPref,writePref} from './storage';
/** Free-download allowance per wallet. This never signs transactions or transfers SOL. */
export const DOWNLOAD_PRICE_SOL = '0.005';
export const FREE_DOWNLOADS = 2;
const key = (address: string) => `sticker-free-downloads:${address}`;
export function usedFreeDownloads(address: string): number {
  if (!address) return 0;
  const value = Number(readPref(key(address)) ?? 0);
  return Number.isSafeInteger(value) && value >= 0 ? value : 0;
}
export function remainingFreeDownloads(address: string): number {
  return Math.max(0, FREE_DOWNLOADS - usedFreeDownloads(address));
}
export function recordFreeDownload(address: string): number {
  const used = usedFreeDownloads(address);
  if (used >= FREE_DOWNLOADS) throw new Error('The two free downloads have already been used.');
  if (!writePref(key(address), String(used + 1))) throw new Error('Your free download couldn’t be recorded. Check your browser settings and try again.');
  return FREE_DOWNLOADS - used - 1;
}
