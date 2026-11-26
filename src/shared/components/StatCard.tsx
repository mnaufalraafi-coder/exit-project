import React from "react";

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  variant?: "navy" | "light";
  subtitleTone?: "default" | "success" | "gold";
}

/**
 * Reusable metric card following EXIT design tokens (navy, ivory, gold).
 */
export function StatCard({
  title,
  value,
  subtitle,
  icon,
  variant = "light",
  subtitleTone = "default",
}: StatCardProps) {
  const isNavy = variant === "navy";

  const subtitleColor =
    subtitleTone === "success"
      ? "text-success font-medium"
      : subtitleTone === "gold"
      ? "text-gold font-medium"
      : isNavy
      ? "text-exit-white/70"
      : "text-text-secondary";

  return (
    <div
      className={`p-5 sm:p-6 rounded-2xl transition-colors ${
        isNavy
          ? "bg-navy text-exit-white shadow-sm"
          : "bg-exit-white border border-border shadow-xs"
      }`}
    >
      <div className="flex items-center justify-between gap-3 mb-3">
        <span
          className={`text-xs font-medium ${
            isNavy ? "text-exit-white/75" : "text-text-secondary"
          }`}
        >
          {title}
        </span>
        {icon && (
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
              isNavy ? "bg-gold/15 text-gold" : "bg-gold/15 text-gold-dark"
            }`}
          >
            {icon}
          </div>
        )}
      </div>
      <p
        className={`text-2xl font-extrabold tracking-tight ${
          isNavy ? "text-gold" : "text-navy"
        }`}
      >
        {value}
      </p>
      {subtitle && <p className={`text-xs mt-1.5 ${subtitleColor}`}>{subtitle}</p>}
    </div>
  );
}
