/** Curated high-resolution artwork generated from the user's visual reference. */
export const highResolutionStickerNames = new Set([
  'chill-pepe', 'love-cat', 'doge-wow', 'gm-penguin', 'sad-cat', 'banana-cat',
  'screaming-cat', 'bullish-frog', 'rainbow-guy', 'cool-cat', 'heart-dude', 'sleepy-cat',
]);
export function canonicalStickerPath(path: string): string {
  const match = path.match(/^\/?stickers\/([\w-]+)\.svg$/);
  return match && highResolutionStickerNames.has(match[1])
    ? `/stickers/${match[1]}-hd.png`
    : path;
}
export function stickerNameFromAsset(path: string): string {
  return path.split('/').pop()!.split('?')[0].replace(/(-hd)?\.(svg|png)$/, '');
}
