export type CourseStatus = "current" | "previous";

export interface TeachingCourse {
  key: string;
  title: string;
  status: CourseStatus;
  level: string;
  institution: string;
  volume: string;
  description: string;
  tags: string[];
  href: string;
}

export interface TeachingConfig {
  meta: { title: string; description: string };
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  tags: string[];
  sections: {
    current: { title: string; description: string };
    previous: { title: string; description: string };
  };
  courses: TeachingCourse[];
  contact: { text: string; linkLabel: string; href: string };
}

export const teachingConfig: TeachingConfig = {
  meta: {
    title: "Teaching",
    description:
      "Teaching in computer science fundamentals, software engineering, computer architecture, and visual computing.",
  },
  eyebrow: "Computer Science · Engineering Education",
  title: "Teaching",
  description:
    "My teaching focuses on computer science fundamentals, software engineering practices, computer architecture, and visual computing.",
  intro:
    "I teach computer science through progressive, practice-oriented modules that connect conceptual understanding, software design, tool usage, and engineering methodology.",
  tags: [
    "Modern C++",
    "Computer architecture",
    "Software engineering",
    "Project-based learning",
  ],
  sections: {
    current: {
      title: "Current modules",
      description:
        "Courses and modules currently taught in engineering curricula.",
    },
    previous: {
      title: "Previous modules",
      description:
        "Past teaching activities, responsibilities, and educational resources.",
    },
  },
  courses: [
    {
      key: "cpp-oop",
      title: "Object-oriented programming in C++",
      status: "current",
      level: "Engineering curriculum · Year 3",
      institution: "Polytech Dijon",
      volume: "70 student-hours",
      description:
        "A progressive introduction to modern C++, object-oriented design, refactoring, testing, and version control.",
      tags: ["C++", "OOP", "Testing", "Git"],
      href: "/posts/teaching-cpp-programming",
    },
    {
      key: "processor-architecture",
      title: "Computer architecture and ARM assembly",
      status: "current",
      level: "Preparatory engineering cycle · Year 2",
      institution: "Polytech Dijon",
      volume: "40 student-hours",
      description:
        "Processor architecture, binary representation, Boolean logic, and ARM assembly programming.",
      tags: ["Computer architecture", "ARM", "Assembly", "Boolean logic"],
      href: "/posts/teaching-computer-architecture",
    },
    {
      key: "mobile-programming",
      title: "Mobile application development",
      status: "previous",
      level: "Engineering curriculum",
      institution: "Polytech Dijon",
      volume: "40 student-hours",
      description:
        "Introduction to mobile application development, interface design, and MVC-based application architecture.",
      tags: ["Mobile development", "iOS", "Swift", "MVC"],
      href: "/posts/mobile-application-development",
    },
  ],
  contact: {
    text: "Questions about my courses or interested in educational collaboration?",
    linkLabel: "Get in touch",
    href: "mailto:dginhac@ube.fr",
  },
};
