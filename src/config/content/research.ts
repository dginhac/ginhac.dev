export type ProjectStatus = "current" | "previous";

export interface ResearchProject {
  key: string;
  title: string;
  status: ProjectStatus;
  period: string;
  role: string;
  description: string;
  tags: string[];
  href: string;
}

export interface ResearchConfig {
  meta: { title: string; description: string };
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  pills: string[];
  sections: {
    current: { title: string; description: string };
    previous: { title: string; description: string };
  };
  projects: ResearchProject[];
  contact: { text: string; linkLabel: string; href: string };
}

export const researchConfig: ResearchConfig = {
  meta: {
    title: "Research",
    description:
      "Research in computer vision, artificial intelligence, digital imaging systems, and embedded visual perception.",
  },
  eyebrow: "Computer Vision · AI · Digital Imaging Systems",
  title: "Research",
  description:
    "My research focuses on computer vision, artificial intelligence, digital imaging systems, and embedded visual perception.",
  intro:
    "I explore how visual information can be acquired, represented, processed, and interpreted by computational systems, with a particular interest in efficient AI-based imaging and perception systems.",
  pills: [
    "Computational imaging",
    "Computer vision",
    "Efficient AI",
    "Embedded vision",
  ],
  sections: {
    current: {
      title: "Current projects",
      description: "Selected projects currently shaping my research agenda.",
    },
    previous: {
      title: "Previous projects",
      description:
        "Past projects and collaborations that contributed to my research trajectory.",
    },
  },
  projects: [
    {
      key: "lumen",
      title: "LUMEN",
      status: "current",
      period: "2026–2029",
      role: "Principal investigator",
      description:
        "Learning unified models of exposure and luminance for HDR imaging and visual representation learning.",
      tags: ["HDR imaging", "Foundation models", "Self-supervised learning"],
      href: "/posts/lumen-luminance-representation-learning",
    },
    {
      key: "aimotions",
      title: "aiMotions",
      status: "current",
      period: "2023–2027",
      role: "Principal investigator",
      description:
        "AI-based motion analysis and visual perception for dynamic scenes.",
      tags: ["Computer vision", "Motion analysis", "AI"],
      href: "/posts/aimotions",
    },
    {
      key: "cerbere",
      title: "CERBERE",
      status: "previous",
      period: "2021–2025",
      role: "Project coordinator",
      description:
        "Computer vision and perception systems for autonomous driving scenarios.",
      tags: ["Autonomous vehicles", "Embedded vision", "Perception"],
      href: "/posts/cerbere",
    },
  ],
  contact: {
    text: "Interested in collaborating or have questions about my research?",
    linkLabel: "Get in touch",
    href: "mailto:dginhac@ube.fr",
  },
};
