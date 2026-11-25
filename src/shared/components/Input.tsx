import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  showPasswordToggle?: boolean;
}

export default function Input({
  label,
  helperText,
  error,
  type = "text",
  showPasswordToggle = false,
  className = "",
  id,
  ...props
}: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  const actualType = showPasswordToggle
    ? isPasswordVisible
      ? "text"
      : "password"
    : type;

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-semibold text-text-primary flex items-center justify-between"
        >
          <span>{label}</span>
          {props.required && <span className="text-danger text-[11px]">*Wajib</span>}
        </label>
      )}

      <div className="relative flex items-center">
        <input
          id={inputId}
          type={actualType}
          className={`w-full h-11 px-3.5 rounded-[10px] bg-surface-soft border text-sm text-text-primary placeholder:text-text-secondary/50 outline-none transition-all focus:ring-1 ${
            error
              ? "border-danger focus:border-danger focus:ring-danger/20 text-danger"
              : "border-border focus:border-gold focus:ring-gold/30"
          } ${showPasswordToggle ? "pr-11" : ""} ${className}`}
          {...props}
        />

        {showPasswordToggle && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="absolute right-3 p-1 text-text-secondary hover:text-navy transition-colors focus:outline-none"
            aria-label={isPasswordVisible ? "Sembunyikan password" : "Tampilkan password"}
          >
            {isPasswordVisible ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      {error ? (
        <p className="text-xs text-danger font-medium mt-0.5">{error}</p>
      ) : helperText ? (
        <p className="text-[11px] text-text-secondary mt-0.5">{helperText}</p>
      ) : null}
    </div>
  );
}
