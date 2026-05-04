export const categoryStyles = {
  INSIGHT: {
    badge: "border-orange-200 bg-orange-50 text-orange-600",
    pill: "border-orange-200 bg-orange-50 text-orange-700",
  },
  RESEARCH: {
    badge: "border-blue-200 bg-blue-50 text-blue-600",
    pill: "border-blue-200 bg-blue-50 text-blue-700",
  },
  TEACHING: {
    badge: "border-emerald-200 bg-emerald-50 text-emerald-600",
    pill: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
  PUBLICATION: {
    badge: "border-violet-200 bg-violet-50 text-violet-600",
    pill: "border-violet-200 bg-violet-50 text-violet-700",
  },
  HOWTO: {
    badge: "border-amber-200 bg-amber-50 text-amber-700",
    pill: "border-amber-200 bg-amber-50 text-amber-800",
  },
} as const;

export type CategoryType = keyof typeof categoryStyles;

export const fallbackCategoryStyles = {
  badge: "border-slate-200 bg-slate-50 text-slate-600",
  pill: "border-slate-200 bg-slate-50 text-slate-700",
} as const;
