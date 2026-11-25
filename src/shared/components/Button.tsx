import React from "react";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "secondary";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-[10px] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none";

  const sizeStyles = {
    sm: "h-9 px-3.5 text-xs gap-1.5",
    md: "h-11 px-5 text-sm gap-2",
    lg: "h-12 px-7 text-base gap-2.5",
  }[size];

  const variantStyles = {
    primary:
      "bg-gold hover:bg-gold-dark text-navy focus:ring-gold shadow-sm",
    secondary:
      "bg-navy hover:bg-navy/90 text-exit-white focus:ring-navy shadow-sm",
    outline:
      "bg-transparent border border-border hover:border-gold hover:bg-gold/5 text-text-primary focus:ring-gold",
    ghost:
      "bg-transparent hover:bg-navy/5 text-text-secondary hover:text-navy focus:ring-navy",
  }[variant];

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
          <span>Memproses...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
