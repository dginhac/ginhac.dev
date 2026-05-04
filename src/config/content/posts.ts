export const postsContent = {
  meta: {
    title: "All content — Dominique Ginhac",
    description:
      "Research projects, insights, teaching resources, and publications in computer vision, artificial intelligence, imaging systems, and engineering education.",
  },

  header: {
    eyebrow: "Archive",
    title: "All content",
    description: [
      "Browse all posts published on this site, including research projects, technical insights, teaching resources, and selected publications.",
    ],
  },

  filters: [
    { label: "All", value: "ALL", href: "/posts" },
    { label: "Insights", value: "INSIGHT", href: "/posts?type=INSIGHT" },
    { label: "Research", value: "RESEARCH", href: "/posts?type=RESEARCH" },
    { label: "Teaching", value: "TEACHING", href: "/posts?type=TEACHING" },
    {
      label: "Publications",
      value: "PUBLICATION",
      href: "/posts?type=PUBLICATION",
    },
    { label: "How-to", value: "HOWTO", href: "/posts?type=HOWTO" },
  ],

  emptyState: {
    title: "No content found",
    message: "No posts match the selected filter.",
  },
} as const;
