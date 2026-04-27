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
}

export const homeContent = {
  hero: {
    eyebrow: "AI · Computer Vision · Digital Systems",
    firstName: "Dominique",
    lastName: "Ginhac",
    subtitle:
      "Professor in Computer Science, I work at the intersection of artificial intelligence, computer vision, and digital systems, with a particular interest in visual representations, imaging, and efficient architectures.",
    image: "/images/hero-portrait.jpg",
  },

  featured: {
    title: "Featured",
    description:
      "A curated selection of research projects, insights, publications, and teaching resources.",
    articlesLinkLabel: "View articles",
    articlesHref: "/posts",
    items: [
      {
        type: "RESEARCH" as FeaturedItemType,
        title: "LUMEN — Learning Unified Models of Exposure and Luminance",
        description:
          "An exploratory research project on HDR imaging and radiometric representation learning.",
        href: "/research/lumen",
      },
      {
        type: "INSIGHT" as FeaturedItemType,
        title: "Understanding HDR Imaging",
        description:
          "A long-form article on classical and recent approaches to high dynamic range image reconstruction.",
        href: "/posts/understanding-hdr-imaging",
      },
      {
        type: "TEACHING" as FeaturedItemType,
        title: "C++ Programming",
        description:
          "Teaching resources on object-oriented programming, software engineering practices, and Git-based development.",
        href: "/teaching/cpp-programming",
      },
      {
        type: "PUBLICATION" as FeaturedItemType,
        title: "Selected Publication",
        description:
          "A recent or particularly significant scientific publication highlighted from the publication list.",
        href: "/publications",
      },
    ] satisfies FeaturedItem[],
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
