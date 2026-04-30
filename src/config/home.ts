import portrait from "../assets/hero-portrait-v2.jpg";

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
  meta: {
    title:
      "Personal academic website of Dominique Ginhac - Professor in Computer Science, AI & Computer Vision",
    description:
      "Research, teaching, and publications in artificial intelligence, computer vision, imaging, and digital systems.",
  },

  hero: {
    eyebrow: "AI · Computer Vision · Digital Imaging Systems",
    title: "From imaging systems to AI-based visual perception",
    subtitle:
      "Professor in Computer Science, I work at the intersection of artificial intelligence, computer vision, and imaging systems, with a particular interest in low-level vision, computational imaging, and efficient IA-based software/hardware architectures.",
    portrait,
    portraitAlt: "Portrait of Dominique Ginhac",
    ctas: [
      { label: "Publications", href: "/publications" },
      { label: "Research", href: "/research" },
      { label: "Teaching", href: "/teaching" },
    ],
  },

  featured: {
    eyebrow: "Selected work",
    title: "Featured",
    description:
      "A curated selection of research projects, insights, publications, and teaching resources.",
    articlesLinkLabel: "View all content",
    articlesHref: "/posts",
    items: [] satisfies FeaturedItem[],
  },

  bio: {
    eyebrow: "About",
    title: "Profile",
    text: "I am a Full Professor in Computer Science at [Université Bourgogne Europe](https://www.ube.fr/en/home), affiliated with the [ICB laboratory](https://icb.cnrs.fr/en/icb-home/). My [work](/posts) spans computer vision, artificial intelligence, digital imaging systems, and engineering education, with a focus on the links between fundamental research, applications, and teaching.",
    currentIntro:
      "Currently, my work is structured around several research and teaching directions.",
    currentTitle: "Currently",
    currentItems: [
      "LUMEN project — learning luminance representations for HDR imaging.",
      "Progressive redesign of C++ programming resources with Git and software engineering practices.",
    ],
  },
} as const;
