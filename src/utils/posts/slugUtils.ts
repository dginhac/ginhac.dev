/**
 * Normalise a content entry path to a bare URL slug.
 *
 * Supports both layout conventions:
 *   "post-slug/index.mdx"  →  "post-slug"
 *   "post-slug.mdx"        →  "post-slug"
 */
export function getPostSlug(entryId: string): string {
  return entryId
    .replace(/\/index\.(md|mdx)$/, '')
    .replace(/\.(md|mdx)$/, '');
}
