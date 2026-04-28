export type FeaturedItemType =
  | "RESEARCH"
  | "INSIGHT"
  | "TEACHING"
  | "PUBLICATION";

export interface FeaturedItem {
  type: FeaturedItemType;
  title: string;
  description: string;
  href: string;
  featuredImage?: import("astro").ImageMetadata;
  featuredImageAlt?: string;
}

export const homeContent = {
  hero: {
    eyebrow: "AI · Computer Vision · Digital Systems",
    firstName: "Dominique",
    lastName: "Ginhac",
    subtitle:
      "Professor in Computer Science, I work at the intersection of artificial intelligence, computer vision, and digital systems, with a particular interest in visual representations, imaging, and efficient architectures.",
  },

  featured: {
    title: "Featured",
    description:
      "A curated selection of research projects, insights, publications, and teaching resources.",
    articlesLinkLabel: "View all content",
    articlesHref: "/posts",
    items: [] satisfies FeaturedItem[],
  },

  bio: {
    title: "Profile",
    text: "I am a Professor in Computer Science at Université Bourgogne Europe, affiliated with the ICB laboratory. My work spans computer vision, artificial intelligence, digital systems, and engineering education, with a focus on the links between fundamental research, applications, and teaching.",
    currentIntro:
      "Currently, my work is structured around several research and teaching directions.",
    currentTitle: "Currently",
    currentItems: [
      "LUMEN project — learning luminance representations for HDR imaging.",
      "Progressive redesign of C++ programming resources with Git and software engineering practices.",
    ],
  },
} as const;
