import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

/** All posts, newest first. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('posts');
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

const jst = (date: Date) => new Date(date.getTime() + 9 * 3600 * 1000);

/** Jekyll permalink `/:year/:month/:title.html` (dates are JST). */
export function postParams(post: Post) {
  const d = jst(post.data.date);
  return {
    year: String(d.getUTCFullYear()),
    month: String(d.getUTCMonth() + 1).padStart(2, '0'),
    slug: post.id,
  };
}

export function postUrl(post: Post): string {
  const { year, month, slug } = postParams(post);
  return `/${year}/${month}/${slug}.html`;
}

export function formatDate(date: Date): string {
  const d = jst(date);
  return `${d.getUTCFullYear()}年${d.getUTCMonth() + 1}月${d.getUTCDate()}日`;
}

/** Rough reading time for Japanese text (~500 chars/min). */
export function readingTime(body = ''): string {
  const chars = body.replace(/<[^>]+>|[#*\-\[\]()`>|]/g, '').replace(/\s+/g, '').length;
  return `${Math.max(1, Math.round(chars / 500))} min read`;
}
