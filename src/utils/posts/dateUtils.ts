import type { CollectionEntry } from "astro:content";

export function formatPostDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getEffectivePostDate(post: CollectionEntry<"posts">): Date {
  return post.data.updated ?? post.data.date;
}

export function hasUpdatedDate(post: CollectionEntry<"posts">): boolean {
  const { updated, date } = post.data;
  if (!updated) return false;
  return updated.getTime() !== date.getTime();
}
