import type { CollectionEntry } from "astro:content";

type Post = CollectionEntry<"posts">;

export function getRelatedPosts(current: Post, all: Post[]): Post[] {
    // Manual override — preserve given order, resolve slugs
    if (current.data.relatedPosts?.length) {
        return current.data.relatedPosts
            .map((slug) => all.find((p) => p.id === slug))
            .filter((p): p is Post => p !== undefined && !p.data.draft);
    }

    // Auto-generate: score all other non-draft posts
    const currentTags = current.data.tags ?? [];
    const others = all.filter((p) => p.id !== current.id && !p.data.draft);

    const scored = others.map((p) => {
        let score = 0;

        // Shared tags: +2 each
        const sharedTags = (p.data.tags ?? []).filter((t) =>
            currentTags.includes(t)
        );
        score += sharedTags.length * 2;

        // Same content type: +1
        if (p.data.type && p.data.type === current.data.type) score += 1;

        // Recency bonus: +0.5 if published within the last 6 months
        const ageDays =
            (Date.now() - p.data.date.getTime()) / (1000 * 60 * 60 * 24);
        if (ageDays < 180) score += 0.5;

        return { post: p, score };
    });

    return scored
        .sort(
            (a, b) =>
                b.score - a.score ||
                b.post.data.date.getTime() - a.post.data.date.getTime()
        )
        .slice(0, 3)
        .map((s) => s.post);
}
