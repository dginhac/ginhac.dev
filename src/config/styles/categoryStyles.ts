export const categoryStyles = {
  INSIGHT: {
    badge: "border-orange-200 bg-orange-50 text-orange-600",
    pill: "border-orange-200 bg-orange-50 text-orange-700",
    headerGradient:
      "bg-gradient-to-b from-section-alt via-section-alt to-orange-50",
    titleAccent: "text-orange-300",
  },
  RESEARCH: {
    badge: "border-blue-200 bg-blue-50 text-blue-600",
    pill: "border-blue-200 bg-blue-50 text-blue-700",
    headerGradient:
      "bg-gradient-to-b from-section-alt via-section-alt to-blue-50",
    titleAccent: "text-blue-300",
  },
  TEACHING: {
    badge: "border-emerald-200 bg-emerald-50 text-emerald-600",
    pill: "border-emerald-200 bg-emerald-50 text-emerald-700",
    headerGradient:
      "bg-gradient-to-b from-section-alt via-section-alt to-emerald-50",
    titleAccent: "text-emerald-300",
  },
  PUBLICATION: {
    badge: "border-violet-200 bg-violet-50 text-violet-600",
    pill: "border-violet-200 bg-violet-50 text-violet-700",
    headerGradient:
      "bg-gradient-to-b from-section-alt via-section-alt to-violet-50",
    titleAccent: "text-violet-300",
  },
  HOWTO: {
    badge: "border-amber-200 bg-amber-50 text-amber-700",
    pill: "border-amber-200 bg-amber-50 text-amber-800",
    headerGradient:
      "bg-gradient-to-b from-section-alt via-section-alt to-amber-50",
    titleAccent: "text-amber-300",
  },
} as const;

export type CategoryType = keyof typeof categoryStyles;

export function getCategoryStyles(type?: string) {
  return categoryStyles[type as CategoryType] ?? fallbackCategoryStyles;
}

export const fallbackCategoryStyles = {
  badge: "border-slate-200 bg-slate-50 text-slate-600",
  pill: "border-slate-200 bg-slate-50 text-slate-700",
  headerGradient:
    "bg-gradient-to-b from-section-alt via-section-alt to-slate-50",
  titleAccent: "text-slate-300",
} as const;
