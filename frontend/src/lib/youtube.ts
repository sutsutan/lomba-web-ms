export function toYoutubeEmbedUrl(rawUrl?: string | null): string | null {
  if (!rawUrl || rawUrl.trim() === '') return null;

  let videoId: string | null = null;
  let existingParams = '';

  try {
    const url = new URL(rawUrl.trim());
    const host = url.hostname.replace('www.', '');

    if (host === 'youtu.be') {
      videoId = url.pathname.slice(1).split('/')[0];
      existingParams = url.search;
    } else if (host === 'youtube.com' || host === 'm.youtube.com') {
      if (url.pathname === '/watch') {
        videoId = url.searchParams.get('v');
        url.searchParams.delete('v');
        existingParams = url.search;
      } else if (url.pathname.startsWith('/embed/')) {
        videoId = url.pathname.split('/embed/')[1]?.split('/')[0];
        existingParams = url.search;
      } else if (url.pathname.startsWith('/shorts/')) {
        videoId = url.pathname.split('/shorts/')[1]?.split('/')[0];
        existingParams = url.search;
      }
    }
  } catch {
    return null;
  }

  if (!videoId) return null;

  const params = new URLSearchParams(existingParams);
  if (!params.has('rel')) params.set('rel', '0');
  if (!params.has('playsinline')) params.set('playsinline', '1');

  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}