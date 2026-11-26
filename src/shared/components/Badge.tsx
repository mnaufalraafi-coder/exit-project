import React from "react";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "gold" | "navy" | "success" | "warning" | "danger" | "outline";
  className?: string;
}

/**
 * Status / category badge using EXIT color tokens.
 */
export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  const styles: Record<NonNullable<BadgeProps["variant"]>, string> = {
    default: "bg-navy/10 text-navy border-transparent",
    gold: "bg-gold/20 text-navy border-gold/30",
    navy: "bg-navy text-exit-white border-transparent",
    success: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/10 text-warning border-warning/20",
    danger: "bg-danger/10 text-danger border-danger/20",
    outline: "bg-exit-white text-navy border-border",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
