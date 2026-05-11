// Post category styles.
// Keys match the `type` values used in post frontmatter.

export const categoryStyles = {
  INSIGHT: {
    badge: "border-orange-200 bg-orange-50 text-orange-600",
    headerGradient:
      "bg-gradient-to-b from-section-alt via-section-alt to-orange-100",
    titleAccent: "text-orange-300",
    gridRgb: "234, 88, 12",
  },
  RESEARCH: {
    badge: "border-blue-200 bg-blue-50 text-blue-600",
    headerGradient:
      "bg-gradient-to-b from-section-alt via-section-alt to-blue-100",
    titleAccent: "text-blue-300",
    gridRgb: "37, 99, 235",
  },
  TEACHING: {
    badge: "border-emerald-200 bg-emerald-50 text-emerald-600",
    headerGradient:
      "bg-gradient-to-b from-section-alt via-section-alt to-emerald-100",
    titleAccent: "text-emerald-300",
    gridRgb: "5, 150, 105",
  },
  PUBLICATION: {
    badge: "border-violet-200 bg-violet-50 text-violet-600",
    headerGradient:
      "bg-gradient-to-b from-section-alt via-section-alt to-violet-100",
    titleAccent: "text-violet-300",
    gridRgb: "124, 58, 237",
  },
  HOWTO: {
    badge: "border-amber-200 bg-amber-50 text-amber-700",
    headerGradient:
      "bg-gradient-to-b from-section-alt via-section-alt to-amber-100",
    titleAccent: "text-amber-300",
    gridRgb: "217, 119, 6",
  },
} as const;

// Fallback style for missing or unknown post types.
export const fallbackCategoryStyles = {
  badge: "border-slate-200 bg-slate-50 text-slate-600",
  headerGradient:
    "bg-gradient-to-b from-section-alt via-section-alt to-slate-50",
  titleAccent: "text-slate-300",
  gridRgb: "37, 99, 235",
} as const;

export type CategoryType = keyof typeof categoryStyles;

export function getCategoryStyles(type?: string) {
  return categoryStyles[type as CategoryType] ?? fallbackCategoryStyles;
}

// Page-level styles.
// Keys match top-level route names, not post type values.
export const pageStyles = {
  posts: {
    headerGradient:
      "bg-gradient-to-b from-section-alt via-section-alt to-slate-100",
    titleAccent: "text-slate-300",
    gridRgb: "37, 99, 235",
  },
  research: {
    headerGradient:
      "bg-gradient-to-b from-section-alt via-section-alt to-blue-100",
    titleAccent: "text-blue-300",
    gridRgb: "37, 99, 235",
  },
  teaching: {
    headerGradient:
      "bg-gradient-to-b from-section-alt via-section-alt to-emerald-100",
    titleAccent: "text-emerald-300",
    gridRgb: "5, 150, 105",
  },
  publications: {
    headerGradient:
      "bg-gradient-to-b from-section-alt via-section-alt to-slate-100",
    titleAccent: "text-slate-300",
    gridRgb: "71, 85, 105",
  },
} as const;

export const defaultPageStyles = {
  headerGradient:
    "bg-gradient-to-b from-section-alt via-section-alt to-slate-100",
  titleAccent: "text-slate-300",
  gridRgb: "37, 99, 235",
} as const;

export type PageStyleType = keyof typeof pageStyles;

export function getPageStyles(page?: string) {
  return pageStyles[page as PageStyleType] ?? defaultPageStyles;
}
