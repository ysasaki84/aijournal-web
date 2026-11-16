import { getCollection, type CollectionEntry } from 'astro:content';

export type Episode = CollectionEntry<'episodes'>;

/** 公開済みの記事を新しい順に（同日なら slug 順で安定させる） */
export async function getEpisodes(): Promise<Episode[]> {
  const list = await getCollection('episodes', ({ data }) => !data.draft || import.meta.env.DEV);
  return list.sort(
    (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf() || a.id.localeCompare(b.id),
  );
}

/** フロントマターで featured: true の記事、なければ最新の記事 */
export function pickFeatured(list: Episode[]): Episode | undefined {
  return list.find((e) => e.data.featured) ?? list[0];
}

/** 本文の文字数から読了時間（分）を概算。日本語は1分あたり約600字で計算 */
export function readingMinutes(episode: Episode): number {
  const chars = (episode.body ?? '').replace(/\s+/g, '').length;
  return Math.max(1, Math.round(chars / 600));
}

/** 「佐藤すぐる氏（株式会社〇〇代表）」→「佐藤すぐる氏」 */
export function guestName(guest?: string): string | undefined {
  return guest ? guest.split(/[（(]/)[0].trim() : undefined;
}

export function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10).replace(/-/g, '.');
}

export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** YouTubeのサムネイル。maxres が無い動画は表示側で hqdefault に差し替える */
export function thumb(youtubeId: string, size: 'maxresdefault' | 'hqdefault' = 'maxresdefault'): string {
  return `https://i.ytimg.com/vi/${youtubeId}/${size}.jpg`;
}
