import {canonicalStickerPath} from './sticker-media';
/** Prefix public files with the deployment base (e.g. /STICKER/ on GitHub Pages). */
export function publicAsset(path: string): string {
  return `${import.meta.env.BASE_URL}${canonicalStickerPath(path).replace(/^\/+/, '')}`;
}
